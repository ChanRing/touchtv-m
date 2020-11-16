/**
 * Axios请求库封装
 * Created by laicr on 20/11/12
 */
import axios from 'axios'
import Qs from 'qs'
import { calcHeaders } from '@/utils/getHeaders'

// axios 配置
const options = {
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 5 * 1000
    // transformRequest: [data => Qs.stringify(data)]
    // transformResponse: [data => data]
}

const service = axios.create(options)

// 请求拦截 处理要发送的参数
let requestList = []
service.interceptors.request.use(
    config => {
        // 动态修改headers
        calcHeaders(config)

        // 添加cancelToken
        config.cancelToken = new axios.CancelToken(cancel => {
            // 如果存在相同请求则过滤，这里为[取消后面的请求]
            const currentUrl = `${config.url}?${Qs.stringify(config.data)}`
            if (requestList.includes(currentUrl)) {
                cancel(`过滤请求: ${Date.now()}`)
            } else {
                requestList.push(currentUrl)
            }
        })
        return config
    },
    error => Promise.reject(error)
)

// 响应拦截 处理响应内容
service.interceptors.response.use(
    response => {
        // 将已完成的请求在队列中去除
        const { config } = response
        const currentUrl = `${config.url}?${Qs.stringify(config.data)}`
        requestList.splice(requestList.findIndex(item => item === currentUrl))
        // todo 根据服务器返回的状态码，给予错误提示
        return response.data
    },
    ({ response = {} }) => {
        const { data = {} } = response
        const { errorMessage, errorCode } = data || {}
        console.log(errorMessage || '网络异常，请检查你的网络')
        // todo 根据实际ui调整提示效果
        return Promise.reject({ errorMessage, errorCode })
    }
)

export default service
