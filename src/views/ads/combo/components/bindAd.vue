<template>
  <div>
    <el-dialog
      class="AddDialog"
      :title="'绑定广告'"
      :visible.sync="dialogVisible"
      width="1000px"
      hegiht="1000px"
      :close-on-click-modal="false"
      @close="close"
    >
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
            <el-button type="primary" icon="el-icon-search" @click="searchData"
              >搜索</el-button
            >
            <el-button type="primary" icon="el-icon-plus" @click="addData()"
              >新增</el-button
            >
            <el-checkbox style="margin-left: 20px" v-model="allchecked"
              >多选</el-checkbox
            >
            <el-link style="margin-top: -3px; margin-left: 5px"
              ><i class="el-icon-delete" @click="delData"></i>
            </el-link>
          </el-form-item>
        </el-form>
      </div>
      <div class="page-content">
        <el-row>
          <el-col :span="6" v-for="(item, index) in list" :key="index">
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
                <el-checkbox
                  style="margin-left: 180px"
                  v-model="item.flag"
                ></el-checkbox>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <!-- <add-data ref="addData" /> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {} from "@/request/api";

export default {
  name: "bindPoint",
  components: {},
  data() {
    return {
      dialogVisible: false,
      shop: "",
      name: "",

      checked: true,

      list: [
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "1",
          flag: true,
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "2",
          flag: true,
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "3",
          flag: true,
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "4",
          flag: true,
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "5",
          flag: true,
        },
        {
          img: "http://118.178.89.122/upload/video/20221220/7c41e63d76e140b480b476c51d1fb6b9.mp4",
          name: "广告名称",
          des: "详情",
          time: "时间",
          id: "6",
          flag: true,
        },
      ],

      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
    };
  },
  computed: {
    allchecked: {
      set(val) {
        //set(val) 设置全选的状态(true/ false)
        //手动设置了全选框的状态,就遍历数组里的每个对象的flag属性, 也就是遍历看每个小选框的状态,让它的状态改为 val 全选框的状态
        this.list.forEach((obj) => (obj.flag = val));
      },
      //小选框影响全选框
      get() {
        //判断数组里的每一个对象的flag属性 它是不是等于true, 就是判断每一个小选框的状态, 只要有一个小选框的状态不为true 就是没有被勾上, 那就返回false , 全选框的状态就是false
        // every口诀: 查找数组里"不符合"条件, 直接原地返回false
        return this.list.every((obj) => obj.flag === true);
      },
    },
    ids() {
      let ids = [];
      this.list.map((item) => {
        if (item.flag === true) {
          ids.push(item.id);
        }
      });
      return ids;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    show(item) {
      console.log(item);
      this.dialogVisible = true;
      this.ruleForm = item;
    },

    addData(type) {
      this.$refs.addData.show(1, {});
    },
    delData() {
      console.log("删除");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    searchData() {},

    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
    },

    submitForm() {
      console.log(this.ids);
      //   this.$refs.ruleForm.validate(async (valid) => {
      //     if (valid) {
      //     } else {
      //       return false;
      //     }
      //   });
    },
  },
};
</script>

<style>
</style>
