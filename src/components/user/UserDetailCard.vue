<template>
  <el-card :body-style="{ padding: '0px' }">
    <img :src="`http://res.mengxiangjing.com/AbstractSaltBeds_ZH-CN8351691359.jpg`" class="image">
    <div>
        <div>
            昵称
        </div>
        <div>
            学校
        </div>
        <div>
            邮箱
        </div>
    </div>
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>

  </el-card>
</template>

<script>
export default {
    name: 'UserDetailCard'
}
</script>

<style scope>
    .card{
        position: relative;
        padding: 20px;
    }
    .image {
        height: 260px;
        z-index: 999;
    }
</style>>