<template>
  <div>
    <el-dialog
      class="AddDialog"
      :title="type == 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="1200px"
      hegiht="1000px"
      :close-on-click-modal="false"
      @close="close"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="auto"
      >
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="广告组名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入广告组名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="广告类型" prop="show_type">
              <el-select
                clearable
                v-model="ruleForm.show_type"
                placeholder="广告类型"
                style="width: 180px"
              >
                <el-option label="全屏" :value="1"></el-option>
                <el-option label="半屏" :value="2"></el-option>
                <el-option label="上方固定" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="ruleForm.remark"
                style="width: 180px"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="page-content">
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
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="searchData"
                >搜索</el-button
              >
              <el-checkbox style="margin-left: 20px" v-model="allchecked"
                >多选</el-checkbox
              >
            </el-form-item>
          </el-form>
        </div>
        <el-row>
          <el-col :span="6" v-for="(item, index) in list" :key="index">
            <el-card
              :body-style="{ padding: '0px' }"
              style="margin-left: 10px; margin-bottom: 10px"
            >
              <video
                v-if="item.type == 2"
                id="myVideo"
                controls="controls"
                width="100%"
                height="150px"
                poster=""
              >
                <source type="video/mp4" :src="item.ad_url" />
              </video>
              <img v-else :src="item.ad_url" width="100%" height="150px" />
              <div style="padding: 14px">
                <p>{{ item.ad_name }}</p>
                <el-checkbox
                  style="margin-left: 220px"
                  v-model="item.flag"
                ></el-checkbox>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[8, 14, 28, 56]"
          :page-size="8"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adgroupAdd, adgroupEdit, adList } from "@/request/api";

export default {
  name: "addData",
  components: {},
  data() {
    return {
      type: "",
      ad_name: "",
      checked: true,
      list: [],
      ad_id: [],
      dialogVisible: false,
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 8, //每页条数
        total: 0, //总条数
      },
      ruleForm: {
        name: "",
        remark: "",
        id: "",
        show_type: "",
      },
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入广告名称", trigger: "blur" }],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],

        show_type: [
          { required: true, message: "请选择广告类型", trigger: "blur" },
        ],
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
          console.log(item);
          ids.push(item.id);
        }
      });
      return ids;
    },
  },
  watch: {
    ids(value) {
      console.log(this.ids);
    },
  },
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
  },
  mounted() {},
  methods: {
    show(type, item) {
      this.type = type;
      this.dialogVisible = true;
      this.ruleForm = item;
      if (this.type == 2) {
        this.ad_id = item.ad_id.split(",");
      }
      this.getList();
    },
    getList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
        ad_name: this.ad_name,
      };
      let headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      adList(params, headers).then((res) => {
        this.page.total = res.data.data.total;
        let list = res.data.data.list;
        list.forEach((value, index) => {
          value["flag"] = false;
        });
        for (let i = 0; i < list.length; i++) {
          for (let j = 0; j < this.ad_id.length; j++) {
            if (list[i].id == this.ad_id[j]) {
              list[i].flag = true;
            }
          }
        }
        this.list = list;
      });
    },
    searchData() {
      let params = {
        page: 1,
        limit: 10,
        ad_name: this.ad_name,
      };
      adList(params).then((res) => {
        this.page.total = res.data.data.total;
        let list = res.data.data.list;
        list.forEach((value, index) => {
          value["flag"] = false;
        });
        this.list = list;
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
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
      this.ad_name = "";
      this.list = [];
    },

    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(this.ids);
          if (this.ids == "") {
            this.$message.error("请选择至少一个广告");
            return;
          }
          if (this.type == 1) {
            let params = {
              name: this.ruleForm.name,
              show_type: this.ruleForm.show_type,
              remark: this.ruleForm.remark,
              ad_id: this.ids.toString(),
            };

            adgroupAdd(params).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("新增成功");
              } else {
                this.$message.error(res.data.msg);
              }
              this.close();
              this.isDisable = false;
              this.$parent.getList();
            });
          } else {
            let params = {
              name: this.ruleForm.name,
              show_type: this.ruleForm.show_type,
              remark: this.ruleForm.remark,
              ad_id: this.ids.toString(),
            };

            let id = this.ruleForm.id;
            adgroupEdit(params, id).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("修改成功");
              } else {
                this.$message.error(res.data.msg);
              }
              this.close();
              this.isDisable = false;
              this.$parent.getList();
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 100%;

  display: block;
}
</style>
