<template>
  <div>
    <el-dialog
      class="AddDialog"
      title="修改模板货道"
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
            <el-form-item label="商品图片" prop="img">
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
          <el-col :span="12">
            <el-form-item label="品类名称" prop="type_id">
              <el-select
                v-model="ruleForm.type_id"
                clearable
                style="width: 230px"
                filterable
                placeholder="请选择品类名称"
                @change="change"
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
            <el-form-item label="商品名称" prop="name">
              <el-select
                v-model="ruleForm.name"
                clearable
                style="width: 230px"
                filterable
                value-key="id"
                placeholder="请选择品类名称"
                @change="change1"
              >
                <el-option
                  v-for="item in goods"
                  :value="item"
                  :label="item.name"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格" prop="salePrice">
              <el-input
                v-model="ruleForm.salePrice"
                style="width: 180px"
                placeholder="请输入价格"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成本" prop="costPrice">
              <el-input
                v-model="ruleForm.costPrice"
                style="width: 180px"
                placeholder="请输入成本"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="容量" prop="stockMax">
              <el-input
                v-model="ruleForm.stockMax"
                style="width: 180px"
                placeholder="请输入容量"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="库存" prop="stock">
              <el-input
                v-model="ruleForm.stock"
                style="width: 180px"
                placeholder="请输入库存"
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
import { goodsList, typeList, stockEdit } from "@/request/api";

export default {
  name: "addData",
  components: {},
  data() {
    return {
      imagesPath: "",
      arr: [],
      goods: [],
      name: "",
      goodsId: "",
      dialogVisible: false,
      ruleForm: {
        stockMax: "",
        stock: "",
        costPrice: "",
        salePrice: "",
        type_id: "",
        name: "",
        id: "",
        imagesPath: "",
      },
      FormSearch: {},
      rules: {
        stockMax: [{ required: true, message: "请输入容量", trigger: "blur" }],
        stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
        costPrice: [
          { required: true, message: "请输入售卖价格", trigger: "blur" },
        ],
        salePrice: [
          { required: true, message: "请输入成本价", trigger: "blur" },
        ],
        imagesPath: [
          { required: true, message: "请选择图片", trigger: "blur" },
        ],
        type_id: [{ required: true, message: "请选择品类", trigger: "blur" }],
        name: [{ required: true, message: "请选择商品", trigger: "blur" }],
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
    show(row) {
      console.log(row);
      this.dialogVisible = true;
      this.ruleForm = row;
      this.ruleForm.id = row.id;
      this.imagesPath = this.ruleForm.imagesPath;
      this.name = row.name;
      this.goodsId = row.goodsId;
      console.log(row.goodsId);
      this.typeList();
    },
    change(data) {
      console.log(data);
      this.ruleForm.name = "";
      this.ruleForm.costPrice = "";
      this.ruleForm.salePrice = "";
      this.ruleForm.stockMax = "";
      this.ruleForm.stock = "";
      let params = {
        type_id: data,
      };
      goodsList(params).then((res) => {
        this.goods = res.data.data.list;
        console.log(this.goods);
      });
    },
    change1(data) {
      console.log(data);
      this.name = data.name;
      this.goodsId = data.goodsId;
      console.log(this.ruleForm);
      this.ruleForm.costPrice = data.costPrice;
      this.ruleForm.salePrice = data.salePrice;
    },
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
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
    },
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
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = {
            name: this.name,
            type_id: this.ruleForm.type_id,
            goodsId: this.goodsId,
            stock: this.ruleForm.stock,
            stockMax: this.ruleForm.stockMax,
            costPrice: this.ruleForm.costPrice,
            imagesPath: this.ruleForm.imagesPath,
            salePrice: this.ruleForm.salePrice,
          };
          let id = this.ruleForm.id;
          stockEdit(params, id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("修改成功");
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
