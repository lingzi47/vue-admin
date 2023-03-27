<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" ref="form">
        <el-form-item style="float: right">
          <el-button type="primary" icon="el-icon-plus" @click="addData"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="page-content">
      <el-table
        border
        :data="userList"
        row-key="id"
        :tree-props="{ children: 'subs' }"
        @changeCurrentPage="changeCurrent"
      >
        <el-table-column
          prop="title"
          fixed
          label="权限名称"
          :resizable="false"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="index"
          fixed
          label="路由地址"
          :resizable="false"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" :resizable="false" align="center">
          <template slot-scope="scope">
            <el-link type="primary" @click="add2Data(3, scope.row)"
              >添加子权限</el-link
            >
            <el-link
              type="warning"
              style="margin-left: 10px"
              @click="editData(2, scope.row)"
              >修改</el-link
            >

            <el-link
              type="danger"
              style="margin-left: 20px"
              @click="deleteData(scope.row)"
              >删除</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增编辑弹窗 -->
      <add-data ref="addData" />
    </div>
  </div>
</template>

<script>
import { Authlist, AuthDel } from "@/request/api";
import addData from "./components/addData.vue";
export default {
  name: "user",
  components: {
    addData,
  },
  data() {
    return {
      page: {
        //分页信息
        currentPage: "1", //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
      token: "",
      rolesList: [], //角色列表
      userList: [], // 用户列表
      form: {
        username: "",
        tel: "",
        roles: "",
      },
    };
  },
  created() {
    this.getUserList(); //获取用户列表
  },
  mounted() {},
  computed: {},
  methods: {
    // 切换分页
    changeCurrent(page, size) {
      this.page.currentPage = page;
      this.page.pageSize = size;
      this.getUserList();
    },

    //获取用户列表
    getUserList() {
      let token = sessionStorage.getItem("token");
      this.token = token;
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
      };
      Authlist(params).then((res) => {
        this.page.total = res.data.total;

        this.userList = res.data.data;
      });
    },
    addData() {
      // 1:新增，2:编辑
      this.$refs.addData.show(1, {});
    },
    add2Data(type, row) {
      let rowData = row;
      // 1:新增，2:编辑
      this.$refs.addData.show(2, JSON.parse(JSON.stringify(rowData)));
    },
    editData(type, row) {
      let rowData = row;
      // 1:新增，2:编辑
      this.$refs.addData.show(3, JSON.parse(JSON.stringify(rowData)));
    },
    deleteData(row) {
      let id = row.id;
      this.$confirm("是否删除此信息？", "提示", {
        type: "warning",
      })
        .then(async () => {
          AuthDel(id).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("删除成功");
            } else {
              this.$message.error(res.data.msg);
            }
            this.getUserList();
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style  scoped>
</style>
