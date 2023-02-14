<template>
  <div>
    <div class="topserch">
      <el-form :inline="true">
        <el-form-item label="商品名称">
          <el-input
            style="width: 180px"
            v-model="name"
            clearable
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input
            style="width: 180px"
            v-model="deviceCode"
            clearable
            placeholder="请输入设备编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="time"
            type="daterange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" icon="el-icon-search" @click="searchData"
            >搜索</el-button
          >
          <el-button type="primary" icon="el-icon-plus">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page-content">
      <el-table
        class="tab-bar"
        :data="list"
        border
        stripe
        @selection-change="getSelection"
      >
        <el-table-column
          label="选中"
          type="selection"
          align="center"
          width="50"
        >
        </el-table-column>
        <el-table-column prop="orderCode" label="订单编号" align="center">
        </el-table-column>
        <el-table-column prop="order_no" label="交易单号" align="center">
        </el-table-column>
        <el-table-column prop="orderCreateTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="orderDeviceCode" label="设备编号" align="center">
        </el-table-column>
        <el-table-column prop="orderDeviceName" label="设备名称" align="center">
        </el-table-column>
        <el-table-column prop="stockId" label="货道编号" align="center">
        </el-table-column>
        <el-table-column prop="stockRow" label="行" align="center">
        </el-table-column>
        <el-table-column prop="stockColumn" label="列" align="center">
        </el-table-column>
        <el-table-column prop="goodsId" label="商品ID" align="center">
        </el-table-column>
        <el-table-column prop="goodsName" label="商品名称" align="center">
        </el-table-column>
        <el-table-column prop="goodsImg" label="商品图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.goodsImg" class="table-img" width="60px" />
          </template>
        </el-table-column>
        <el-table-column prop="goodsType" label="商品分类" align="center">
        </el-table-column>
        <el-table-column prop="salePrice" label="销售价格" align="center">
        </el-table-column>
        <el-table-column prop="costPrice" label="成本价格" align="center">
        </el-table-column>
        <el-table-column prop="payPrice" label="交易价格" align="center">
        </el-table-column>
        <el-table-column prop="payStatus" label="支付状态" align="center">
          <template slot-scope="scope">
            <el-link type="warning" v-if="scope.row.payStatus == 1"
              >待支付</el-link
            >
            <el-link type="success" v-if="scope.row.payStatus == 2"
              >已支付</el-link
            >
            <el-link type="danger" v-if="scope.row.payStatus == 3"
              >支付异常</el-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" align="center">
          <template slot-scope="scope">
            <el-link type="success" v-if="scope.row.orderStatus == 1"
              >正常</el-link
            >
            <el-link type="danger" v-if="scope.row.orderStatus == 2"
              >异常</el-link
            >
            <el-link type="info" v-if="scope.row.orderStatus == 2"
              >已取消</el-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="refundStatus" label="是否退款" align="center">
          <template slot-scope="scope">
            <el-link type="success" v-if="scope.row.refundStatus == 1"
              >否</el-link
            >
            <el-link type="danger" v-if="scope.row.refundStatus == 2"
              >是</el-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="refundPrice" label="退款金额" align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { goodsOrder } from "@/request/api";

export default {
  components: {},
  data() {
    return {
      name: "",
      deviceCode: "",
      time: "",
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
      list: [],
    };
  },
  watch: {
    time(newVal) {
      if (newVal == null) {
        this.time = [];
      }
    },
  },
  created() {
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.currentPage = val;
      this.getList();
    },
    getList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
        name: this.name,
        deviceCode: this.deviceCode,
        created_at_start: this.time[0],
        created_at_end: this.time[1],
      };
      goodsOrder(params).then((res) => {
        console.log(res.data.data);
        this.page.total = res.data.data.total;
        this.list = res.data.data.list;
      });
    },
    searchData() {
      let params = {
        page: 1,
        limit: this.page.pageSize,
        name: this.name,
        deviceCode: this.deviceCode,
        created_at_start: this.time[0],
        created_at_end: this.time[1],
      };
      goodsOrder(params).then((res) => {
        console.log(res.data.data);
        this.page.total = res.data.data.total;
        this.list = res.data.data.list;
      });
    },

    getSelection(select) {
      var ids = select.map((i) => i.id).toString();
      console.log(ids);
    },
  },
};
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 280px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>