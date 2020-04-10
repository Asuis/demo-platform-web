<template>
    <div>
        <el-select v-model="value" placeholder="请选择评审方式">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <div v-if="value == '1'">
            <el-button type="primary">添加维度以及对应权重</el-button>
            
        </div>
        <div v-if="value == '2'">
            <el-button type="primary">添加维度以及对应权重</el-button>
            
        </div>
        <div>
            评审人员配置以及配置人员权重
        </div>
        
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
                value: '1'
            }
        }
    }
</script>

<style>

</style>