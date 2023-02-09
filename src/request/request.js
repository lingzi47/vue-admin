import axios from "axios";
let baseURL = window.PLATFROM_CONFIG

// 配置axios
const instance = axios.create({
    baseURL: 'https://testboxapi.yujian02.xyz/api/',
    timeout: 5000
})

instance.interceptors.request.use(config => {
    //为请求头对象添加token验证的 Authorization 字段 
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    // console.log(config);
    return config
})

export default instance