<template>
  <div>
    <el-dialog
      class="AddDialog"
      title="设置模板"
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
            <el-form-item label="模版名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入模版名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remarks">
              <el-input
                v-model="ruleForm.remarks"
                style="width: 180px"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启用状态" prop="status">
              <el-select
                clearable
                v-model="ruleForm.status"
                placeholder="请选择启用状态"
                style="width: 180px"
              >
                <el-option label="启用" value="1"></el-option>
                <el-option label="禁用" value="2"></el-option>
              </el-select>
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
import { frame } from "@/request/api";

export default {
  name: "addData",
  components: {},
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: "",
        status: "",
        remarks: "",
        deviceId: "",
      },
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
        status: [
          { required: true, message: "请选择启用状态", trigger: "blur" },
        ],
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
    show(id) {
      console.log(id);
      this.ruleForm.deviceId = id;
      this.dialogVisible = true;
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
            name: this.name,
            name: this.ruleForm.name,
            status: this.ruleForm.status,
            remarks: this.ruleForm.remarks,
            deviceId: this.ruleForm.deviceId,
          };

          frame(params).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
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
</style>
