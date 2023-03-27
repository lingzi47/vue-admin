<template>
  <div>
    <div class="topserch">
      <el-form :inline="true">
        <el-form-item label="楼盘名称">
          <el-input
            style="width: 180px"
            v-model="name"
            clearable
            placeholder="请输入楼盘名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="点位位置">
          <el-cascader
            v-model="form.value1"
            :options="areaArr"
            :props="{ value: 'code', label: 'name' }"
            placeholder="请选择省市区"
            filterable
            @change="change"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="物业公司">
          <el-input
            style="width: 180px"
            v-model="management"
            clearable
            placeholder="请输入物业公司"
          ></el-input>
        </el-form-item>

        <el-form-item label="创建时间">
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
        <el-table-column prop="build_name" label="楼栋名称 " align="center">
        </el-table-column>

        <el-table-column prop="name" label="区域名称" align="center">
        </el-table-column>
        <el-table-column prop="xc_premise_name" label="楼盘名称" align="center">
        </el-table-column>

        <el-table-column prop="address" label="详细地址" align="center">
        </el-table-column>

        <el-table-column prop="management" label="物业公司" align="center">
        </el-table-column>

        <el-table-column prop="created_at" label="创建时间" align="center">
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
      >
      </el-pagination>
      <add-data ref="addData" />
    </div>
  </div>
</template>

<script>
import addData from "./components/addData.vue";
import { buiList, buiDel } from "@/request/api";
import { areaListData } from "@/utils/area";
export default {
  components: {
    addData,
  },
  data() {
    return {
      type_id: "",
      name: "",
      management: "",
      province: "",
      city: "",
      area: "",
      arr: [],
      status: "",
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
      list: [],
      time: "",
      form: {
        value1: "",
      },
    };
  },
  created() {
    this.getList();
    this.setData(areaListData());
    this.areaArr = areaListData();
  },
  watch: {
    time(newVal) {
      if (newVal == null) {
        this.time = [];
      }
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
    setData(data) {
      data.map((item) => {
        item["value"] = item.code;
        item["label"] = item.name;
        if (item.children) {
          this.setData(item.children);
        }
      });
    },
    change(data) {
      console.log(data);
      this.province = data[0];
      this.city = data[1];
      this.area = data[2];
    },
    getList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
        name: this.name,
        province: this.province,
        city: this.city,
        area: this.area,
        stime: this.time[0],
        etime: this.time[1],
        management: this.management,
      };
      buiList(params).then((res) => {
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
    searchData() {
      let params = {
        page: 1,
        limit: this.page.pageSize,
        name: this.name,
        province: this.province,
        city: this.city,
        area: this.area,
        stime: this.time[0],
        etime: this.time[1],
        management: this.management,
      };
      buiList(params).then((res) => {
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
      let id = row.id;
      this.$confirm("是否删除此信息？", "提示", {
        type: "warning",
      })
        .then(async () => {
          buiDel(id).then((res) => {
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