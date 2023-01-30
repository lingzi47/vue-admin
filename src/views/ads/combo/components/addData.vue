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
            <el-form-item label="广告组名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入广告组名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="广告类型" prop="type">
              <el-select
                clearable
                v-model="ruleForm.type"
                placeholder="广告类型"
                style="width: 180px"
              >
                <el-option label="全屏" value="1"></el-option>
                <el-option label="半屏" value="2"></el-option>
                <el-option label="上方固定" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否默认" prop="isshow">
              <el-select
                clearable
                v-model="ruleForm.isshow"
                placeholder="是否默认"
                style="width: 180px"
              >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="des">
              <el-input
                v-model="ruleForm.des"
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
import {} from "@/request/api";

export default {
  name: "addData",
  components: {},
  data() {
    return {
      type: "",
      img: "",
      dialogVisible: false,
      ruleForm: {
        name: "",
        des: "",
        isshow: "",
        type: "",
      },
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入广告名称", trigger: "blur" }],
        des: [{ required: true, message: "请输入备注", trigger: "blur" }],
        isshow: [
          { required: true, message: "请选择是否默认", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择广告类型", trigger: "blur" }],
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
    },

    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
    },

    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
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
