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
            <el-form-item label="广告名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入广告名称"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="广告详情" prop="name">
              <el-input
                v-model="ruleForm.des"
                style="width: 180px"
                placeholder="请输入广告详情"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="广告视频" prop="img">
              <el-upload
                class="avatar-uploader"
                action="https://yujian02.xyz/command/ossUpload?filename=file"
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
                  v-if="img"
                >
                  <source type="video/mp4" :src="img" class="avatar" />
                </video>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
import {} from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      img: "",
      dialogVisible: false,
      ruleForm: {
        name: "",
        des: "",
        img: "",
        id: "",
      },
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入广告名称", trigger: "blur" }],
        img: [{ required: true, message: "请选择广告", trigger: "blur" }],
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
      this.img = this.ruleForm.img;
    },
    //成功
    handleAvatarSuccess(res, file) {
      this.ruleForm.img = res.data;
      this.img = this.ruleForm.img;
    },
    //格式判断
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
    },

    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = {
            name: this.ruleForm.name,
            des: this.ruleForm.des,
            img: this.ruleForm.img,
          };
          unrealOrderAdd(params).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("新增成功");
              this.$parent.getUserList();
              this.close();
              this.isDisable = false;
            } else {
              this.$message.error(res.data.msg);
              this.$parent.getUserList();
              this.close();
              this.isDisable = false;
            }
          });
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
