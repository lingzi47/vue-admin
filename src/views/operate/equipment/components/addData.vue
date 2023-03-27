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
          <el-col :span="12">
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入商品名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品类名称" prop="type_id">
              <el-select
                v-model="ruleForm.type_id"
                clearable
                style="width: 180px"
                filterable
                placeholder="请选择商品品类"
              >
                <el-option
                  v-for="item in arr"
                  :value="item.id"
                  :label="item.name"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品状态" prop="status">
              <el-select
                clearable
                v-model="ruleForm.status"
                placeholder="请选择状态"
                style="width: 180px"
              >
                <el-option label="上架" :value="1"></el-option>
                <el-option label="下架" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售价格" prop="salePrice">
              <el-input
                v-model="ruleForm.salePrice"
                style="width: 180px"
                placeholder="请输入销售价格"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成本价格" prop="costPrice">
              <el-input
                v-model="ruleForm.costPrice"
                style="width: 180px"
                placeholder="请输入成本价格"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="sort">
              <el-input
                v-model="ruleForm.sort"
                style="width: 180px"
                placeholder="请输入排序"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="商品图片" prop="imagesPath">
              <el-upload
                class="avatar-uploader"
                action="https://testboxapi.yujian02.xyz/api/common/ossUpload?file=file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imagesPath" :src="imagesPath" class="avatar" /><i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
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
import { goodsAdd, goodsEdit, typeList } from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      imagesPath: "",
      arr: [],
      dialogVisible: false,
      ruleForm: {
        name: "",
        type_id: "",
        status: "",
        salePrice: "",
        costPrice: "",
        sort: "",
        imagesPath: "",
        id: "",
      },
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        type_id: [
          { required: true, message: "请选择品类名称", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择商品状态", trigger: "blur" },
        ],
        salePrice: [
          { required: true, message: "请输入销售价格", trigger: "blur" },
        ],
        costPrice: [
          { required: true, message: "请输入成本价格", trigger: "blur" },
        ],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        imagesPath: [
          { required: true, message: "请选择商品图片", trigger: "blur" },
        ],
      },
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
    this.typeList();
  },
  mounted() {},
  methods: {
    typeList() {
      let params = {
        page: 1,
        limit: 100,
      };
      typeList(params).then((res) => {
        console.log(res.data.data);

        this.arr = res.data.data.list;
      });
    },
    show(type, item) {
      this.type = type;
      console.log(item);
      this.dialogVisible = true;
      this.ruleForm = item;
      this.imagesPath = this.ruleForm.imagesPath;
    },
    //成功
    handleAvatarSuccess(res, file) {
      this.ruleForm.imagesPath = res;
      this.imagesPath = this.ruleForm.imagesPath;
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
          if (this.type == 1) {
            let params = {
              name: this.ruleForm.name,
              type_id: this.ruleForm.type_id,
              sort: this.ruleForm.sort,
              status: this.ruleForm.status,
              costPrice: this.ruleForm.costPrice,
              imagesPath: this.ruleForm.imagesPath,
              salePrice: this.ruleForm.salePrice,
            };
            goodsAdd(params).then((res) => {
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
              name: this.ruleForm.name,
              type_id: this.ruleForm.type_id,
              sort: this.ruleForm.sort,
              status: this.ruleForm.status,
              costPrice: this.ruleForm.costPrice,
              imagesPath: this.ruleForm.imagesPath,
              salePrice: this.ruleForm.salePrice,
            };
            let id = this.ruleForm.id;
            goodsEdit(params, id).then((res) => {
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
