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
        console.log(err.response)
        console.log(Vue.prototype)
        if (err.response && err.response.status >= 500) {
          Vue.prototype.$message({
            message: `Σ(;ﾟдﾟ)  服务器崩坏，需要联系管理员维修`,
            duration: 2000
          })
        } else if (err.response && err.response.status === 403) {
          Vue.prototype.$message({
            type: 'error',
            message: `╮(╯_╰)╭ 你没有相关权限进行此操作`,
            duration: 2000
          })
        } else if (err.response && err.response.status === 401) {
          Vue.prototype.$message({
            type: 'error',
            message: `(〃∀〃) 请先登录`,
            duration: 2000
          })
        } else if (err.response && err.response.status === 400) {
          Vue.prototype.$message({
            type: 'error',
            message: `${err.response.data.error}`,
            duration: 2000
          })
        } else if (!err.response) {
          Vue.prototype.$message({
            type: 'error',
            message: `_(:з」∠)_  网络异常，检查你的网线`,
            duration: 2000
          })
        } else {
          Vue.prototype.$message({
            type: 'error',
            message: err.message,
            duration: 2000
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
    },
    List: (form) => {
      return instance.post(`/v1/user/list/${form.pageSize}/${form.page}/${form.order}`, form)
    },
    BindUser: (form) => {
      return instance.post('/v1/usr/bind_u', form)
    },
    BindStu: (form) => {
      return instance.post('/v1/usr/bind_stu', form)
    },
    BindTeach: (form) => {
      return instance.post('/v1/usr/bind_teach', form)
    },
    Details() {
      return instance.get('/v1/usr/details')
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
    Create: (form) => {
      return instance.post('/v1/news/create', form)
    },
    List: (form)=> {
      return instance.post(`/v1/news/list/${form.pageSize}/${form.page}/${form.order}`, {Title:form.Title})
    },
    UpdateNews: (form)=> {
      return instance.put(`/v1/news/info/${form.id}`, form)
    },
    DeleteNews: (form) => {
      return instance.delete(`/v1/news/del/${form.id}`)
    },
    TopNews: (form)=> {
      return instance.put(`/v1/news/top/${form.id}/${form.action}`)
    },
    Get: (form)=> {
      return instance.get(`/v1/news/info/${form.id}`)
    }
  },
  process: {
    Create: (form) => {
      return instance.post('/v1/process/create', form)
    },
    List: (form)=> {
      return instance.post(`/v1/process/list/${form.pageSize}/${form.page}/${form.order}`, {Title:form.Title, PID: form.PID})
    },
    UpdateNews: (form)=> {
      return instance.put(`/v1/process/info/${form.ID}`, form)
    },
    DeleteNews: (form) => {
      return instance.delete(`/v1/process/del/${form.id}`)
    },
    Get: (form)=> {
      return instance.get(`/v1/process/info/${form.id}`)
    }
  },
  display: {
    Create: (form) => {
      return instance.post('/v1/display/create', form)
    },
    List: (form)=> {
      return instance.post(`/v1/display/list/${form.pageSize}/${form.page}/${form.order}`, {Title:form.Title, PID: form.PID})
    },
    UpdateNews: (form)=> {
      return instance.put(`/v1/display/info/${form.ID}`, form)
    },
    DeleteNews: (form) => {
      return instance.delete(`/v1/display/del/${form.id}`)
    },
    Get: (form)=> {
      return instance.get(`/v1/display/info/${form.id}`)
    }
  },
  group: {
    Create: (form) => {
      return instance.post('/v1/contest/group/create', form)
    },
    Update: (form) => {
      return instance.put(`/v1/contest/group/info/${form.ID}`, form)
    },
    Delete: (form) => {
      return instance.delete(`/v1/contest/group/${form.ID}`, form)
    },
    List: (form) => {
      return instance.post(`/v1/contest/group/list/${form.pageSize}/${form.page}/${form.order}`, form)
    },
    ListUsers: (form) => {
      return instance.post(`/v1/contest/group/members/${form.pageSize}/${form.page}/${form.order}`, form)

    },
    JoinUsers: (form) => {
      return instance.post(`/v1/contest/group/members_join`, form)
    },
    MyList: (form) => {
      return instance.post(`/v1/contest/group/mylist/${form.pageSize}/${form.page}/${form.order}`, form)
    },
    
  },
  file: {
    Upload: (form) => {
      return instance.post('/v1/file/upload', form)
    },
    Delete: (form) => {
      return instance.delete(`/v1/file/${form.ID}`)
    }
  },
  contest: {
    Create: (form) => {
      return instance.post('/v1/contest/create', form)
    },
    Update: (form) => {
      return instance.put(`/v1/contest/${form.cloud_id}`, form)
    },
    Delete: (form) => {
      return instance.delete(`/v1/contest/${form.cloud_id}`, form)
    },
    List: (form) => {
      return instance.post(`/v1/contest/list/${form.pageSize}/${form.page}/${form.order}`, form)
    },
    Get: (form)=> {
      return instance.get(`/v1/contest/info/${form.id}`)
    },
    SignUp: (form) => {
      return instance.post(`/v1/contest/sign_up/${form.contestID}/${form.groupID}`, form)
    }
  },
  question: {
    Create: (form) => {
      return instance.post('/v1/contest/question/create', form)
    },
    Update: (form) => {
      return instance.put(`/v1/contest/question/${form.cloud_id}`, form)
    },
    Delete: (form) => {
      return instance.delete(`/v1/contest/question/${form.cloud_id}`, form)
    },
    List: (form) => {
      return instance.post(`/v1/contest/question/list/${form.pageSize}/${form.page}/${form.order}`, form)
    },
    Get: (form)=> {
      return instance.get(`/v1/contest/question/info/${form.id}`)
    }
  }
}

export default api