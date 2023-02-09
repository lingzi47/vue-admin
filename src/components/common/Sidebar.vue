<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#263445"
      text-color="rgba(255,255,255,.7)"
      active-text-color="#fff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <!-- 加一个''，将后台数据转换为字符串 -->
          <el-submenu :index="item.index + ''" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index + ''"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index + ''"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index + ''"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index + ''" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
import { getSysmenu } from "../../api/api";
export default {
  data() {
    return {
      collapse: false,
      menuItems: [],
      items: [
        {
          icon: "el-icon-lx-home",
          index: "index",
          title: "系统首页",
        },
        {
          icon: "el-icon-lx-calendar",
          index: "2",
          title: "广告管理",
          subs: [
            {
              index: "image",
              title: "图文广告",
            },
            {
              index: "video",
              title: "视频广告",
            },
            {
              index: "combo",
              title: "广告组",
            },
          ],
        },
        {
          icon: "el-icon-lx-copy",
          index: "3",
          title: "商品管理",
          subs: [
            {
              index: "goodstype",
              title: "品类管理",
            },
            {
              index: "goodslist",
              title: "商品列表",
            },
          ],
        },
        {
          icon: "el-icon-lx-copy",
          index: "4",
          title: "模板管理",
          subs: [
            {
              index: "template",
              title: "货道模板",
            },
          ],
        },
        {
          icon: "el-icon-lx-copy",
          index: "5",
          title: "设备管理",
          subs: [
            {
              index: "equipment",
              title: "设备信息",
            },
          ],
        },
        {
          icon: "el-icon-lx-copy",
          index: "6",
          title: "运营管理",
          subs: [
            {
              index: "replenishment",
              title: "补货设置",
            },
          ],
        },
        {
          icon: "el-icon-lx-calendar",
          index: "9",
          title: "表单相关",
          subs: [
            {
              index: "form",
              title: "基本表单",
            },
            {
              index: "3-2",
              title: "三级菜单",
              subs: [
                {
                  index: "editor",
                  title: "富文本编辑器",
                },
                {
                  index: "markdown",
                  title: "markdown编辑器",
                },
              ],
            },
            {
              index: "upload",
              title: "文件上传",
            },
          ],
        },
        {
          icon: "el-icon-lx-calendar",
          index: "11",
          title: "树形插件",
          subs: [
            {
              index: "tree1",
              title: "基本树",
            },
            {
              index: "tree2",
              title: "可选择树",
            },
            {
              index: "tree3",
              title: "可编辑树",
            },
            {
              index: "tree4",
              title: "可查询树",
            },
            {
              index: "tree5",
              title: "节点选择",
            },
          ],
        },
        {
          icon: "el-icon-lx-emoji",
          index: "icon",
          title: "自定义图标",
        },
        {
          icon: "el-icon-lx-favor",
          index: "charts",
          title: "schart图表",
        },
        {
          icon: "el-icon-rank",
          index: "12",
          title: "拖拽组件",
          subs: [
            {
              index: "drag",
              title: "拖拽列表",
            },
            {
              index: "dialog",
              title: "拖拽弹框",
            },
          ],
        },
        {
          icon: "el-icon-lx-warn",
          index: "13",
          title: "错误处理",
          subs: [
            {
              index: "permission",
              title: "权限测试",
            },
            {
              index: "404",
              title: "404页面",
            },
          ],
        },
      ],
    };
  },
  methods: {
    getMenuData(menuName) {
      let menuData = [];
      getSysmenu().then(
        function (data) {
          let data1 = data.data.menuArr;
          data1.forEach((val, index) => {
            let i = 8;
            if (val.menuname == menuName) {
              let systemItem = {};
              systemItem.icon = "el-icon-setting";
              systemItem.idex = i;
              systemItem.title = val.menuname;
              systemItem.subs = [];
              data1.forEach((value) => {
                if (value.parentid == val.id) {
                  let systemSubs = {};
                  let menuurl = value.menuurl.split("/")[2];
                  systemSubs.index = menuurl;
                  systemSubs.title = value.menuname;
                  systemItem.subs.push(systemSubs);
                }
              });
              this.items.push(systemItem);
            }
            i++;
          });
        }.bind(this)
      );
    },
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
    });
    this.getMenuData("系统管理");
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 195px;
}
.sidebar > ul {
  height: 100%;
}
</style>
