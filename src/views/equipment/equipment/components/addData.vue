<template>
  <div>
    <el-dialog class="AddDialog" :title="type == 1 ? '新增' : '编辑'" :visible.sync="dialogVisible" width="800px"
      hegiht="1000px" :close-on-click-modal="false" @close="close">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="auto">
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="设备名称" prop="deviceName">
              <el-input v-model="ruleForm.deviceName" style="width: 180px" placeholder="请输入设备名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="iccid" prop="iccid">
              <el-input v-model="ruleForm.iccid" style="width: 180px" placeholder="请输入iccid"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select clearable v-model="ruleForm.status" placeholder="请选择状态" style="width: 180px">
                <el-option label="启用" :value="1"></el-option>
                <el-option label="禁用" :value="2"></el-option>
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
import { deviceAdd, deviceEdit } from "@/request/api";

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
        deviceName: "",
        status: "", iccid: '',
        id: "",
      },
      FormSearch: {},
      rules: {
        deviceName: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        iccid: [{ required: true, message: "请输入iccid", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
  },
  mounted() { },
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
          if (this.type == 1) {
            let params = {
              deviceName: this.ruleForm.deviceName,
              status: this.ruleForm.status,
              iccid: this.ruleForm.iccid
            };
            deviceAdd(params).then((res) => {
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
              deviceName: this.ruleForm.deviceName,
              status: this.ruleForm.status,
              iccid: this.ruleForm.iccid
            };
            let id = this.ruleForm.id;
            deviceEdit(params, id).then((res) => {
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
