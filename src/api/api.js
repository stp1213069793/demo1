import axios from "axios";

/**
 * @description 将token放到headers中的authorization
 */
const getPostConfig = function() {
        return {
            headers: {
                authorization: sessionStorage.getItem('token')
            }
        }
    }

//     /**
// * @description 获取配置
// ***/
// const baseURL ='/api';
// const getPostConfig = function(){
//     return {
//      baseURL,
//     headers: {
//     contentType:'application/json',
//     authorization: sessionStorage.getItem("token"),
//     },
// }
// }
    /**
     * @description 获取用户信息
     * @param  playod <boject>
     */
export const getUesrInfoApi = function(playod = {}) {
        return axios.post('/api/user/info', playod, getPostConfig())
    }
    /**
     * @description 修改用户信息
     * @param  playod <boject>
     */
export const updateUesrInfoApi = function(playod = {}) {
        return axios.post('/api/user/update', playod, getPostConfig())
    }
    /**
     * @description 获取验证码
     */
export const getCapchaApi = function() {
        return `/api/captcha?` + Math.random();
    }
    /**
     * @description 登录接口
     * @param playod 
     * @param playod.username
     * @param playod.password
     * @param playod.captcha
     */
export const loginApi = function(playod = {}) {
        return axios.post('/api/user/login', playod)
    }
    /**
     * @description 注册接口
     * @param playod 
     * @param playod.username
     * @param playod.password
     * @param playod.email
     * @param playod.phone
     * @param playod.captcha
     */
export const registerApi = function(playod = {}) {
        return axios.post('/api/user/register', playod)
    }
    /**
     * @description 退出登录接口
     * @param  playod 
     */
export const logOutApi = function(playod = {}) {
    return axios.post('/api/user/logout', playod)
}
export const questionApi = function(playod = {}) {
    return axios.post('/api/question/list', playod)
}
export const deleteQuestionApi = function(playod = {}) {
    return axios.post('/api/question/delete', playod)
}
export const updateQuestionApi = function(playod = {}) {
    return axios.post('/api/question/update', playod)
}
export const createQuestionApi = function(playod = {}) {
    return axios.post('/api/question/create', playod)
}
/**
 * 
 * @param {} playod 
 * 创建任务
 */
export const createTaskApi = function(playod = {}) {
    return axios.post('/api/task/create', playod)
}

/**
 * 
 * @param {} playod 
 * 查询任务列表
 */
 export const queryTaskApi = function(playod = {}) {
    return axios.post('/api/task/list', playod)
}

/**
 * 
 * @param {} playod 
 * 发布任务
 */
 export const publishTaskApi = function(playod = {}) {
    return axios.post('/api/task/release', playod)
}
/**
 * 
 * @param {} playod 
 * 任务详情
 */
 export const taskDetailsApi = function(playod = {}) {
    return axios.post('/api/task/detail', playod)
}
/**
 * 
 * @param {} playod 
 * 查询记事簿
 */
export const queryNotepadApi = function(playod = {}) {
    return axios.post('/api/diary/list', playod)
}


/**
 * 
 * @param {} playod 
 * 查询用户信息列表
 */
export const queryUserListApi = function(playod = {}) {
    return axios.post('/api/user/list', playod)
}
/**
 * 
 * @param {} playod 
 * 查询分组信息列表
 */
export const queryRuleGroupListApi = function(playod = {}) {
    return axios.post('/api/roleGroup/list', playod)
}
/**
 * 
 * @param {} playod 
 * 查询角色信息列表
 */
export const queryRuleListApi = function(playod = {}) {
    return axios.post('/api/role/list', playod)
}
/**
 * 
 * @param {} playod 
 * 创建角色
 */
export const createRuleApi = function(playod = {}) {
    return axios.post('/api/role/create', playod)
}
/**
 * 
 * @param {} playod 
 * 创建分组
 */
export const createRuleGroupApi = function(playod = {}) {
    return axios.post('/api/roleGroup/create', playod)
}