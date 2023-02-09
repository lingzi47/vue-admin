<template>
  <div>
    <div class="topserch">
      <el-form :inline="true">
        <el-form-item label="广告名称">
          <el-input
            style="width: 180px"
            v-model="ad_name"
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
      <el-row>
        <el-col :span="4" v-for="(item, index) in list" :key="index">
          <el-card
            :body-style="{ padding: '0px' }"
            style="margin-left: 10px; margin-bottom: 10px"
          >
            <!-- 👇 -->
            <video
              id="myVideo"
              controls="controls"
              width="100%"
              height="100%"
              poster=""
            >
              <source type="video/mp4" :src="item.ad_url" />
            </video>
            <div style="padding: 14px">
              <p>{{ item.ad_name }}</p>
              <p style="margin-top: 5px; font-size: 14px; color: #999">
                {{ item.ad_details }}
              </p>
              <div class="bottom clearfix">
                <time class="time">{{ item.created_at }}</time>
                <el-button type="text" class="button" @click="editData(2, item)"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  class="button"
                  style="margin-right: 20px"
                  @click="deleteData(item.id)"
                  >删除</el-button
                >
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[12, 24, 48, 96]"
        :page-size="12"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
      <add-data ref="addData" />
    </div>
  </div>
</template>

<script>
import { adVideo, advideoDel } from "@/request/api";
import addData from "./components/addData.vue";
export default {
  components: {
    addData,
  },
  data() {
    return {
      ad_name: "",
      list: [],
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 12, //每页条数
        total: 0, //总条数
      },
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
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      adVideo(params, headers).then((res) => {
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
    searchData() {
      let params = {
        page: 1,
        limit: 10,

        ad_name: this.ad_name,
      };

      adVideo(params).then((res) => {
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
    editData(type, item) {
      this.$refs.addData.show(2, JSON.parse(JSON.stringify(item)));
    },

    deleteData(id) {
      this.$confirm("是否删除此信息？", "提示", {
        type: "warning",
      })
        .then(async () => {
          advideoDel(id).then((res) => {
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