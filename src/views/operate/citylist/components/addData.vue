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
            <el-form-item label="区域名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入区域名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="点位位置" prop="value">
              <el-cascader
                v-model="ruleForm.value"
                :options="areaArr"
                :props="{ value: 'code', label: 'name' }"
                placeholder="请选择省市区"
                filterable
                @change="change"
              ></el-cascader>
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
import { creRegion, updRegion } from "@/request/api";
import { areaListData } from "@/utils/area";
export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      province: "",
      city: "",
      area: "",
      imagesPath: "",
      arr: [],
      dialogVisible: false,
      ruleForm: {
        name: "",
        value: "",
        id: "",
      },
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        value: [{ required: true, message: "请选择点位位置", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
    this.setData(areaListData());
    this.areaArr = areaListData();
  },
  mounted() {},
  methods: {
    setData(data) {
      data.map((item) => {
        item["value"] = item.code;
        item["label"] = item.name;
        if (item.children) {
          this.setData(item.children);
        }
      });
    },
    change(data) {
      console.log(data);
      this.province = data[0];
      this.city = data[1];
      this.area = data[2];
    },
    show(type, item) {
      this.type = type;
      console.log(item);
      this.dialogVisible = true;
      this.ruleForm.name = item.name;
      this.ruleForm.id = item.id;
      let arr1 = [];
      arr1.push(item.province);
      arr1.push(item.city);
      arr1.push(item.area);

      this.ruleForm.value = arr1;
      console.log(this.ruleForm.value);
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
              province: this.province,
              city: this.city,
              area: this.area,
            };
            creRegion(params).then((res) => {
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
              province: this.province,
              city: this.city,
              area: this.area,
              id: this.ruleForm.id,
            };

            updRegion(params).then((res) => {
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
