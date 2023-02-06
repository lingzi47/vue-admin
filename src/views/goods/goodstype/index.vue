<template>
  <div>
    <div class="topserch">
      <el-form :inline="true">
        <el-form-item label="品类名称">
          <el-input
            style="width: 180px"
            v-model="goodstype"
            clearable
            placeholder="请输入品类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            clearable
            v-model="sta"
            placeholder="请选择状态"
            style="width: 180px"
          >
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="1"></el-option>
          </el-select>
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
        <el-table-column prop="goodstype" label="商品品类" align="center">
        </el-table-column>
        <el-table-column prop="num" label="商品数量" align="center">
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-link type="success" v-if="scope.row.sta == 10">上架</el-link>
            <el-link type="danger" v-if="scope.row.sta == 20">下架</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="des" label="品类详情" align="center">
        </el-table-column>

        <el-table-column prop="createtime" label="创建日期" align="center">
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

            <el-link type="danger" :underline="false" style="margin-left: 10px"
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
      >
      </el-pagination>
      <add-data ref="addData" />
    </div>
  </div>
</template>

<script>
import addData from "./components/addData.vue";
export default {
  components: {
    addData,
  },
  data() {
    return {
      goodstype: "",
      sta: "",
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
      list: [
        {
          goodstype: "默认",
          num: "1",
          sort: "排序",
          sta: "20",
          des: "品类详情",
          createtime: "创建时间",
          id: "1",
        },
        {
          goodstype: "默认",
          num: "1",
          sort: "排序",
          sta: "10",
          des: "品类详情",
          createtime: "创建时间",
          id: "1",
        },
        {
          goodstype: "默认",
          num: "1",
          sort: "排序",
          sta: "10",
          des: "品类详情",
          createtime: "创建时间",
          id: "1",
        },
        {
          goodstype: "默认",
          num: "1",
          sort: "排序",
          sta: "20",
          des: "品类详情",
          createtime: "创建时间",
          id: "1",
        },
      ],
    };
  },
  methods: {
    refresh() {
      this.goodstype = "";
      this.sta = "";
    },
    getSelection(select) {
      var ids = select.map((i) => i.id).toString();
      console.log(ids);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //利用type区分增加还是修改
    addData(type) {
      this.$refs.addData.show(1, {});
    },
    searchData() {},
    editData(type, item) {
      this.$refs.addData.show(2, JSON.parse(JSON.stringify(item)));
    },
    deleteData(id) {
      this.$confirm("是否删除此信息？", "提示", {
        type: "warning",
      })
        .then(async () => {
          // let params = {
          //   token: sessionStorage.getItem("token"),
          //   id: id,
          // };
          // goodschoosedel(params).then((res) => {
          //   if (res.data.code == 200) {
          //     this.getUserList();
          //     this.$message.success("删除成功");
          //   } else {
          //     this.$message.error(res.data.msg);
          //   }
          // });
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