import axios from 'axios'
import Vue from 'vue'

axios.defaults.baseURL = '/api/'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000 // 10000ms的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const instance = {}

// 对异常的基本处理
;
['get', 'post', 'put', 'delete'].forEach((key) => {
  instance[key] = function (...args) { // 闭包给原函数捕获异常
    return axios[key](...args)
      .then((data) => {
        return data
      })
      .catch((err) => {
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
      instance.post('/v1/usr/sign_in', form)

    },
    SignUp: (form) => {
      instance.post('/v1/usr/sign_out', form)
    }
  },
  repo: {
    Create: (form) => {
      instance.post('/v1/repo/create', form)
    },
    Update: (form) => {
      instance.put(`/v1/repo/${form.username}/${form.repo}`, form)
    },
    Delete: (form) => {
      instance.delete(`/v1/repo/${form.username}/${form.repo}`, form)
    },
    List: (form) => {
      instance.post('/v1/repo/list', form)
    },
    Info: (form) => {
      instance.get(`/v1/repo/${form.username}/${form.repo}`, {
        params: form
      })
    },
    Branches: (form) => {
      instance.get(`/v1/repo/branch/${form.username}/${form.repo}`)
    },
    Commit: (form) => {
      instance.get(`/v1/repo/commit/${form.username}/${form.repo}`)
    }
  },
  docker: {
    Create: (form) => {
      instance.post('/v1/cloud/create', form)
    },
    Update: (form) => {
      instance.put(`/v1/cloud/${form.cloud_id}`, form)
    },
    Delete: (form) => {
      instance.delete(`/v1/cloud/${form.cloud_id}`, form)
    },
    List: (form) => {
      instance.get('/v1/cloud/list', {
        params: form
      })
    },
    Run: (form) => {
      instance.post(`/v1/cloud/action/run/${form.cloud_id}`)
    },
    Stop: (form) => {
      instance.post(`/v1/cloud/action/stop/${form.cloud_id}`)
    },
    Stat: (form) => {
      instance.post(`/v1/cloud/action/stat/${form.cloud_id}`)
    }
  },
  admin: {
    UserList: (form) => {
      instance.get(`/v1/admin/users/${form.pageSize}/${form.page}/${form.order}`)
    },
    User: (form) => {
      instance.get(`/v1/admin/user/${form.id}`)
    },
    Containers: (form) => {
      instance.get(`/v1/admin/containers/${form.pageSize}/${form.page}/${form.order}`)
    },
    Container: (form) => {
      instance.get(`/v1/admin/container/${form.cloud_id}/`)
    },
    Repositories: (form) => {
      instance.get(`/v1/admin/repositories/${form.pageSize}/${form.page}/${form.order}`)
    },
    Repository:(form)=>{
      instance.get(`/v1/admin/repository/${form.repo_id}`)
    }
  }
}

export default api