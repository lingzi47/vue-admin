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
//广告验收
export const photolist = (params, ) => request.post('/xcPhoto/photo',
    params,
)
//上刊
export const upfile = (params, ) => request.post('/xcPhoto/upfile',
    params,
)
//推送/api/xcPhoto/push
export const pushads = (params, ) => request.post('/xcPhoto/push',
    params,
)
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
export const deviceStock = (params) => request.get('/deviceAdmin/deviceStock', {
    params
})
//修改
export const stockEdit = (params, id) => request.put('/deviceAdmin/deviceStock' + "/" + id,
    params,
    id
)
//整机//货道
export const fillup = (params) => request.post('/deviceAdmin/fillup',
    params
)
//设为模板
export const frame = (params) => request.post('/deviceAdmin/frame',
    params
)
//模板管理
export const framelist = (params) => request.get('/deviceAdmin/frame',
    params
)
//删除
export const frameDel = (id) => request.delete('/deviceAdmin/frame' + "/" + id, {
    id
})
//模板 详情
export const frameInfo = (params) => request.get('/deviceAdmin/frameInfo', {
    params
})
//修改
export const frameInfoEdit = (params, id) => request.put('/deviceAdmin/frameInfo' + "/" + id,
    params,
    id
)
//使用模板
export const useFrame = (params) => request.post('/deviceAdmin/useFrame',
    params
)
//订单列表
export const goodsOrder = (params) => request.get('/deviceAdmin/goodsOrder', {
    params
})
//退款
export const refundRepeat = (params) => request.post('/deviceAdmin/refundRepeat',
    params
)
//统计列表
export const stocklog = (params) => request.get('/deviceAdmin/stocklog', {
    params
})


//菜单管理
//新增
export const Authadd = (params) => request.post('/AdminUser/usersAuth',
    params
)
//查询
export const Authlist = (params, id) => request.get('/AdminUser/usersAuth', {
    params
})
//修改
export const AuthEdit = (params, id) => request.put('/AdminUser/usersAuth' + "/" + id,
    params,
    id
)
//删除
export const AuthDel = (id) => request.delete('/AdminUser/usersAuth' + "/" + id, {
    id
})
//角色组
//新增
export const roleadd = (params) => request.post('/AdminUser/usersRole',
    params
)
//查询
export const rolelist = (params, id) => request.get('/AdminUser/usersRole', {
    params
})
//修改
export const roleEdit = (params, id) => request.put('/AdminUser/usersRole' + "/" + id,
    params,
    id
)
//删除
export const roleDel = (id) => request.delete('/AdminUser/usersRole' + "/" + id, {
    id
})
//用户
//新增
export const useradd = (params) => request.post('/AdminUser/users',
    params
)
//查询
export const userlist = (params, id) => request.get('/AdminUser/users', {
    params
})
//修改
export const userEdit = (params, id) => request.put('/AdminUser/users' + "/" + id,
    params,
    id
)
//删除
export const userDel = (id) => request.delete('/AdminUser/users' + "/" + id, {
    id
})



//区域
//列表
export const listRegion = (params) => request.get('/xcList/lisRegion', {
    params
})
//删除
export const RegionDel = (params) => request.delete('/xcList/desRegion', {
    params
})
//新增
export const creRegion = (params) => request.post('/xcList/creRegion',
    params
)
//编辑
export const updRegion = (params) => request.put('/xcList/updRegion',
    params
)

//楼栋
//查询
export const buiList = (params) => request.get('/xcList/buiList', {
    params
})
//删除
export const buiDel = (id) => request.delete('/xcBuild' + "/" + id, {
    id
})
//新增
export const buiAdd = (params) => request.post('/xcBuild',
    params
)
//修改
export const buiEdit = (params, id) => request.put('/xcBuild' + "/" + id,
    params,
    id
)





//楼盘
//新增
export const preadd = (params) => request.post('/xcPre',
    params
)
//查询
export const preList = (params) => request.get('/xcList/preList', {
    params
})
//展示
export const preshow = (id) => request.get('xcPre' + "/" + id + '/edit', {
    id
})
//修改
export const preEdit = (params, id) => request.put('/xcPre' + "/" + id,
    params,
    id
)
//字典
export const getDic = (params) => request.post('/xcPre/getDic',
    params
)
//禁忌
export const taboo = (params) => request.get('/xcPre/taboo', {
    params
})
//单元
//查询
export const unitList = (params) => request.get('/xcList/unitList', {
    params
})
//新增
export const xcUnit = (params) => request.post('/xcUnit',
    params
)
//获取/api/xcUnit/{id}/edit
export const xcUnitshow = (id) => request.get('xcUnit' + "/" + id + '/edit', {
    id
})
//修改
export const xcUnitEdit = (params, id) => request.put('/xcUnit' + "/" + id,
    params,
    id
)

//删除
export const xcUnitDel = (params, id) => request.delete('/xcUnit' + "/" + id, {
    params,
    id
})
//搜索楼栋/api/xcList/searchBuild
export const searchBuild = (params) => request.get('/xcList/searchBuild', {
    params
})
//设备
//查询
export const eleList = (params) => request.get('/xcList/eleList', {
    params
})
//新增

export const XCeleadd = (params) => request.post('/xcEle',
    params
)
//获取/api/xcUnit/{id}/edit
export const eleshow = (id) => request.get('xcEle' + "/" + id + '/edit', {
    id
})
//修改
export const eleEdit = (params, id) => request.put('/xcEle' + "/" + id,
    params,
    id
)
//设备类型
export const getele = (params) => request.get('/xcPre/deviceType', {
    params
})

//删除
export const eleDel = (params, id) => request.delete('/xcEle' + "/" + id, {
    params,
    id
})
//点位
//查询
export const pointList = (params) => request.get('/xcList/pointList', {
    params
})
//新增
export const pointAdd = (params) => request.post('/point',
    params
)
//获取/api/xcUnit/{id}/edit
export const pointshow = (id) => request.get('point' + "/" + id + '/edit', {
    id
})
//修改
export const pointEdit = (params, id) => request.put('/point' + "/" + id,
    params,
    id
)

//删除
export const pointDel = (params, id) => request.delete('/point' + "/" + id, {
    params,
    id
})
//sim卡信息/deviceAdmin/cardDetail
export const cardDetail = (params) => request.post('/deviceAdmin/cardDetail',
    params
)