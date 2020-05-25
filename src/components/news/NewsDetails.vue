<template>
    <div>
        <div class="logo">
        </div>

        <div class="wapper">
            <el-breadcrumb class="bread" separator="/">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">公告</a></el-breadcrumb-item>
            </el-breadcrumb>
            <div class="news-card">
                <div v-html="details.Content"></div>
            </div>
            <el-button style="float:right;" v-if="details.type==='contest'" type="primary">报名</el-button>

        </div>

    </div>
</template>

<script>
    import marked from 'marked'
    export default {
        name: "NewsDetails",
        components: {
        },
        data() {
            return {
                details: {
                    Title: '关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知',
                    Description: '',
                    Logo: '',
                    type: 'news'
                }
            }
        },
        methods: {
          get() {
            this.$store.dispatch('news/get', {id: this.$route.params.id}).then(({data})=> {
              console.log(data)
              this.details = data
            })
          }
        },
        mounted() {
            console.log(this)
            this.details.Description = ` # 关于组织开展第十一届中国大学生服务外包创新创业大赛第五场企业命题直播答疑活动的通知

发布时间： 2020-04-10 20:27:00  点击: 708



**各参赛院校和团队：**

  为了参赛团队能够更加准确的理解企业的赛题需求，经组委会与命题企业的积极沟通，针对学生团队关注较多的命题，特别开设企业视频直播答疑活动。

  第五场直播答疑活动将初步定于4月17日（周五）18:30—20:00 举行。命题答疑企业为华云。直播答疑方案如下：

**时间：**4月17日（周五）18:30—20:00

**直播企业：**华云

**答疑赛题：**【A12】基于算法的配送路线优化系统

【A13】运用文本相似度实现主观题自动评阅    

**直播平台：**哔哩哔哩

直播间地址：[http://live.bilibili.com/21952484](https://live.bilibili.com/21952484?visit_id=74b2dkpqflds)

直播间ID：[21952484](https://live.bilibili.com/21952484)

**赛题疑问统计时间截至：**4月16日（周四）中午12:00（通过大赛官网－团队账号—赛题答疑区提交，已经提问并回答过的问题请勿重复提交）

**直播议程**（以现场为准）

**一、【A12】基于算法的配送路线优化系统**

1、18:30—18:45

  华云命题组技术指导，阐述命题思路，任务要求，提交标准。

2、18:45—19:05

  预提交赛题疑问现场解答。

3、19:05—19:15

  学生团队自由提问时间。

**二、【A13】运用文本相似度实现主观题自动评阅** 

1、19:15—19:30

  华云命题组技术指导，阐述命题思路，任务要求，提交标准。

2、19:30—19:50

  预提交赛题疑问现场解答。

3、19:50—20:00

  学生团队自由提问时间。

 

**注意事项**

1、文明用语；

2、请提前整理好问题，在学生自由提问环节，以书面语在评论区提问；

3、围绕赛题本身提问。

 

 

中国大学生服务外包创新创业大赛组委会

2020年4月10日

            
            
            `
  this.get()
},

        computed: {
            getFileInfo() {
                return marked(this.details.Description)
            }
        }
    }
</script>

<style scoped>
    .logo {
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

    .news-card {
        width: 960px;
        margin: 0;
    }

    .wapper {
        width: 1280px;
        margin: 0 auto;
    }

    .bread {
        font-size: 16px;
        padding: 12px 12px 0px 0px;
    }
</style>>