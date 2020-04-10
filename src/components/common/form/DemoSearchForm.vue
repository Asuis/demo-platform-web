<template>
  <div>
      <div class="search-container">
            <el-select placeholder="状态" v-model="searchForm.status" class="select">
                <el-option label="进行中" value="1"></el-option>
                        <el-option label="已结束" value="beijing"></el-option>
                        <el-option label="未发布" value="beijing"></el-option>
            </el-select>
            <el-input prefix-icon="el-icon-search" class="search" v-model="searchForm.search"></el-input>
            <el-button type="primary" class="search-btn" @click="handleOpen" icon="el-icon-search">查询</el-button>
            <el-button type="primary" class="create-btn" @click="handleOpen">创建</el-button>
        </div>
  </div>
</template>

<script>
export default {
    name: 'DemoSearchForm',
    props: {
        
    }
}
</script>

<style>

</style>