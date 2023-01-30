import request from '@/request/request'

//验证码
export const sendsms = (params) => request.get('adminApi/sendsms', {
    params
})
//登录
export const oksms = (params) => request.get('adminApi/oksms', {
    params
})
//验证码adminApi/phoneCode
export const phoneCode = (params) => request.get('adminApi/phoneCode', {
    params
})


//用户详情
export const userinfo = (params, id) => request.get('/adminApi/mobileUser/info' + "/" + id, {
    params,
    id
})
//编辑用户
export const editUser = (params, id) => request.put('/adminApi/adminUser' + "/" + id,
    params,
    id
)

//删除用户
export const delUser = (params, id) => request.delete('/adminApi/adminUser' + "/" + id, {
    params,
    id
})

//app用户启用
export const userZisu = (params) => request.post('/adminApi/mobileUser/ziSu',
    params,
)