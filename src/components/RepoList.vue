<template>
    <div>
        <el-card>
            <div v-for="item in list" :key="item.ID">
                 <div class="repo-item">
                    <div class="repo-ava">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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

            </div>
            <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'RepoList',
    data () {
        return {
            list: [],
            payload: {
                pageSize: 10,
                page: 0,
                order: 'ID'
            }
        }
    },
    mounted () {
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
            getList(val){
                this.list = val
                console.log('getRepoList', val)
            }
        }
}
</script>

<style scope>
    .repo-item{
        display: flex;
    }
    .repo-ava{
        display: inline;
        flex: 0;
        margin-right: 8px;
    }
    .repo-detail{
        display: inline;
        flex: 1;
    }
    .repo-detail>div{
        margin-bottom: 8px;
    }    
    .repo-detail>div:first-child{
        font-size: 20px;
        font-weight: 500;
    }
    .repo-detail>div:last-child{
        font-size: 18px;
        float: right;
        border-bottom: 1px solid #e3e3e3;
    }
    .repo-detail>div:last-child::after{
        clear: both;
    }

    
</style>