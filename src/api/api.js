import axios from 'axios'
import Vue from 'vue'
axios.defaults.baseURL = '/api/'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000 // 10000ms的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //config是axios请求的参数
  console.log(config)
  const token = sessionStorage.getItem('token')
  if (token !== null && token !== '') {
    config.headers.Authorization = "Bearer " + token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})


const instance = {}

// 对异常的基本处理
;
['get', 'post', 'put', 'delete'].forEach((key) => {
  instance[key] = function (...args) { // 闭包给原函数捕获异常
    return axios[key](...args)
      .then((data) => {
        return Promise.resolve(data)
      })
      .catch((err) => {
        console.log('api error:', err)
        if (err.response && err.response.status >= 500) {
          Vue.prototype.$Message({
            type: 'error',
            message: `Σ(;ﾟдﾟ)  服务器崩坏，需要联系管理员维修`,
            duration: 6.5
          })
        } else if (err.response && err.response.status === 403) {
          Vue.prototype.$Message({
            type: 'error',
            message: `╮(╯_╰)╭ 你没有相关权限进行此操作`,
            duration: 6.5
          })
        } else if (err.response && err.response.status === 401) {
          Vue.prototype.$Message({
            type: 'error',
            message: `(〃∀〃) 请先登录`,
            duration: 6.5
          })
        } else if (err.response && err.response.status === 400) {
          Vue.prototype.$Message({
            type: 'error',
            message: `${err.response.data.error}`,
            duration: 6.5
          })
        } else if (!err.response) {
          Vue.prototype.$Message({
            type: 'error',
            message: `_(:з」∠)_  网络异常，检查你的网线`,
            duration: 6.5
          })
        } else {
          Vue.prototype.$Message({
            type: 'error',
            message: err.message,
            duration: 6.5
          })
        }
        return Promise.reject(new Error('I throw this on purpose'))
        // 继续抛出错误
        // 不让后面的继续执行，也就是说，后面的 then 必然是在请求没有错误的情况下才执行的
        // 因此后面不需要用 if (data.success) 语句判断是否有无错误
      })
  }
})

const api = {
  user: {
    SignIn: (form) => {
      return instance.post('/v1/usr/sign_in', form)

    },
    SignUp: (form) => {
      return instance.post('/v1/usr/sign_out', form)
    },
    LoadDetail: (form) => {
      return instance.get(`/v1/usr/detail`, form)
    }
  },
  repo: {
    Create: (form) => {
      return instance.post('/v1/repo/create', form)
    },
    Update: (form) => {
      return instance.put(`/v1/repo/${form.username}/${form.repo}`, form)
    },
    Delete: (form) => {
      return instance.delete(`/v1/repo/${form.username}/${form.repo}`, form)
    },
    List: (form) => {
      return instance.get(`/v1/repo/list/${form.pageSize}/${form.page}/${form.order}`)
    },
    Info: (form) => {
      return instance.get(`/v1/repo/info/${form.username}/${form.repo}`)
    },
    Branches: (form) => {
      return instance.get(`/v1/repo/branch/${form.username}/${form.repo}`)
    },
    Commit: (form) => {
      return instance.get(`/v1/repo/commit/${form.username}/${form.repo}`)
    },
    Files: (form) => {
      return instance.get(`/v1/repo/file/${form.username}/${form.repo}/${form.relpath}`)
    },
    FileInfo: (form) => {
      return instance.get(`/v1/repo/rawfile/${form.username}/${form.repo}/${form.relpath}`)
    }
  },
  container: {
    Create: (form) => {
      return instance.post('/v1/cloud/create', form)
    },
    Update: (form) => {
      return instance.put(`/v1/cloud/${form.cloud_id}`, form)
    },
    Delete: (form) => {
      return instance.delete(`/v1/cloud/${form.cloud_id}`, form)
    },
    List: (form) => {
      return instance.get(`/v1/cloud/list/${form.pageSize}/${form.page}/${form.order}`)
    },
    Run: (form) => {
      return instance.post(`/v1/cloud/action/run/${form.cloud_id}`)
    },
    Stop: (form) => {
      return instance.post(`/v1/cloud/action/stop/${form.cloud_id}`)
    },
    Stat: (form) => {
      return instance.post(`/v1/cloud/action/stat/${form.cloud_id}`)
    },
    Images: () => {
      return instance.get(`/v1/cloud/images`)
    }
  },
  admin: {
    UserList: (form) => {
      return instance.get(`/v1/admin/users/${form.pageSize}/${form.page}/${form.order}`)
    },
    User: (form) => {
      return instance.get(`/v1/admin/user/${form.id}`)
    },
    Containers: (form) => {
      return instance.get(`/v1/admin/containers/${form.pageSize}/${form.page}/${form.order}`)
    },
    Container: (form) => {
      return instance.get(`/v1/admin/container/${form.cloud_id}/`)
    },
    Repositories: (form) => {
      return instance.get(`/v1/admin/repositories/${form.pageSize}/${form.page}/${form.order}`)
    },
    Repository:(form)=>{
      return instance.get(`/v1/admin/repository/${form.repo_id}`)
    },
    CreateNews: (form)=> {
      return instance.post(`/v1/news`, form)
    },
    News: (form)=> {
       return  instance.get(`/v1/news/list/${form.pageSize}/${form.page}/${form.order}`)
    }
  },
  news: {
    List: (form)=> {
      return instance.get(`/v1/news/list/${form.pageSize}/${form.page}/${form.order}`)
    },
    UpdateNews: (form)=> {
      return instance.put(`/v1/news`, form)
    },
    DeleteNews: (form) => {
      return instance.put(`/v1/news`, form)
    },
    TopNews: (form)=> {
      return instance.put(`/v1/news`, form)
    }
  },
  group: {
    Create: (form) => {
      return instance.post('/v1/group/create', form)
    },
    Update: (form) => {
      return instance.put(`/v1/group/${form.cloud_id}`, form)
    },
    Delete: (form) => {
      return instance.delete(`/v1/group/${form.cloud_id}`, form)
    },
    List: (form) => {
      return instance.get(`/v1/group/list/${form.pageSize}/${form.page}/${form.order}`)
    },
  },
  file: {
    Upload: (form) => {
      return instance.post('/v1/file/upload', form)
    },
    Delete: (form) => {
      return instance.delete(`/v1/file/${form.ID}`)
    }
  }
}

export default api