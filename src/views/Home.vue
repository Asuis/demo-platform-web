<template>
    <div class="home_container">

        <el-container>
  <el-main class="viewer">Main</el-main>
  <el-aside class="login_view">Aside</el-aside>
</el-container>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>


<style scope>

    .viewer{
        background: #000;
    }
    .login_view{
        background: #e3e3e3;
    }
</style>