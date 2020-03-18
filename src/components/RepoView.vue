<template>
    <el-card class="repo-view" :body-style="{ padding: '0px' }">
        <div class="repo-container">
            <div class="name-view">
                <el-avatar src="http://res.mengxiangjing.com/preview.jpg"></el-avatar>
                <span>{{info.Name}}</span>
            </div>
        </div>
        <div class="container">

            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
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
                        <div class="text item" v-html="getFileInfo">
                        </div>
                    </el-card>
                </el-tab-pane>
                <el-tab-pane label="配置" name="second">配置</el-tab-pane>
                <el-tab-pane label="控制台" name="third">
                </el-tab-pane>
                <el-tab-pane label="展示" name="fourth">展示</el-tab-pane>
                <el-tab-pane label="文档" name="wiki">文档</el-tab-pane>

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
        components: {
        },
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
                hasFile: false
            }
        },
        mounted() {
            this.init()
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
                })
                this.$store.dispatch('repo/fileInfo', {
                    username: this.username,
                    repo: this.repo,
                    relpath: 'README.md'
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
                    if(this.relpath==='') {
                    this.$router.push(`/repo/${this.username}/${this.repo}/${name}`)

                    } else {
                    this.$router.push(`/repo/${this.username}/${this.repo}/${this.relpath + '/' + name}`)

                    }
                } else {
                    this.$store.dispatch('repo/fileInfo', {
                    username: this.username,
                    repo: this.repo,
                    relpath: `${this.relpath + '/' + name}`
                }).then(()=>{
                    this.fileName = name
                })
                }
            },
            handleClick(e) {
                console.log(e)
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

                return marked(this.$store.getters['repo/fileInfo'])
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

    .container {
        padding: 20px;
    }

    .container>div {
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
        height: 30vh;
        margin-bottom: 8px;


    }

    .name-view {
        display: flex;
        align-items: center;
        width: 100%;
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

    .text {
        font-size: 14px;
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