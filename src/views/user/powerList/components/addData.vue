<template>
  <div>
    <el-dialog
      class="AddDialog"
      :title="type == 3 ? '编辑' : '新增'"
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
        <el-input type="hidden" v-model="ruleForm.id"></el-input>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="权限名称" prop="title">
              <el-input
                v-model="ruleForm.title"
                placeholder="请输入权限名称"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="路由地址" prop="index">
              <el-input
                v-model="ruleForm.index"
                placeholder="请输入路由地址"
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
import { Authadd, menuShow, editMenu } from "@/request/api";
export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "", //1新增，2编辑
      dialogVisible: false,
      ruleForm: {
        id: "",
        index: "",
        title: "",
        pid: "",
      },
      rules: {
        title: [
          { required: true, message: "权限名称不能为空", trigger: "blur" },
        ],
        index: [
          { required: true, message: "路由名称不能为空", trigger: "blur" },

          {
            pattern: /^[a-zA-Z]+$/,
            message: "请输入英文",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
  },

  methods: {
    //获取修改的信息

    show(type, row) {
      this.type = type;
      console.log(type);
      this.dialogVisible = true;
      this.ruleForm.pid = row.id;
      console.log(row.id);
      if (this.type == 3) {
        this.ruleForm = row;
      }
    },
    close() {
      this.dialogVisible = false;
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.type == 1) {
            let token = sessionStorage.getItem("token");
            this.token = token;
            let params = {
              pid: 0,
              index: this.ruleForm.index,
              title: this.ruleForm.title,
            };
            Authadd(params).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.$parent.getUserList();
              } else {
                this.$message.error(res.data.msg);
                this.$parent.getUserList();
              }
            });
          } else if (this.type == 2) {
            let params = {
              pid: this.ruleForm.pid,
              index: this.ruleForm.index,
              title: this.ruleForm.title,
            };
            Authadd(params).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.$parent.getUserList();
              }
            });
          } else {
            let params = {
              index: this.ruleForm.index,
              title: this.ruleForm.title,
              id: this.ruleForm.id,
            };
            AuthEdit(params, id).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("编辑成功");
                this.$parent.getUserList();
              }
            });
          }
          this.$parent.getUserList();
          this.close();
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
