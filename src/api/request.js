import axios from "axios";
import { ElMessage } from "element-plus";
import nprogress from "nprogress";
import "nprogress/nprogress.css"
import qs from 'qs'

const requests = axios.create({
    timeout: 100000,
    baseURL:'/api',
    withCredentials: true,
})
// 请求拦截器
requests.interceptors.request.use((config) => {
    // //用户身份token
    // if (store.state.user.token) {
    //     config.headers.Authorization = store.state.user.token;
    // }
     // 序列化get请求中的数组
     if (config.method === 'get') {
        config.paramsSerializer = (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
     }
    return config
},
    (error) => {
        Promise.reject(error)
    }
)
// 响应拦截器
requests.interceptors.response.use((res) => {
    console.log("请求到的数据是", res);
    const {status, data} = res
    if(status == 200){

    }
    return data
}, (error) => {
    const { response } = error
    console.log('error is', error);
    ElMessage.error(response.data.message)
    Promise.reject(error)
})
export default requests