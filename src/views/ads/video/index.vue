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
        <el-form-item label="商户">
          <el-select
            clearable
            v-model="shop"
            placeholder="请选择商户"
            style="width: 250px"
          >
            <el-option
              label="预见未来（辽宁）计算机软件科技有限公司"
              value="1"
            ></el-option>
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
      <el-row>
        <el-col :span="4" v-for="(item, index) in list" :key="index">
          <el-card
            :body-style="{ padding: '0px' }"
            style="margin-left: 10px; margin-bottom: 10px"
          >
            <video
              id="myVideo"
              controls="controls"
              width="100%"
              height="100%"
              poster=""
            >
              <source type="video/mp4" :src="item.img" />
            </video>
            <div style="padding: 14px">
              <p>{{ item.name }}</p>
              <p style="margin-top: 5px; font-size: 14px; color: #999">
                {{ item.des }}
              </p>
              <div class="bottom clearfix">
                <time class="time">{{ item.time }}</time>
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
      shop: "",
      name: "",
      list: [
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "1",
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "2",
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "3",
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "4",
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "5",
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "6",
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "7",
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "8",
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "9",
        },
      ],
    };
  },
  methods: {
    refresh() {
      this.shop = "";
      this.name = "";
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