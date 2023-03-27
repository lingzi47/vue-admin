<template>
  <div>
    <el-dialog
      class="AddDialog"
      title="模板列表"
      :visible.sync="dialogVisible"
      width="1200px"
      hegiht="1000px"
      :close-on-click-modal="false"
      @close="close"
    >
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
          v-loading="loading"
          border
          stripe
        >
          <el-table-column
            label="选中"
            type="selection"
            align="center"
            width="50"
          >
          </el-table-column>
          <el-table-column prop="id" label="id" align="center">
          </el-table-column>
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
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-link
                type="success"
                :underline="false"
                style="margin-left: 10px"
                @click="useTEm(scope.row)"
                >使用</el-link
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { framelist, useFrame } from "@/request/api";

export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      temname: "",
      loading: false,
      sta: "",
      dialogVisible: false,
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
      list: [],
      deviceId: "",
      deviceCode: "",
    };
  },
  created() {},
  methods: {
    show(item) {
      this.dialogVisible = true;
      console.log(item);
      this.deviceId = item.id;
      this.deviceCode = item.deviceCode;
      this.getList();
    },
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
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
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

    searchData() {},

    useTEm(row) {
      let params = {
        frameId: row.id,
        deviceId: this.deviceId,
        deviceCode: this.deviceCode,
      };
      useFrame(params).then((res) => {
        if (res.data.code == 200) {
          this.loading = true;
          console.log(this.loading);
          setTimeout(() => {
            this.loading = false;
            console.log(this.loading);
            this.close();
            this.isDisable = false;
            this.$parent.getList();
          }, 1500);
          this.$message.success(res.data.msg);
        } else {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.close();
            this.isDisable = false;
            this.$parent.getList();
          }, 1500);
          this.$message.error(res.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>