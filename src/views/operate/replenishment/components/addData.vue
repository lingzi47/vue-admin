<template>
  <div>
    <el-dialog
      class="AddDialog"
      title="模板详情"
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
          <el-table-column label="货道编号" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.row }}/{{ scope.row.column }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="goodsId" label="商品ID" align="center">
          </el-table-column>
          <el-table-column label="商品图片" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.imagesPath" class="table-img" width="60px" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="商品名称" align="center">
          </el-table-column>
          <el-table-column prop="salePrice" label="销售价格" align="center">
          </el-table-column>

          <el-table-column prop="costPrice" label="成本价格" align="center">
          </el-table-column>

          <el-table-column prop="stock" label="库存" align="center">
          </el-table-column>
          <el-table-column prop="stockMax" label="容量" align="center">
          </el-table-column>

          <el-table-column label="操作" align="center" width="148">
            <template slot-scope="scope">
              <el-link
                type="info"
                v-if="scope.row.status == 1"
                :underline="false"
                style="margin-left: 10px"
                @click="unbind(scope.row)"
                >停用</el-link
              >
              <el-link
                v-else
                type="success"
                :underline="false"
                style="margin-left: 10px"
                @click="bind(scope.row)"
                >启用</el-link
              >
              <el-link
                type="warning"
                @click="showData(scope.row)"
                :underline="false"
                style="margin-left: 10px"
                >修改货道</el-link
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <edit-data ref="editData" />
  </div>
</template>

<script>
import { deviceStock, stockEdit } from "@/request/api";

import editData from "./editData.vue";
export default {
  name: "AddDialog",
  components: {
    editData,
  },
  data() {
    return {
      temname: "",
      sta: "",
      deviceStock: "",
      dialogVisible: false,
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
      list: [],
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
  },
  mounted() {},
  methods: {
    show(item) {
      console.log(item);
      this.dialogVisible = true;
      this.deviceStock = item.id;
      this.getList();
    },
    getList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
        deviceStock: this.deviceStock,
      };
      deviceStock(params).then((res) => {
        console.log(res.data.data);
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
    bind(row) {
      let params = {
        status: 1,
      };
      let id = row.id;
      stockEdit(params, id).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("启用成功");
        } else {
          this.$message.error(res.data.msg);
        }
        this.getList();
      });
    },
    unbind(row) {
      let params = {
        status: 2,
      };
      let id = row.id;
      stockEdit(params, id).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("停用成功");
        } else {
          this.$message.error(res.data.msg);
        }
        this.getList();
      });
    },
    searchData() {},
    showData(item) {
      this.$refs.editData.show(JSON.parse(JSON.stringify(item)));
    },
    getSelection(select) {
      var ids = select.map((i) => i.id).toString();
      console.log(ids);
    },
    close() {
      this.dialogVisible = false;
    },

    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let params = {
            name: this.ruleForm.name,
            des: this.ruleForm.des,
            img: this.ruleForm.img,
          };
          unrealOrderAdd(params).then((res) => {
            if (res.data.code == 200) {
              this.$message.success("新增成功");
              this.$parent.getUserList();
              this.close();
              this.isDisable = false;
            } else {
              this.$message.error(res.data.msg);
              this.$parent.getUserList();
              this.close();
              this.isDisable = false;
            }
          });
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
