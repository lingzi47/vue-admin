<template>
  <div>
    <el-dialog
      class="AddDialog"
      title="上传"
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
            <el-form-item label="上刊图片" prop="imagesPath">
              <el-upload
                class="upload-demo"
                action="https://testboxapi.yujian02.xyz/api/common/obsUpload?file=file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :data="uploadData"
                accept=".jpg"
              >
                <img v-if="imagesPath" :src="imagesPath" class="avatar" /><i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注描述" prop="ramark">
              <el-input
                v-model="ruleForm.ramark"
                style="width: 180px"
                placeholder="请输入备注"
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
import { upfile } from "@/request/api";
// import * as imageConversion from "image-conversion";

import { addWaterMarker } from "@/utils/addWaterMarker";
import { compressor } from "@/utils/compressor";
export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      img: "",
      file: {},

      banners: [],
      filePath: "",
      fileName: "",
      imagesPath: "",
      fileList: [],
      dialogVisible: false,
      ruleForm: {
        imagesPath: "",
        ramark: "",
        id: "",
      },
      uploadData: { push_city: "", weekNo: "", supplier: "" },
      FormSearch: {},
      rules: {
        imagesPath: [
          { required: true, message: "请选择图片", trigger: "blur" },
        ],
        ramark: [{ required: true, message: "请输入备注", trigger: "blur" }],
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
      this.ruleForm.id = item.id;
      this.uploadData.push_city = item.push_city;
      this.uploadData.weekNo = item.weekNo;
      this.uploadData.supplier = item.supplier;
    },
    //成功
    handleAvatarSuccess(res, file) {
      this.ruleForm.imagesPath = res.data.src;
      this.imagesPath = this.ruleForm.imagesPath;
      console.log(this.imagesPath);
    },
    // handleChange(file) {
    //   console.log(document.getElementsByClassName("el-upload__input")[0].value);
    //   this.img = document.getElementsByClassName("el-upload__input")[0].value;
    //   this.imagesPath = this.ruleForm.imagesPath = this.img;
    // },
    beforeAvatarUpload(file) {
      console.log(file.name);
      let a = file.name.substring(file.name.length - 3);
      console.log(a);

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (a !== "jpg") {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        retur;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return isLt2M;
      }
      // return new Promise(async (resolve, reject) => {
      //   let blobs = ["我水印"];

      //   // 大于512k的图片则先压缩
      //   if (file.size > 512 * 1024) {
      //     file = await this.compressor(file);
      //   }
      //   // 添加水印
      //   let blob = await addWaterMarker(file);
      //   blob.name = file.name;
      //   blobs.push(blob);

      //   resolve(blobs);
      // });
      // return new Promise((resolve) => {
      //   // 压缩到100KB,这里的100就是要压缩的大小,可自定义
      //   imageConversion.compressAccurately(file, 60).then((res) => {
      //     console.log(res);
      //     console.log(file);
      //     console.log(111);
      //     resolve(res);
      //   });
      // });
    },
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
      this.imagesPath = "";
      this.uploadData.push_city = "";
      this.uploadData.supplier = "";
      this.uploadData.weekNo = "";
    },
    submitForm() {
      console.log(this.img);
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(this.banners);
          let params = {
            id: this.ruleForm.id,
            ramark: this.ruleForm.ramark,
            url: this.imagesPath,
          };
          upfile(params).then((res) => {
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

