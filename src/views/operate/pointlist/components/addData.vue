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
            <el-form-item label="设备编码" prop="eleId">
              <el-select
                v-model="ruleForm.eleId"
                clearable
                style="width: 180px"
                filterable
                placeholder="请选择设备编码"
              >
                <el-option
                  v-for="(item, index) in arr2"
                  :value="item.xc_id"
                  :label="item.name"
                  :key="index.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型id" prop="devId">
              <el-select
                v-model="ruleForm.devId"
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
          <el-col :span="12">
            <el-form-item label="签约类型" prop="signType">
              <el-select
                clearable
                v-model="ruleForm.signType"
                placeholder="请选择"
                style="width: 180px"
              >
                <el-option label="梯内" :value="1"></el-option>
                <el-option label="梯外" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="this.ruleForm.signType == 2">
            <el-form-item label="楼层" prop="floor">
              <el-input
                v-model="ruleForm.floor"
                style="width: 180px"
                placeholder="请输入楼层"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="点位编码" prop="pointNum">
              <el-input
                v-model="ruleForm.pointNum"
                style="width: 180px"
                placeholder="请输入点位编码"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资产编码" prop="resourceNum">
              <el-input
                v-model="ruleForm.resourceNum"
                style="width: 180px"
                placeholder="请输入资产编码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="点位状态" prop="status">
              <el-select
                clearable
                v-model="ruleForm.status"
                placeholder="请选择"
                style="width: 180px"
              >
                <el-option label="可售" :value="4"></el-option>
                <el-option label="维护" :value="5"></el-option>
                <el-option label="拆除" :value="6"></el-option>
                <el-option label="预拆除" :value="7"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="安装位置" prop="position">
              <el-select
                clearable
                v-model="ruleForm.position"
                placeholder="请选择"
                style="width: 180px"
              >
                <el-option label="梯内" :value="1"></el-option>
                <el-option label="梯外" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="安装时间" prop="installTime">
              <el-date-picker
                v-model="ruleForm.installTime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择安装时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网络状态" prop="network">
              <el-select
                clearable
                v-model="ruleForm.network"
                placeholder="请选择"
                style="width: 180px"
              >
                <el-option label="有" value="1"></el-option>
                <el-option label="无" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="声音" prop="decibel">
              <el-select
                clearable
                v-model="ruleForm.decibel"
                placeholder="请选择"
                style="width: 180px"
              >
                <el-option label="有" value="1"></el-option>
                <el-option label="无" value="2"></el-option>
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
import { pointAdd, pointEdit, getele, pointshow, eleList } from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      imagesPath: "",
      arr: [],
      arr2: [],
      arr3: [],
      dialogVisible: false,
      ruleForm: {
        eleId: "",
        devId: "",
        signType: "",
        floor: "",
        pointNum: "",
        machineNum: "",
        resourceNum: "",
        status: "",
        xc_id: "",
        position: "",
        installTime: "",
        network: "",
        decibel: "",
        id: "",
      },
      FormSearch: {},
      rules: {
        eleId: [{ required: true, message: "请输入", trigger: "blur" }],
        devId: [{ required: true, message: "请输入", trigger: "blur" }],
        signType: [{ required: true, message: "请输入", trigger: "blur" }],
        floor: [{ required: true, message: "请输入", trigger: "blur" }],
        pointNum: [{ required: true, message: "请输入", trigger: "blur" }],
        machineNum: [{ required: true, message: "请输入", trigger: "blur" }],
        resourceNum: [{ required: true, message: "请输入", trigger: "blur" }],
        status: [{ required: true, message: "请输入", trigger: "blur" }],
        position: [{ required: true, message: "请输入", trigger: "blur" }],
        installTime: [{ required: true, message: "请输入", trigger: "blur" }],
        network: [{ required: true, message: "请输入", trigger: "blur" }],
        decibel: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
    this.getTYpe();
  },
  mounted() {},
  methods: {
    show(type, item) {
      this.type = type;
      console.log(item);
      this.dialogVisible = true;
      if (this.type == 2) {
        let id = item.id;
        pointshow(id).then((res) => {
          console.log(res);
          this.ruleForm = res.data.data[0];
          this.ruleForm.devId = Number(res.data.data[0].devId);
          // this.ruleForm.installTime = "";
          this.ruleForm.position = res.data.data[0].position - 0;
        });
      }
    },
    getTYpe() {
      let params = {
        id: 2,
      };
      getele(params).then((res) => {
        console.log(res);
        this.arr3 = res.data.data;
      });
      eleList().then((res) => {
        console.log(res);
        this.arr2 = res.data.list;
      });
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
              pk: 1,
              eleId: this.ruleForm.eleId,
              devId: this.ruleForm.devId,
              signType: this.ruleForm.signType,
              floor: this.ruleForm.floor,
              pointNum: this.ruleForm.pointNum,
              machineNum: this.ruleForm.pointNum,
              resourceNum: this.ruleForm.resourceNum,
              status: this.ruleForm.status,
              position: this.ruleForm.position,
              installTime: this.ruleForm.installTime,
              network: this.ruleForm.network,
              decibel: this.ruleForm.decibel,
            };
            pointAdd(params).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.close();
                this.isDisable = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let params = {
              pk: 1,
              eleId: this.ruleForm.eleId,
              devId: this.ruleForm.devId,
              signType: this.ruleForm.signType,
              floor: this.ruleForm.floor,
              pointNum: this.ruleForm.pointNum,
              machineNum: this.ruleForm.pointNum,
              resourceNum: this.ruleForm.resourceNum,
              status: this.ruleForm.status,
              position: this.ruleForm.position,
              installTime: this.ruleForm.installTime,
              network: this.ruleForm.network,
              decibel: this.ruleForm.decibel,
              xc_id: this.ruleForm.xc_id,
            };
            let id = this.ruleForm.id;
            pointEdit(params, id).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("修改成功");
                this.close();
                this.isDisable = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.msg);
              }
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
