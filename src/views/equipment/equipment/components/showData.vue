<template>
  <div>
    <el-dialog
      class="AddDialog"
      title="查看"
      :visible.sync="dialogVisible"
      width="800px"
      hegiht="1000px"
      :close-on-click-modal="false"
      @close="close"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="right">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="imsi:">
              <span>{{ ruleForm.imsi }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="卡激活时间:">
              <span> {{ ruleForm.activated_at }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前套餐:"
              ><span> {{ ruleForm.name }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="在线状态:"
              ><span v-if="ruleForm.online_status == 0">不在线</span>
              <span v-if="ruleForm.online_status == 1">在线</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="卡当前的联网状态:">
              <span v-if="ruleForm.net_status == 0">正常</span>
              <span v-if="ruleForm.net_status == 1">强制断网</span>
              <span v-if="ruleForm.net_status == 2">客户断网</span>
              <span v-if="ruleForm.net_status == 3">超套停</span>
              <span v-if="ruleForm.net_status == 4">服务结束</span>
              <span v-if="ruleForm.net_status == 5">提请销卡</span>
              <span v-if="ruleForm.net_status == 6">销卡</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运营商类型:">
              <span v-if="ruleForm.carrier_type == 'china_telecom'"
                >中国电信</span
              >
              <span v-if="ruleForm.carrier_type == 'china_mobile'"
                >中国移动</span
              >
              <span v-if="ruleForm.carrier_type == 'china_unicom'"
                >中国联通</span
              >
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前周期已用量:"
              >{{ ruleForm.current_cycle_usage }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="套餐周期容量:">
              <span> {{ ruleForm.package_capacity }}</span></el-form-item
            >
          </el-col>
          <el-col :span="8">
            <el-form-item label="套餐周期时长:"
              >{{ ruleForm.service_cycle_unit }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="卡当前的生命周期:"
              ><span v-if="ruleForm.life_cycle == 0">库存</span>
              <span v-if="ruleForm.life_cycle == 1">沉默期</span>
              <span v-if="ruleForm.life_cycle == 2">可用</span>
              <span v-if="ruleForm.life_cycle == 3">待续期订购</span>
              <span v-if="ruleForm.life_cycle == 4">代销卡</span>
              <span v-if="ruleForm.life_cycle == 5">已销卡</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务结束时间:"
              >{{ ruleForm.service_end_time }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { cardDetail } from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        imsi: "",
        activated_at: "",
        name: "",
        online_status: "",
        net_status: "",
        carrier_type: "",
        current_cycle_usage: "",
        package_capacity: "",
        service_cycle_unit: "",
        life_cycle: "",
        service_end_time: "",
      },
      FormSearch: {},
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
  },
  mounted() {},
  methods: {
    show(row) {
      console.log(row);
      this.iccid = row.iccid;
      console.log(this.iccid);
      this.dialogVisible = true;
      this.cardshow();
    },
    cardshow() {
      let params = {
        iccid: this.iccid,
      };
      cardDetail(params).then((res) => {
        console.log(res.data.data.result[0]);
        this.ruleForm.imsi = res.data.data.result[0].imsi;
        this.ruleForm.activated_at = res.data.data.result[0].activated_at;
        this.ruleForm.online_status = res.data.data.result[0].online_status;
        this.ruleForm.net_status = res.data.data.result[0].net_status;
        this.ruleForm.carrier_type = res.data.data.result[0].carrier_type;
        this.ruleForm.life_cycle = res.data.data.result[0].life_cycle;
        this.ruleForm.service_end_time =
          res.data.data.result[0].service_end_time;
        this.ruleForm.name = res.data.data.result[0].current_products[0].name;
        this.ruleForm.package_capacity =
          res.data.data.result[0].current_products[0].package_capacity;
        this.ruleForm.service_cycle_unit =
          res.data.data.result[0].current_products[0].service_cycle_unit;
        this.ruleForm.current_cycle_usage =
          res.data.data.result[0].current_products[0].current_cycle_usage;
      });
    },
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
    },
  },
};
</script>

<style>
</style>
