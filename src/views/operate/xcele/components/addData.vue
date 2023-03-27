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
            <el-form-item label="设备名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入设备名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备编号" prop="eleNum">
              <el-input
                v-model="ruleForm.eleNum"
                style="width: 180px"
                placeholder="请输入设备编号"
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
                @change="change1"
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
          <el-col :span="12" v-if="this.type == 1">
            <el-form-item label="所属单元" prop="unitId">
              <el-select
                v-model="ruleForm.unitId"
                clearable
                style="width: 180px"
                filterable
                placeholder="请选择所属单元"
              >
                <el-option
                  v-for="(item, index) in arr2"
                  :value="item.xc_id"
                  :label="item.name"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="eleType">
              <el-select
                v-model="ruleForm.eleType"
                clearable
                style="width: 180px"
                filterable
                placeholder="请选择设备类型"
              >
                <el-option
                  v-for="(item, index) in arr3"
                  :value="item.id"
                  :label="item.name"
                  :key="index.id"
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
import { XCeleadd, eleEdit, preList, searchBuild, getele } from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      imagesPath: "",
      arr: [],
      arr1: [],
      arr2: [],
      arr3: [],
      dialogVisible: false,
      ruleForm: {
        name: "",
        premisesId: "",
        buildId: "",
        xc_id: "",
        unitId: "",
        eleNum: "",
        eleType: "",
        id: "",
        xc_id: "",
      },
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        premisesId: [
          { required: true, message: "请选择楼盘", trigger: "blur" },
        ],
        buildId: [{ required: true, message: "请选择楼栋", trigger: "blur" }],
        unitId: [{ required: true, message: "请选择单元", trigger: "blur" }],
        eleNum: [
          { required: true, message: "请输入设备编号", trigger: "blur" },
        ],
        eleType: [{ required: true, message: "请选择", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
    this.typeList();
    this.getTYpe();
  },
  mounted() {},
  methods: {
    change(data) {
      this.ruleForm.buildId = "";
      this.ruleForm.unitId = "";
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
    change1(data) {
      this.ruleForm.unitId = "";

      console.log(data);
      let params = {
        type: 4,
        id: data,
      };
      searchBuild(params).then((res) => {
        console.log(res);
        this.arr2 = res.data.data;
      });
    },
    getTYpe() {
      let params = {
        id: 2,
      };
      getele(params).then((res) => {
        console.log(res);
        this.arr3 = res.data.data;
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
      if (this.type == 1) {
      } else {
        this.ruleForm = item;
        this.ruleForm.eleType = item.eleType - 0;
      }
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
              buildId: this.ruleForm.buildId,
              unitId: this.ruleForm.unitId,
              eleNum: this.ruleForm.eleNum,
              eleType: this.ruleForm.eleType,
            };
            XCeleadd(params).then((res) => {
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
              eleNum: this.ruleForm.eleNum,
              xc_id: this.ruleForm.xc_id,
              eleType: this.ruleForm.eleType,
            };
            let id = this.ruleForm.id;
            eleEdit(params, id).then((res) => {
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

<style></style>
