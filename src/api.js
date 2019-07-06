const ip = {
    path:'http://192.168.1.112:4000'
};
export const register = ip.path + '/register';//注册
export const login  = ip.path+'/login'//登录
export const getjoblist = ip.path + '/getjob'//获取职位

export const setJobarea = ip.path + '/setJobarea'//设置地区---职位的筛选
export const writeinfo = ip.path +'/writeinfo'//写入用户信息
export const getinfo = ip.path + '/getinfo'//获取用户设置
export const getcompanyByName = ip.path + '/getcompany'//获取用户设置
export const postBossAddJob = ip.path +'/postBossAddJob'//boss添加职位
export const getBossAddJob =  ip.path +'/getBossAddJob'//获取boss职位