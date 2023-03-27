<template>
  <div>
    <div class="topserch">
      <el-form :inline="true">
        <el-form-item label="设备列表">
          <el-input
            style="width: 180px"
            v-model="name"
            clearable
            placeholder="请输入设备列表"
          ></el-input>
        </el-form-item>

        <el-form-item style="float: right">
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
          <!--  -->
        </el-table-column>
        <el-table-column label="序号" align="center">
          <template slot-scope="scope">
            <span>
              {{ (page.currentPage - 1) * page.pageSize + scope.$index + 1 }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="eleId"
          label="电梯编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="devName"
          label="设备类型"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="floor"
          label="楼层"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="pointNum"
          label="点位编码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="machineNum"
          label="机器码"
          align="center"
        ></el-table-column>
        <el-table-column prop="signType" label="签约类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.signType == 1">梯内</span>
            <span v-else>梯外</span>
          </template>
        </el-table-column>
        <el-table-column label="点位状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 4">可售</span>
            <span v-if="scope.row.status == 5">维护</span>
            <span v-if="scope.row.status == 6">拆除</span>
            <span v-if="scope.row.status == 7">预拆除</span>
          </template>
        </el-table-column>
        <el-table-column prop="position" label="安装位置" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.position == 1">梯内</span>
            <span v-else>梯外</span>
          </template>
        </el-table-column>
        <el-table-column prop="network" label="网络状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.network == 1">有</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column prop="decibel" label="声音" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.decibel == 1">有</span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column label="安装时间" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.installTime | Time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
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
              @click="deleteData(scope.row)"
              >删除</el-link
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
      ></el-pagination>
      <add-data ref="addData" />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import addData from "./components/addData.vue";
import { pointList, typeList, pointDel } from "@/request/api";

export default {
  components: {
    addData,
  },
  data() {
    return {
      type_id: "",
      name: "",
      arr: [],
      status: "",
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
    this.typeList();
  },
  filters: {
    Time(e) {
      //处理时间
      return moment(parseInt(e)).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  methods: {
    refresh() {
      this.type_id = "";
      this.status = "";
      this.name = "";
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
    //利用type区分增加还是修改
    addData(type) {
      this.$refs.addData.show(1, {});
    },
    typeList() {
      let params = {
        page: 1,
        limit: 100,
      };
      typeList(params).then((res) => {
        console.log(res.data.data);

        this.arr = res.data.data.list;
      });
    },
    getList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
      };
      pointList(params).then((res) => {
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
    searchData() {
      let params = {
        page: 1,
        limit: this.page.pageSize,
        name: this.name,
      };
      pointList(params).then((res) => {
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
    editData(type, item) {
      this.$refs.addData.show(2, JSON.parse(JSON.stringify(item)));
    },
    getSelection(select) {
      var ids = select.map((i) => i.id).toString();
      console.log(ids);
    },
    deleteData(row) {
      console.log(row);
      let id = row.id;
      let params = {
        xc_id: row.xc_id,
      };
      this.$confirm("是否删除此信息？", "提示", {
        type: "warning",
      })
        .then(async () => {
          pointDel(params, id).then((res) => {
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