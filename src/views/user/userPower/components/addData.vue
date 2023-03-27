<template>
  <div>
    <el-dialog
      class="AddDialog"
      :title="type == 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="800px"
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
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="角色组名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入角色组名称"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="tree-menu">
        <el-tree
          ref="menuTree"
          :data="treeMenu"
          :props="defaultProps"
          show-checkbox
          :default-expand-all="true"
          node-key="id"
          :default-checked-keys="treeCheckedKeys"
          @check-change="checkChange"
          @click="getNode"
        ></el-tree>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleadd, roleEdit, Authlist } from "@/request/api";
import { areaListData } from "@/utils/area";
export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      id: "",
      m_id: "",
      q_id: "",
      defaultProps: {
        children: "subs",
        label: "title",
      },
      drawer: false,
      roleInfo: {},
      treeMenu: [],
      midarr: [],
      treeCheckedKeys: [],
      type: "",
      imagesPath: "",
      arr: [],
      dialogVisible: false,
      ruleForm: {
        name: "",
        value: "",
        id: "",
      },
      FormSearch: {},
      rules: {
        name: [
          { required: true, message: "请输入角色组名称", trigger: "blur" },
        ],
      },
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
    this.getMenu();
  },
  mounted() {},
  methods: {
    getNode(treeMenu) {},
    show(type, item) {
      this.type = type;
      this.dialogVisible = true;
      if (this.type == 2) {
        this.ruleForm.name = item.roleName;
        this.id = item.id;
        console.log(item);
        var arr = item.authId.split(",");
        arr.forEach((item) => {
          this.checked(item, this.treeMenu, this.newArr);
        });

        // this.treeCheckedKeys = item.authId.split(",");
      }
    },
    checked(id, data, newArr) {
      var This = this;
      var newArr = [];
      //循环判断id是否相同、是否有子级
      data.forEach((item) => {
        if (item.id == id) {
          //id相同，且没有子级的时候，将值赋值给tree
          if (item.subs.length == 0) {
            This.treeCheckedKeys.push(item.id);
          }
        } else {
          //否则将继续循环判断
          if (item.hasOwnProperty("subs")) {
            if (item.subs.length != 0) {
              This.checked(id, item.subs, newArr);
            }
          }
        }
      });
    },

    getMenu() {
      let params = {};
      Authlist(params).then((res) => {
        this.treeMenu = res.data.data;
      });
    },
    // 节点被点击
    checkChange(data, checked) {
      let treedata = this.$refs.menuTree
        .getCheckedNodes()
        .concat(this.$refs.menuTree.getHalfCheckedNodes());
      let treedata1 = this.$refs.menuTree.getCheckedNodes();
      let arrnew = treedata
        .map((obj, index) => {
          return obj.id;
        })
        .join(",")
        .split(",");
      var m_id = arrnew.toString();
      this.m_id = m_id;
      console.log(this.m_id, "m");
      // 全选中
      let arrnew1 = treedata1
        .map((obj, index) => {
          return obj.id;
        })
        .join(",")
        .split(",");
      var q_id = arrnew1.toString();
      this.q_id = q_id;
      console.log(this.q_id, "p");
      // let checkedKey = this.$refs.menuTree.getCheckedKeys();
      // if (checked) {
      //   let searchId = data.id;
      //   if (checkedKey.indexOf(searchId) == -1) {
      //     checkedKey.push(searchId);
      //     this.$refs.menuTree.setCheckedKeys(checkedKey);
      //   }
      // }
      // else {
      //   let searchParId = data.id;
      //   // checkedKey.map((item) => {
      //   //   if (item.substring(0, 5) == searchParId) searchParFlag = true;
      //   // });
      // }
    },
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.type == 1) {
            let params = {
              roleName: this.ruleForm.name,
              authId: this.m_id,
            };
            roleadd(params).then((res) => {
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
              roleName: this.ruleForm.name,
              authId: this.m_id,
            };
            let id = this.id;
            roleEdit(params, id).then((res) => {
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
