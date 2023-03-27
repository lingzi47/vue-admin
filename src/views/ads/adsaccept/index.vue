<template>
  <div>
    <div class="topserch">
      <el-form :inline="true">
        <el-form-item label="设备编号">
          <el-input
            style="width: 180px"
            v-model="dev_id"
            clearable
            placeholder="请输入设备编号"
          ></el-input>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button type="primary" icon="el-icon-search" @click="searchData"
            >搜索</el-button
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
        <el-table-column prop="dev_id" label="设备号" align="center">
        </el-table-column>

        <el-table-column prop="city" label="城市" align="center">
        </el-table-column>
        <el-table-column label="任务" align="center">
          <template slot-scope="scope">
            <el-link v-if="scope.row.bizType == 1">上刊</el-link>
            <el-link v-if="scope.row.bizType == 2">下刊</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="上传时间" align="center">
        </el-table-column>
        <el-table-column prop="time" label="上刊图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.url" class="table-img" width="60px" />
          </template>
        </el-table-column>
        <el-table-column prop="batchId" label="推送批次" align="center">
        </el-table-column>
        <el-table-column prop="photoMode" label="拍照类型" align="center">
        </el-table-column>
        <el-table-column prop="photoPaper" label="是否夹报纸" align="center">
        </el-table-column>
        <el-table-column prop="photoPaperType" label="夹报类型" align="center">
        </el-table-column>
        <el-table-column
          label="额外拍照"
          prop="photoPaperSpecial"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="photoMark" label="照片水印" align="center">
        </el-table-column>
        <el-table-column prop="phone_name" label="广告名字" align="center">
        </el-table-column>
        <el-table-column label="创建时间" prop="created_at" align="center">
        </el-table-column>
        <el-table-column label="备注" prop="remark" align="center">
        </el-table-column>
        <el-table-column label="是否推送" align="center">
          <template slot-scope="scope">
            <el-link v-if="scope.row.is_push_xc == 1">未推</el-link>
            <el-link v-if="scope.row.is_push_xc == 2">已推</el-link>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link
              type="warning"
              @click="editData(2, scope.row)"
              :underline="false"
              style="margin-left: 10px"
              >上刊</el-link
            >

            <el-link
              type="danger"
              :underline="false"
              style="margin-left: 10px"
              @click="deleteData(scope.row)"
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
    </div>
  </div>
</template>

<script>
import addData from "./components/addData.vue";
import { photolist, typeList, pushads } from "@/request/api";
export default {
  components: {
    addData,
  },
  data() {
    return {
      dev_id: "",

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

    getList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,

        dev_id: this.dev_id,
      };
      photolist(params).then((res) => {
        console.log(res.data);
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
    searchData() {
      let params = {
        page: 1,
        limit: this.page.pageSize,

        dev_id: this.dev_id,
      };
      photolist(params).then((res) => {
        console.log(res);
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
      this.$confirm("是否推送此信息？", "提示", {
        type: "warning",
      })
        .then(async () => {
          let params = { id: row.id };
          pushads(params).then((res) => {
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