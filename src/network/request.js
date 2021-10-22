// 导入axios
import axios from 'axios';

export function requestplaylisthot(config) {
    // 创建axios实例
    const instance = new axios.create({
        // baseURL: 'http://123.57.246.198:3000',
        // baseURL:'http://81.69.3.65:3000',
        baseURL : 'http://localhost:3000/',
        timeout:3000,
    })

    //axios的拦截器
    // 请求拦截
    instance.interceptors.request.use(config =>{
        return config
    },err =>{
        console.log(err);
    })

    //响应拦截
    instance.interceptors.response.use(res =>{
        return res.data
        // console.log(res.data);
    },err =>{
        console.log(err);
    })
    
    //发送请求 promise
    return instance(config)
}