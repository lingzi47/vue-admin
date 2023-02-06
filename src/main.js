import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import './assets/css/theme-green/index.css'; // 浅绿色主题 此主题下element 部分组件样式失效
import './assets/css/icon.css';
import './components/common/directives';
import "babel-polyfill";
import store from './store'
////import Mock from './mock/mock'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
//Mock.bootstrap();
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');


    if (role) {
        console.log(role);
        if (to.path == '/login') {
            next({
                path: '/'
            })
            console.log(role);
        }
    }
    if (!role && to.path !== '/login') {
        next('/login');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')