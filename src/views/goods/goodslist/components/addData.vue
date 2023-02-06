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
            <el-form-item label="商品名称" prop="goodsname">
              <el-input
                v-model="ruleForm.goodsname"
                style="width: 180px"
                placeholder="请输入商品名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品类名称" prop="goodstype">
              <el-input
                v-model="ruleForm.goodstype"
                style="width: 180px"
                placeholder="请输入品类名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品状态" prop="sta">
              <el-select
                clearable
                v-model="ruleForm.sta"
                placeholder="请选择状态"
                style="width: 180px"
              >
                <el-option label="上架" value="10"></el-option>
                <el-option label="下架" value="20"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="销售价格" prop="price">
              <el-input
                v-model="ruleForm.price"
                style="width: 180px"
                placeholder="请输入销售价格"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="成本价格" prop="cost">
              <el-input
                v-model="ruleForm.cost"
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
            <el-form-item label="商品图片" prop="img">
              <el-upload
                class="avatar-uploader"
                action="https://yujian02.xyz/command/ossUpload?filename=file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="goodsimg" :src="goodsimg" class="avatar" /><i
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
import {} from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      goodsimg: "",
      dialogVisible: false,
      ruleForm: {
        goodsname: "",
        goodstype: "",
        sta: "",
        price: "",
        cost: "",
        sort: "",
        goodsimg: "",
        id: "",
      },
      FormSearch: {},
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goodstype: [
          { required: true, message: "请选择品类名称", trigger: "blur" },
        ],
        sta: [{ required: true, message: "请选择商品状态", trigger: "blur" }],
        price: [{ required: true, message: "请输入销售价格", trigger: "blur" }],
        cost: [{ required: true, message: "请输入成本价格", trigger: "blur" }],
        sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
        img: [{ required: true, message: "请选择商品图片", trigger: "blur" }],
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
      this.goodsimg = this.ruleForm.goodsimg;
    },
    //成功
    handleAvatarSuccess(res, file) {
      this.ruleForm.goodsimg = res.data;
      this.goodsimg = this.ruleForm.goodsimg;
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
          let params = {};
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
