import { useUser } from '@/store/user'
type RequestOptionsMethod = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'
type RequestOptionsMethodAll = RequestOptionsMethod | Lowercase<RequestOptionsMethod>

/**
 * 发送请求
 */
function baseRequest(
    url: string,
    method: RequestOptionsMethod,
    data: any,
    { noAuth = false, noVerify = false }: any,
    params: unknown
) {
    const userStore = useUser()
    const token = userStore.token
    const Url = HTTP_REQUEST_URL
    let header = JSON.parse(JSON.stringify(HEADER))
    if (!noAuth) {
        if (!token) {
            return Promise.reject({
                msg: '未登录',
            })
        }
    }
    return new Promise((resolve, reject) => {
        uni.showLoading({
            title: '加载中',
            mask: true,
        })
        uni.request({
            url: Url + url,
            method: method || 'GET',
            header: header,
            data: data || {},
            success: (res: any) => {
                console.log('res', res)
                uni.hideLoading()
                res.data.token &&
                    res.data.token !== 'null' &&
                    userStore.setToken(res.data.token)
                if (noVerify) {
                    resolve(res)
                } else if (res.statusCode === 200) {
                    resolve(res)
                } else {
                    reject(res.data.message || '系统错误')
                }
            },
            fail: (msg) => {
                uni.hideLoading()
                reject('请求失败')
            },
        })
    })
}

// const request: Request = {}
const requestOptions: RequestOptionsMethodAll[] = [
    'options',
    'get',
    'post',
    'put',
    'head',
    'delete',
    'trace',
    'connect',
]
type Methods = typeof requestOptions[number]
const request: { [key in Methods]?: Function } = {}

requestOptions.forEach((method) => {
    const m = method.toUpperCase as unknown as RequestOptionsMethod
    request[method] = (api, data, opt, params) => baseRequest(api, m, data, opt || {}, params)
})

export default request
