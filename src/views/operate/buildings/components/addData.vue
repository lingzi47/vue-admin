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
            <el-form-item label="楼栋名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入楼栋名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="this.type == 1">
            <el-form-item label="所属楼盘" prop="premisesId">
              <el-select
                v-model="ruleForm.premisesId"
                clearable
                style="width: 180px"
                filterable
                placeholder="请选择所属楼盘"
              >
                <el-option
                  v-for="(item, index) in arr"
                  :value="item.xc_code"
                  :label="item.name"
                  :key="index"
                ></el-option>
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
import { buiAdd, buiEdit, preList } from "@/request/api";

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
        premisesId: "",
        xc_id: "",
        id: "",
      },
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入楼栋名称", trigger: "blur" }],
        premisesId: [
          { required: true, message: "请选择楼盘", trigger: "blur" },
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
      preList(params).then((res) => {
        this.arr = res.data.list;
        console.log(this.arr);
      });
    },
    show(type, item) {
      this.type = type;
      console.log(item);
      this.dialogVisible = true;
      this.ruleForm.name = item.build_name;
      this.ruleForm.premisesId = item.xc_premise_name;
      this.ruleForm.id = item.id;
      this.ruleForm.xc_id = item.xc_id;
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
              premisesId: this.ruleForm.premisesId,
            };
            buiAdd(params).then((res) => {
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

              xc_id: this.ruleForm.xc_id,
            };
            let id = this.ruleForm.id;
            buiEdit(params, id).then((res) => {
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
