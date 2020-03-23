<template>
  <div>
       <el-select v-model="value" placeholder="请选择评审方式">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
</template>

<script>
export default {
    name: 'AuditEditPage',
    data() {
      return {
        options: [{
          value: '1',
          label: '计分制'
        }, {
          value: '2',
          label: '投票制'
        }],
        value: ''
      }
    }
}
</script>

<style>

</style>