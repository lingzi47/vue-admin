import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: {
            title: '自述文件'
        },
        children: [{
            path: '/index',
            component: resolve => require(['../views/index/index.vue'], resolve),
            meta: {
                title: '系统首页'
            }
        },
        {
            path: '/image',
            component: resolve => require(['../views/ads/image/index.vue'], resolve),
            meta: {
                title: '图片广告'
            }
        },
        {
            path: '/video',
            component: resolve => require(['../views/ads/video/index.vue'], resolve),
            meta: {
                title: '视频广告'
            }
        },
        {
            path: '/combo',
            component: resolve => require(['../views/ads/combo/index.vue'], resolve),
            meta: {
                title: '广告组'
            }
        },
        {
            path: '/adsaccept',
            component: resolve => require(['../views/ads/adsaccept/index.vue'], resolve),
            meta: {
                title: '广告验收'
            }
        },
        {
            path: '/goodstype',
            component: resolve => require(['../views/goods/goodstype/index.vue'], resolve),
            meta: {
                title: '品类管理'
            }
        },
        {
            path: '/goodslist',
            component: resolve => require(['../views/goods/goodslist/index.vue'], resolve),
            meta: {
                title: '商品列表'
            }
        },
        {
            path: '/template',
            component: resolve => require(['../views/template/template/index.vue'], resolve),
            meta: {
                title: '货道模板'
            }
        },
        {
            path: '/equipment',
            component: resolve => require(['../views/equipment/equipment/index.vue'], resolve),
            meta: {
                title: '设备信息'
            }
        },
        {
            path: '/replenishment',
            component: resolve => require(['../views/operate/replenishment/index.vue'], resolve),
            meta: {
                title: '补货设置'
            }
        },
        {
            path: '/stocklog',
            component: resolve => require(['../views/operate/stocklog/index.vue'], resolve),
            meta: {
                title: '补货统计'
            }
        }, {
            path: '/citylist',
            component: resolve => require(['../views/operate/citylist/index.vue'], resolve),
            meta: {
                title: '区域列表'
            }
        },
        {
            path: '/estate',
            component: resolve => require(['../views/operate/estate/index.vue'], resolve),
            meta: {
                title: '楼盘列表'
            }
        },
        {
            path: '/buildings',
            component: resolve => require(['../views/operate/buildings/index.vue'], resolve),
            meta: {
                title: '楼栋列表'
            }
        },
        {
            path: '/unitlist',
            component: resolve => require(['../views/operate/unitlist/index.vue'], resolve),
            meta: {
                title: '单元列表'
            }
        }, {
            path: '/xcele',
            component: resolve => require(['../views/operate/xcele/index.vue'], resolve),
            meta: {
                title: '设备列表'
            }
        },
        {
            path: '/pointlist',
            component: resolve => require(['../views/operate/pointlist/index.vue'], resolve),
            meta: {
                title: '点位列表'
            }
        },

        {
            path: '/goodsorder',
            component: resolve => require(['../views/order/goodsorder/index.vue'], resolve),
            meta: {
                title: '订单列表'
            }
        },
        {
            path: '/userList',
            component: resolve => require(['../views/user/userList/index.vue'], resolve),
            meta: {
                title: '用户列表'
            }
        },
        {
            path: '/powerList',
            component: resolve => require(['../views/user/powerList/index.vue'], resolve),
            meta: {
                title: '菜单管理'
            }
        },
        {
            path: '/userPower',
            component: resolve => require(['../views/user/userPower/index.vue'], resolve),
            meta: {
                title: '角色组'
            }
        },

        {
            path: '/icon',
            component: resolve => require(['../components/page/Icon.vue'], resolve),
            meta: {
                title: '自定义图标'
            }
        },


        {
            path: '/table',
            component: resolve => require(['../components/page/BaseTable.vue'], resolve),
            meta: {
                title: '基础表格'
            }
        },
        {
            path: '/tabs',
            component: resolve => require(['../components/page/Tabs.vue'], resolve),
            meta: {
                title: 'tab选项卡'
            }
        },
        {
            path: '/form',
            component: resolve => require(['../components/page/BaseForm.vue'], resolve),
            meta: {
                title: '基本表单'
            }
        },
        {
            path: '/tree1',
            component: resolve => require(['../components/page/tree1.vue'], resolve),
            meta: {
                title: '基本树'
            }
        },
        {
            path: '/tree2',
            component: resolve => require(['../components/page/tree2.vue'], resolve),
            meta: {
                title: '可选择树'
            }
        },
        {
            path: '/tree3',
            component: resolve => require(['../components/page/tree3.vue'], resolve),
            meta: {
                title: '可编辑树'
            }
        },
        {
            // 富文本编辑器组件
            path: '/tree4',
            component: resolve => require(['../components/page/tree4.vue'], resolve),
            meta: {
                title: '可查询树'
            }
        },
        {
            // 富文本编辑器组件
            path: '/tree5',
            component: resolve => require(['../components/page/tree5.vue'], resolve),
            meta: {
                title: '节点选择'
            }
        },
        {
            // 富文本编辑器组件
            path: '/editor',
            component: resolve => require(['../components/page/VueEditor.vue'], resolve),
            meta: {
                title: '富文本编辑器'
            }
        },
        {
            // markdown组件
            path: '/markdown',
            component: resolve => require(['../components/page/Markdown.vue'], resolve),
            meta: {
                title: 'markdown编辑器'
            }
        },
        {
            // 图片上传组件
            path: '/upload',
            component: resolve => require(['../components/page/Upload.vue'], resolve),
            meta: {
                title: '文件上传'
            }
        },
        {
            // vue-schart组件
            path: '/charts',
            component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
            meta: {
                title: 'schart图表'
            }
        },
        {
            // 拖拽列表组件
            path: '/drag',
            component: resolve => require(['../components/page/DragList.vue'], resolve),
            meta: {
                title: '拖拽列表'
            }
        },
        {
            // 拖拽Dialog组件
            path: '/dialog',
            component: resolve => require(['../components/page/DragDialog.vue'], resolve),
            meta: {
                title: '拖拽弹框'
            }
        },
        {
            // 权限页面
            path: '/permission',
            component: resolve => require(['../components/page/Permission.vue'], resolve),
            meta: {
                title: '权限测试',
                permission: true
            }
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve),
            meta: {
                title: '404'
            }
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve),
            meta: {
                title: '403'
            }
        },
        {
            path: '/admin',
            component: resolve => require(['../components/page/admin.vue'], resolve),
            meta: {
                title: '用户信息'
            }
        },
        {
            path: '/usermanager',
            component: resolve => require(['../components/page/sysmanager/usermanager.vue'], resolve),
            meta: {
                title: '用户管理'
            }
        }
        ]
    },
    {
        //登录 
        path: '/login',
        component: resolve => require(['../views/login/index.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/404'
    }
    ]
})