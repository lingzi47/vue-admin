<template>
  <div>
    <div class="topserch">
      <el-form :inline="true">
        <el-form-item label="广告名称">
          <el-input
            style="width: 180px"
            v-model="name"
            clearable
            placeholder="请输入广告名称"
          ></el-input>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button type="primary" icon="el-icon-refresh" @click="refresh"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="searchData"
            >搜索</el-button
          >
          <el-button type="primary" icon="el-icon-plus" @click="addData()"
            >新增</el-button
          >
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
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">
            <span>{{
              (page.currentPage - 1) * page.pageSize + scope.$index + 1
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="广告组名称" align="center">
        </el-table-column>
        <el-table-column label="广告类型" align="center">
          <template slot-scope="scope">
            <span type="success" v-if="scope.row.show_type == 1">全屏</span>
            <span type="success" v-if="scope.row.show_type == 2">半屏</span>
            <span type="success" v-if="scope.row.show_type == 3">上方固定</span>
          </template>
        </el-table-column>
        <el-table-column prop="ad_count" label="广告数量" align="center">
        </el-table-column>
        <el-table-column prop="dev_count" label="设备数量" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>
        <el-table-column prop="created_at" label="创建日期" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-link
              type="warning"
              @click="editData(2, scope.row)"
              :underline="false"
              style="margin-left: 10px"
              >修改</el-link
            >

            <el-link
              type="danger"
              :underline="false"
              style="margin-left: 10px"
              @click="deleteData(scope.row.id)"
              >删除</el-link
            >
            <el-link
              type="primary"
              :underline="false"
              style="margin-left: 10px"
              @click="bindpoint(scope.row)"
              >绑定点位</el-link
            >
            <!-- <el-link
              type="info"
              :underline="false"
              style="margin-left: 10px"
              @click="bindad(scope.row)"
              >绑定广告</el-link
            > -->
            <el-link
              type="success"
              :underline="false"
              style="margin-left: 10px"
              @click="push(scope.row.id)"
              >推送</el-link
            >
          </template>
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
      <add-data ref="addData" />
      <bind-point ref="bindPoint" />
      <bind-ad ref="bindAd" />
    </div>
  </div>
</template>

<script>
import { adGroup, adgroupDel, pushOnline } from "@/request/api";
import addData from "./components/addData.vue";
import bindPoint from "./components/bindPoint.vue";
import bindAd from "./components/bindAd.vue";
export default {
  components: {
    addData,
    bindPoint,
    bindAd,
  },
  data() {
    return {
      shop: "",
      name: "",
      total: "3",
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
        ad_name: this.ad_name,
      };
      adGroup(params).then((res) => {
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
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
    refresh() {
      this.ad_name = "";
    },
    //利用type区分增加还是修改
    addData(type) {
      this.$refs.addData.show(1, {});
    },
    getSelection(select) {
      var ids = select.map((i) => i.id).toString();
      console.log(ids);
    },
    searchData() {
      let params = {
        page: 1,
        limit: 10,
        ad_name: this.ad_name,
      };

      adGroup(params).then((res) => {
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
    editData(type, row) {
      this.$refs.addData.show(2, JSON.parse(JSON.stringify(row)));
    },
    bindpoint(row) {
      this.$refs.bindPoint.show(JSON.parse(JSON.stringify(row)));
    },
    bindad(row) {
      this.$refs.bindAd.show(2, JSON.parse(JSON.stringify(row)));
    },
    push(id) {
      this.$confirm("是否推送？", "提示", {
        type: "success",
      })
        .then(async () => {
          pushOnline(id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("推送成功");
            } else {
              this.$message.error(res.data.msg);
            }
            this.getList();
          });
        })
        .catch(() => {});
    },
    deleteData(id) {
      this.$confirm("是否删除此信息？", "提示", {
        type: "warning",
      })
        .then(async () => {
          adgroupDel(id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
            } else {
              this.$message.error(res.data.msg);
            }
            this.getList();
          });
        })
        .catch(() => {});
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