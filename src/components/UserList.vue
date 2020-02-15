<template>
    <div>
        <el-table>
             <el-table-column
        prop="ID"
        label="ID"
        width="180">
      </el-table-column>
       <el-table-column
        prop="name"
        label="昵称"
        width="180">
      </el-table-column>
       <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'UserList'
}
</script>

<style>

</style>