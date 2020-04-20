<template>
  <div>
    <div class="newslist-logo">
      
    </div>
    <div class="newslist-wapper">
      <el-breadcrumb class="bread" separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><router-link to='/list/news'>公告</router-link></el-breadcrumb-item>
            </el-breadcrumb>
      <el-card shadow="nerver" style="margin-bottom:20px;padding:20px;">
             <div v-for="(item, i) in list" :key="item.ID">
                <div>
                    <router-link class="text" :to="'/news/1'+item.ID">{{item.Title}}</router-link>
                    <span style="float:right;padding: 12px 0 6px 0;color:#909399;">{{item.UpdatedTime}}</span>
                </div>
                <div>{{item.Description}}</div>

                <el-divider v-if="list.length-1!==i"></el-divider>
            </div>

            <el-pagination style="text-align:center;margin-top:20px;margin-bottom:10px;" background layout="prev, pager, next" :total="20">
            </el-pagination>
        </el-card>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NewsListView',
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

                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        UpdatedTime: '2020-2-10',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
                    },

                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        UpdatedTime: '2020-2-10',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
                    },
                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        UpdatedTime: '2020-2-10',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
                    },
                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        UpdatedTime: '2020-2-10',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
                    },
                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        UpdatedTime: '2020-2-10',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
                    },
                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        UpdatedTime: '2020-2-10',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
                    },
                    {
                        ID: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                        Logo: '',
                        UpdatedTime: '2020-2-10',
                        Description: `
                        为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。`,
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

<style>

.bread {
        font-size: 16px;
        padding: 12px 12px 0px 0px;
        margin-bottom: 20px;
    }
.newslist-wapper{
    width: 1280px;
        margin: 0 auto;
        margin-top:20px;
}
  .newslist-logo{
    vertical-align: middle;
    background: #fff;
    background: url('http://res.mengxiangjing.com/banong4.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding: 65px;
    max-width: 100%;
    /* max-height: 100%; */
    height: 200px;
    
  }
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
</style>