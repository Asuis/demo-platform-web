<template>
  <el-card class="repo-view" :body-style="{ padding: '0px' }">
    <div class="repo-container">
      <div class="name-view">
        <el-avatar src="http://res.mengxiangjing.com/preview.jpg"></el-avatar>
        <span>{{info.Name}}</span>
        <div>
          <el-input size="small" class="repo-button" id="repourl" :value="`http://192.168.2.213:8000/v1/git/${this.$route.params.username}/${this.$route.params.repo}.git`">
    <el-button slot="append" data-clipboard-target="#repourl" icon="el-icon-copy"></el-button>
  </el-input>
        </div>
         
      </div>
        
    </div>
    <div class="container2">
      <el-card v-if="!hasFile" shadow="never">
        <div slot="header">
          上传指南
        </div>
        <div class="text2 item" v-html="mark(this.help)">
          
        </div>
      </el-card>
      <el-tabs v-if="hasFile" v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="文件" name="first">

          <el-input class="container-search" v-model="input" placeholder="查找"></el-input>

          <el-table :data="files" style="width: 100%; margin-bottom:10px">
            <el-table-column prop="Name" label="文件名" width="180">
              <template slot-scope="scope">
                <i v-if="scope.row.IsDir" class="el-icon-folder"></i>
                <span @click="handleFile(scope.row.Name, scope.row.IsDir)"
                  style="margin-left: 10px">{{ scope.row.Name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="" width="180">
            </el-table-column>
            <el-table-column prop="Size" label="文件大小">
            </el-table-column>
          </el-table>

          <el-card shadow="never">
            <div slot="header">
              {{fileName}}
            </div>
            <div v-if="getFileName 
            !== 'md'" v-html="getFileInfo"></div>
            <div v-else class="text2 item" v-html="getFileInfo">
            </div>
          </el-card>
        </el-tab-pane>
        <!-- <el-tab-pane label="配置" name="second">配置</el-tab-pane> -->
        <el-tab-pane label="容器" name="third">

            
          
        </el-tab-pane>
        <el-tab-pane label="展示" name="fourth">展示</el-tab-pane>
        <el-tab-pane label="评价" name="wiki">文档</el-tab-pane>

      </el-tabs>
    </div>
    <div>
    </div>
  </el-card>
</template>
<script>
  import marked from 'marked'
  export default {
    name: 'RepoView',
    components: {},
    data() {
      return {
        username: '',
        repo: '',
        relpath: '/',
        info: {},
        files: [],
        input: '',
        fileName: '',
        activeName: 'first',
        hasFile: false,
        help: '',
        container: {
          list: [],
        payload: {
          pageSize: 10,
          page: 0,
          order: 'ID'
        },
        total: 2
        }
      }
    },
    mounted() {
      this.init()
      this.help = `
### Git仓库地址
\`\`\`
http://192.168.2.213:8000/v1/git/${this.$route.params.username}/${this.$route.params.repo}.git
\`\`\`
### 上传已有项目
\`\`\`
git push -u origin master
git remote add origin http://192.168.2.213:8000/v1/git/${this.$route.params.username}/${this.$route.params.repo}.git
\`\`\`
      `

    },
    methods: {
      init() {
        this.username = this.$route.params.username
        this.repo = this.$route.params.repo
        this.relpath = this.$route.params.relpath
        if (this.relpath == undefined) {
          this.relpath = ''
        }
        const payload = {
          username: this.username,
          repo: this.repo
        }
        this.$store.dispatch('repo/info', payload)
        this.$store.dispatch('repo/files', {
          username: this.username,
          repo: this.repo,
          relpath: this.relpath
        }).then(({
          status,
          data
        }) => {
          console.log(status, data)
          if (data.isUploaded === false) {
            this.hasFile = false
          } else {
            this.hasFile = true
            this.files = data
            this.$store.dispatch('repo/fileInfo', {
              username: this.username,
              repo: this.repo,
              relpath: 'README.md'
            }).then(() => {
            this.fileName = 'README.md'
          })
          }
        })

      },
      handleFile(name, isDir) {
        console.log('dfd', name, isDir)
        this.username = this.$route.params.username
        this.repo = this.$route.params.repo
        this.relpath = this.$route.params.relpath
        if (this.relpath == undefined) {
          this.relpath = ''
        }
        if (isDir) {
          if (this.relpath === '') {
            this.$router.push(`/repo/${this.username}/${this.repo}/${name}`)

          } else {
            this.$router.push(`/repo/${this.username}/${this.repo}/${this.relpath + '/' + name}`)

          }
        } else {
          this.$store.dispatch('repo/fileInfo', {
            username: this.username,
            repo: this.repo,
            relpath: `${this.relpath + '/' + name}`
          }).then(() => {
            this.fileName = name
          })
        }
      },
      handleClick(e) {
        console.log(e)
      },
      mark(val) {
        return marked(val)
      }
    },
    computed: {
      getInfo() {
        return this.$store.getters['repo/infoRepo']
      },
      getFiles() {
        return this.$store.getters['repo/files']
      },
      getFileInfo() {
        let arr = this.fileName.split('.')
        let suffix = arr[arr.length-1]
        if (suffix === 'md') {
          return marked(this.$store.getters['repo/fileInfo'])
        } else if (suffix === 'json') {
          
          return marked('```\n'+JSON.stringify(this.$store.getters['repo/fileInfo'])+'\n```')
        } else {
          return marked('```\n'+this.$store.getters['repo/fileInfo']+'\n```')
        }
      },
      getFileName() {
        let arr = this.fileName.split('.')
        let suffix = arr[arr.length-1]
        return suffix
      }
    },
    watch: {
      getInfo(val) {
        console.log(val)
        this.info = val
      },
      getFiles(val) {
        this.files = val
      },
      getFileInfo(val) {
        this.fileInfo = val
      },
      "$route"() {
        this.init()
        this.$nextTick()
        console.log(this.$route)
      }
    }
  }
</script>

<style scope>
  .container-search {
    max-width: 200px;
    margin-right: 8px;
    float: right;
  }

  .container-search::after {
    clear: both;
  }

  .container2 {
    padding: 20px;
    
  }

  .container2>div {
    margin-bottom: 8px;
  }

  .repo-view {
    display: flex;
    flex-direction: column;
    max-width: 1024px;
    margin: auto;
  }

  .repo-view>div {
    margin-bottom: 8px;
  }

  .repo-container {
    display: flex;
    flex-direction: column-reverse;
    background: url('http://res.mengxiangjing.com/preview.jpg');
    background-position: center;
    background-repeat: no-repeat;
    height: 200px;
    margin-bottom: 8px;


  }

  .name-view {
    display: flex;
    align-items: center;
    width: 1024px;
    flex-direction: column;
  }

  .name-view>el-avatar {
    margin: 16px;
    color: white;
    font-size: 20px;
  }

  .name-view>span {
    margin: 16px;
    color: white;
    font-size: 20px;
  }
  .repo-button{
    align-content: flex-end;
    border: 0;
    flex: 1;
    margin-bottom: 20px;
  }
  .text2 {
    font-size: 16px;
    font-weight: 600;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {}
</style>

<style scoped>
  .container5 {
    flex-wrap: wrap;
  }

  .item {
    flex-shrink: 0;
  }

  .search-container {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 18px;
  }

  .image {
    height: 200px;
  }

  .select {}

  .search {
    margin-left: 20px;
    margin-right: 20px;
    width: 200px;
  }

  .create-btn {
    margin-left: 18px;
  }

  .button {
    float: right;
    margin-top: 20px;
    margin-left: 8px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
</style>