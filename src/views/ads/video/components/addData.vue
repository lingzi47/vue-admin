<template>
  <div>
    <el-dialog
      class="AddDialog"
      :title="type == 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="800px"
      hegiht="1000px"
      :close-on-click-modal="false"
      @close="close"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="auto"
      >
        <el-row :gutter="15">
          <el-col :span="24">
            <el-form-item label="广告名称" prop="ad_name">
              <el-input
                v-model="ruleForm.ad_name"
                style="width: 180px"
                placeholder="请输入广告名称"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="广告描述" prop="ad_details">
              <el-input
                v-model="ruleForm.ad_details"
                style="width: 180px"
                placeholder="请输入广告描述"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="广告视频" prop="ad_url">
              <el-upload
                class="avatar-uploader"
                action="https://testboxapi.yujian02.xyz/api/common/ossUpload?file=file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <video
                  id="myVideo"
                  controls="controls"
                  width="100%"
                  height="100%"
                  poster=""
                  v-if="ad_url"
                >
                  <source type="video/mp4" :src="ad_url" class="avatar" />
                </video>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="播放时长" prop="times">
              <el-input
                v-model="ruleForm.times"
                style="width: 180px"
                placeholder="请输入播放时长"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { advideoAdd, advideoEdit } from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      ad_url: "",
      dialogVisible: false,
      ruleForm: {
        ad_name: "",
        ad_details: "",
        ad_url: "",
        id: "",
        times: "",
      },
      FormSearch: {},
      rules: {
        ad_name: [
          { required: true, message: "请输入广告名称", trigger: "blur" },
        ],
        ad_details: [
          { required: true, message: "请输入广告描述", trigger: "blur" },
        ],
        times: [{ required: true, message: "请选择播放时长", trigger: "blur" }],
        ad_url: [{ required: true, message: "请选择广告", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
  },
  mounted() {},
  methods: {
    show(type, item) {
      this.type = type;
      console.log(item);
      this.dialogVisible = true;
      this.ruleForm = item;
      this.ad_url = this.ruleForm.ad_url;
    },
    //成功
    handleAvatarSuccess(res, file) {
      this.ruleForm.ad_url = res;
      this.ad_url = this.ruleForm.ad_url;
    },
    //格式判断
    beforeAvatarUpload(file) {
      console.log(file.type);
      const MP4 = file.type === "video/mp4";
      if (!MP4) {
        this.$message.error("视频格式应为mp4!");
        this.ad_url = "";
        this.ruleForm.ad_url = "";
      }
      return MP4;
    },
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
    },

    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.type == 1) {
            let params = {
              ad_name: this.ruleForm.ad_name,
              ad_url: this.ruleForm.ad_url,
              ad_details: this.ruleForm.ad_details,
              times: this.ruleForm.times,
            };
            advideoAdd(params).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("新增成功");
              } else {
                this.$message.error(res.data.msg);
              }
              this.close();
              this.isDisable = false;
              this.$parent.getList();
            });
          } else {
            let params = {
              ad_name: this.ruleForm.ad_name,
              ad_url: this.ruleForm.ad_url,
              ad_details: this.ruleForm.ad_details,
              times: this.ruleForm.times,
            };

            let id = this.ruleForm.id;
            console.log(id);
            advideoEdit(params, id).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("修改成功");
              } else {
                this.$message.error(res.data.msg);
              }
              this.close();
              this.isDisable = false;
              this.$parent.getList();
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 100%;

  display: block;
}
</style>
