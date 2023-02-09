import request from '@/request/request'


//登录
export const login = (params) => request.post('/login',
    params
)
//注册
export const createuser = (params) => request.post('/user/create',
    params
)
//品类
//新增
export const typeAdd = (params) => request.post('/deviceAdmin/goodsType',
    params
)
//查询
export const typeList = (params, id) => request.get('/deviceAdmin/goodsType', {
    params
})
//修改
export const typeEdit = (params, id) => request.put('/deviceAdmin/goodsType' + "/" + id,
    params,
    id
)
//删除
export const typeDel = (id) => request.delete('/deviceAdmin/goodsType' + "/" + id, {
    id
})
//商品
//新增
export const goodsAdd = (params) => request.post('/deviceAdmin/goods',
    params
)
//查询
export const goodsList = (params, id) => request.get('/deviceAdmin/goods', {
    params
})
//修改
export const goodsEdit = (params, id) => request.put('/deviceAdmin/goods' + "/" + id,
    params,
    id
)
//删除
export const goodsDel = (id) => request.delete('/deviceAdmin/goods' + "/" + id, {
    id
})
//广告
//图片

//查询 
export const adImg = (params) => request.get('/adImg', {
    params,
})
//新增
export const adimgAdd = (params, ) => request.post('/adImg/create',
    params,
)
//修改
export const adimgEdit = (params, id) => request.post('/adImg/update' + "/" + id,
    params,
    id
)
//删除
export const adimgDel = (id) => request.delete('/adImg/destroy' + "/" + id, {
    id,

})
//视频

//查询 
export const adVideo = (params) => request.get('/adVideo', {
    params,
})
//新增
export const advideoAdd = (params, ) => request.post('/adVideo/create',
    params,
)
//修改
export const advideoEdit = (params, id) => request.post('/adVideo/update' + "/" + id,
    params,
    id
)
//删除
export const advideoDel = (id) => request.delete('/adVideo/destroy' + "/" + id, {
    id,

})
//广告组
export const adGroup = (params) => request.get('/adGroup', {
    params,
})
//新增
export const adgroupAdd = (params, ) => request.post('/adGroup/create',
    params,
)
//修改
export const adgroupEdit = (params, id) => request.post('/adGroup/update' + "/" + id,
    params,
    id
)
//删除
export const adgroupDel = (id) => request.delete('/adGroup/destroy' + "/" + id, {
    id,

})
//获取广告
export const adList = (params) => request.get('/adGroup/adList', {
    params,
})
//绑定设备列表
export const adDev = (params) => request.get('adDev', {
    params,
})
//绑定
export const binding = (params) => request.post('/adDev/binding',
    params,
)
//解绑
export const unbinding = (params) => request.post('/adDev/unbinding',
    params,
)
//批量绑定
export const allBin = (params) => request.post('/adDev/allBin',
    params,
)
//批量解绑
export const allUnBin = (params) => request.post('/adDev/allUnBin',
    params,
)
//推送
export const pushOnline = (params) => request.post('/adDev/pushOnline',
    params,
)
//设备
//新增
export const deviceAdd = (params) => request.post('/deviceAdmin/device',
    params
)
//查询
export const deviceList = (params, id) => request.get('/deviceAdmin/device', {
    params
})
//修改
export const deviceEdit = (params, id) => request.put('/deviceAdmin/device' + "/" + id,
    params,
    id
)
//删除
export const deviceDel = (id) => request.delete('/deviceAdmin/device' + "/" + id, {
    id
})
//详情
export const deviceStock = (params, id) => request.get('/deviceAdmin/deviceStock', {
    params
})
//修改
export const stockEdit = (params, id) => request.put('/deviceAdmin/deviceStock' + "/" + id,
    params,
    id
)