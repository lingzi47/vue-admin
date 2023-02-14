<template>
  <div>
    <el-dialog
      class="AddDialog"
      :title="'绑定点位'"
      :visible.sync="dialogVisible"
      width="1000px"
      hegiht="1000px"
      :close-on-click-modal="false"
      @close="close"
    >
      <div class="topserch">
        <el-form :inline="true">
          <el-form-item label="关联状态">
            <el-select
              clearable
              v-model="ruleForm.link"
              placeholder="请选择关联状态"
            >
              <el-option label="已关联" value="1"></el-option>
              <el-option label="未关联" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域名称">
            <el-select
              clearable
              v-model="ruleForm.region"
              placeholder="请选择区域名称"
            >
              <el-option label="已关联" value="1"></el-option>
              <el-option label="未关联" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="线路名称">
            <el-select
              clearable
              v-model="ruleForm.line"
              placeholder="请选择线路名称"
            >
              <el-option label="已关联" value="1"></el-option>
              <el-option label="未关联" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="点位名称">
            <el-select
              clearable
              v-model="ruleForm.pointname"
              placeholder="请选择点位名称"
            >
              <el-option label="已关联" value="1"></el-option>
              <el-option label="未关联" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" icon="el-icon-search" @click="searchData"
              >搜索</el-button
            >
            <el-button type="primary" icon="el-icon-link" @click="binds"
              >批量绑定</el-button
            >
            <el-button type="primary" icon="el-icon-scissors" @click="unbinds"
              >批量解绑</el-button
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
          <el-table-column prop="deviceCode" label="设备号" align="center">
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称" align="center">
          </el-table-column>
          <el-table-column label="设备状态" align="center">
            <template slot-scope="scope">
              <span type="success" v-if="scope.row.status == 1">启用</span>
              <span type="info" v-if="scope.row.status == 2">禁用</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="创建日期" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-link
                type="info"
                :underline="false"
                v-if="scope.row.is_bind == 1"
                style="margin-left: 10px"
                @click="unbind(scope.row)"
                >解绑</el-link
              >
              <el-link
                type="success"
                v-if="scope.row.is_bind == 2"
                :underline="false"
                style="margin-left: 10px"
                @click="bind(scope.row)"
                >绑定</el-link
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
  </div>
</template>

<script>
import { adDev, binding, unbinding, allBin, allUnBin } from "@/request/api";

export default {
  name: "bindPoint",
  components: {},
  data() {
    return {
      dialogVisible: false,
      g_id: "",
      ids: "",
      ruleForm: {
        pointname: "",
        link: "",
        line: "",
        region: "",
      },
      page: {
        //分页信息
        currentPage: 1, //当前页
        pageSize: 10, //每页条数
        total: 0, //总条数
      },
      list: [],
      FormSearch: {},
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
  },
  mounted() {},
  methods: {
    show(row) {
      console.log(row.id);
      this.g_id = row.id;
      this.dialogVisible = true;
      this.getList();
    },
    getSelection(select) {
      this.ids = select.map((i) => i.id).toString();
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
    getList() {
      let params = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
        g_id: this.g_id,
      };
      adDev(params).then((res) => {
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
    searchData() {
      let params = {
        page: 1,
        limit: this.page.pageSize,
        g_id: this.g_id,
      };
      adDev(params).then((res) => {
        this.page.total = res.data.total;
        this.list = res.data.list;
      });
    },
    binds() {
      if (this.ids === "") {
        this.$message.error("请选择设备");
      } else {
        let params = {
          g_id: this.g_id,
          dev_id: this.ids,
        };
        allBin(params).then((res) => {
          if (res.data.code == 200) {
            this.$message.success("批量绑定成功");
          } else {
            this.$message.error(res.data.msg);
          }
          this.getList();
        });
      }
    },
    unbinds() {
      if (this.ids == "") {
        this.$message.error("请选择设备");
      } else {
        let params = {
          g_id: this.g_id,
          dev_id: this.ids,
        };
        allUnBin(params).then((res) => {
          if (res.data.code == 200) {
            this.$message.success("批量绑定成功");
          } else {
            this.$message.error(res.data.msg);
          }
          this.getList();
        });
      }
    },
    bind(row) {
      let params = {
        g_id: this.g_id,
        dev_id: row.id,
      };
      binding(params).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("绑定成功");
        } else {
          this.$message.error(res.data.msg);
        }
        this.getList();
      });
    },
    unbind(row) {
      let params = {
        g_id: this.g_id,
        dev_id: row.id,
      };
      unbinding(params).then((res) => {
        if (res.data.code == 200) {
          this.$message.success("解绑成功");
        } else {
          this.$message.error(res.data.msg);
        }
        this.getList();
      });
    },
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
    },

    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
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
