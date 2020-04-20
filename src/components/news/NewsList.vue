<template>
    <div>
        <el-card class="news-card">
            <div slot="header" class="clearfix">
                <span>公告</span>
                <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
            </div>
            <div v-for="(item, i) in list" :key="item.ID">
                <div>
                    <router-link class="text" :to="'/news/1'+item.ID">{{item.Title}}</router-link>
                    <span style="float:right;padding: 12px 0 6px 0;color:#909399;">{{item.UpdatedTime}}</span>
                </div>
                <div>{{item.Description}}</div>

                <el-divider v-if="list.length-1!==i"></el-divider>
            </div>

        </el-card>

    </div>
</template>

<script>
    export default {
        name: 'NewsList',
        data() {
            return {
                list: [{
                        ID: '',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。
                        `,
                        UpdatedTime: '2020-2-10'
                    },
                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
                        Logo: '',
                        UpdatedTime: '2020-2-10'
                    },
                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        UpdatedTime: '2020-2-10',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
                    },
                ]
            }

        }
    }
</script>

<style scoped>
    .text {
        width: 360px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-size: 20px;
        text-decoration: none;
        color: #000;
        font-weight: 600;
    }

    .text-detail {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .text>a {
        color: black;
    }

    .news-card {
        width: 600px;
    }
</style>>