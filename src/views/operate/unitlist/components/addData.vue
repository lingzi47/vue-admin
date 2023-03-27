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
            <el-form-item label="单元名称" prop="unit_name">
              <el-input
                v-model="ruleForm.unit_name"
                style="width: 180px"
                placeholder="请输入单元名称"
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
                @change="change"
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
          <el-col :span="12" v-if="this.type == 1">
            <el-form-item label="所属楼栋" prop="buildId">
              <el-select
                v-model="ruleForm.buildId"
                clearable
                style="width: 180px"
                filterable
                placeholder="请选择所属楼栋"
              >
                <el-option
                  v-for="(item, index) in arr1"
                  :value="item.xc_id"
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
import { xcUnit, xcUnitEdit, preList, searchBuild } from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      imagesPath: "",
      arr: [],
      arr1: [],
      dialogVisible: false,
      ruleForm: {
        unit_name: "",
        premisesId: "",
        buildId: "",
        xc_id: "",
        id: "",
      },
      FormSearch: {},
      rules: {
        unit_name: [
          { required: true, message: "请输入单元名称", trigger: "blur" },
        ],
        premisesId: [
          { required: true, message: "请选择楼盘", trigger: "blur" },
        ],
        buildId: [{ required: true, message: "请选择楼栋", trigger: "blur" }],
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
    change(data) {
      console.log(data);
      let params = {
        type: 3,
        id: data,
      };
      searchBuild(params).then((res) => {
        console.log(res);
        this.arr1 = res.data.data;
      });
    },
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
              name: this.ruleForm.unit_name,
              premisesId: this.ruleForm.premisesId,
              buildId: this.ruleForm.buildId,
            };
            xcUnit(params).then((res) => {
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
              name: this.ruleForm.unit_name,
              premisesId: this.ruleForm.premisesId,
              xc_id: this.ruleForm.xc_id,
            };
            let id = this.ruleForm.id;
            xcUnitEdit(params, id).then((res) => {
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
</style>
