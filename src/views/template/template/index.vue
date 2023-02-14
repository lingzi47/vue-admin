<template>
  <div>
    <div class="topserch">
      <el-form :inline="true">
        <el-form-item label="模板名称">
          <el-input
            style="width: 180px"
            v-model="temname"
            clearable
            placeholder="请输入模板名称"
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
        <el-table-column prop="id" label="id" align="center"> </el-table-column>
        <el-table-column prop="name" label="模板名称" align="center">
        </el-table-column>
        <el-table-column prop="typeAll" label="商品品类" align="center">
        </el-table-column>
        <el-table-column prop="goodsAll" label="商品数量" align="center">
        </el-table-column>
        <el-table-column prop="salePrice" label="总价格" align="center">
        </el-table-column>
        <el-table-column prop="costPrice" label="总成本" align="center">
        </el-table-column>
        <el-table-column prop="profitPrice" label="总毛利" align="center">
        </el-table-column>
        <el-table-column prop="stock" label="总库存" align="center">
        </el-table-column>
        <el-table-column prop="stockMax" label="总容量" align="center">
        </el-table-column>

        <el-table-column prop="remarks" label="备注" align="center">
        </el-table-column>

        <el-table-column prop="created_at" label="创建日期" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" width="350">
          <template slot-scope="scope">
            <el-link
              type="danger"
              :underline="false"
              style="margin-left: 10px"
              @click="deleteData(scope.row)"
              >删除</el-link
            >
            <el-link
              type="warning"
              @click="showData(scope.row)"
              :underline="false"
              style="margin-left: 10px"
              >查看详情</el-link
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
import { framelist, frameDel } from "@/request/api";
export default {
  components: {
    addData,
  },
  data() {
    return {
      temname: "",
      sta: "",
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
      };
      framelist(params).then((res) => {
        this.page.total = res.data.data.total;
        this.list = res.data.data.list;
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
    //利用type区分增加还是修改
    addData(type) {
      this.$refs.addData.show(1, {});
    },
    searchData() {},
    showData(item) {
      this.$refs.addData.show(JSON.parse(JSON.stringify(item)));
    },
    getSelection(select) {
      var ids = select.map((i) => i.id).toString();
      console.log(ids);
    },
    deleteData(row) {
      let id = row.id;
      this.$confirm("是否删除此信息？", "提示", {
        type: "warning",
      })
        .then(async () => {
          frameDel(id).then((res) => {
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