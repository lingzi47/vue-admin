<template>
  <div>
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="background: #340e9e">
            <img
              src="../../assets/img/金额.png"
              style="width: 45px; margin: 16px"
            />
            <div class="text">
              总交易额
              <p style="margin: 8px 0px"></p>
              285
            </div>
          </div>
        </el-col>
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="background: #f8b551">
            <img
              src="../../assets/img/交易数.png"
              style="width: 45px; margin: 16px"
            />
            <div class="text">
              总交易笔数
              <p style="margin: 8px 0px"></p>
              115
            </div>
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="background: #5e81f4">
            <img
              src="../../assets/img/交易额.png"
              style="width: 45px; margin: 16px"
            />
            <div class="text">
              今日交易额
              <p style="margin: 8px 0px"></p>
              0.00
            </div>
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="background: #f19149">
            <img
              src="../../assets/img/今日.png"
              style="width: 45px; margin: 16px"
            />
            <div class="text">
              今日交易笔数
              <p style="margin: 8px 0px"></p>
              0
            </div>
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="background: #36be7c">
            <img
              src="../../assets/img/设备.png"
              style="width: 45px; margin: 14px"
            />
            <div class="text">
              设备总数/在线设备
              <p style="margin: 8px 0px"></p>
              3/1
            </div>
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple" style="background: #ff808b">
            <img
              src="../../assets/img/到期.png"
              style="width: 45px; margin: 16px"
            />
            <div class="text">
              到期设备
              <p style="margin: 8px 0px"></p>
              0
            </div>
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 5px;
  height: 80px;
  min-height: 50px;
}

.text {
  color: #f9fafc;
  font-size: 15px;
  margin-left: 80px;
  margin-top: -61px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>