<template>
    <div>
        <div class="newslist-logo">

        </div>
        <div class="newslist-wapper">
            <el-breadcrumb class="bread" separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <router-link to='/list/news'>项目</router-link>
                </el-breadcrumb-item>
            </el-breadcrumb>
            <el-card shadow="nerver" style="margin-bottom:20px;padding:20px;">
                <div v-for="(item, i) in list" :key="item.ID">
                    <div class="repo-item">
                        <div class="repo-ava">
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                            </el-avatar>
                        </div>
                        <div class="repo-detail">
                            <div>
                                <router-link :to="'/repo/'+item.Name">{{item.Name}}</router-link>
                            </div>
                            <div>{{item.Description}}</div>
                            <div>
                            </div>
                        </div>
                    </div>
                    <el-divider v-if="list.length-1!==i"></el-divider>
                </div>
                <el-pagination style="text-align:center;margin-top:20px;margin-bottom:10px;" background
                    layout="prev, pager, next" :total="2">
                </el-pagination>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RepoListView',
        data() {
            return {
                list: [{
                        ID: '',
                        Name: 'zsh-users/zsh-autosuggestions',
                        Description: 'Fish-like autosuggestions for zsh'
                    },
                    {
                        ID: '',
                        Name: 'micro/clients',
                        Description: 'Multi-language clients for Micro services'
                    }
                ]
            }

        },
        mounted() {
            this.init(this.payload)
        },
        methods: {
            init(payload) {
                this.$store.dispatch('repo/getRepositories', payload)
            },
            getRepoUrl(item) {
                return `/repo/${item.Name}`
            }
        },
        computed: {
            getList() {
                return this.$store.getters['repo/listRepositories']
            },
        },
        watch: {
            getList(val) {
                this.list = val
                console.log('getRepoList', val)
            }
        }
    }
</script>

<style scoped>
    .repo-item {
        display: flex;
    }

    .repo-ava {
        display: inline;
        flex: 0;
        margin-right: 8px;
    }

    .repo-detail {
        display: inline;
        flex: 1;
    }

    .repo-detail a {
        text-decoration: none;
        color: #000;
        font-weight: 600;
    }

    .repo-detail>div {
        margin-bottom: 8px;
    }

    .repo-detail>div:first-child {
        font-size: 20px;
        font-weight: 500;
    }

    .repo-detail>div:last-child {
        font-size: 18px;
        float: right;
        border-bottom: 1px solid #e3e3e3;
    }

    .repo-detail>div:last-child::after {
        clear: both;
    }
</style>>