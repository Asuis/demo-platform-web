<template>
    <div>
        <el-card>
            <slot name="header" slot="header"></slot>
            <el-pagination background layout="prev, pager, next" :total="total">
            </el-pagination>
        </el-card>

    </div>
</template>

<script>
    export default {
        name: 'DemoList',
        props: {
            total: Number,
            page: Number,
            pageSize: Number
        },
        methods: {
            sizeChange(e) {
                this.$emit('size-change', e)
            },
            currentChange(e) {
                this.$emit("current-change", e)
            },
            prevClick(e) {
                this.$emit("prev-click", e)
            },
            nextClick(e) {
                this.$emit("next-click", e)
            }
        }
    }
</script>

<style>

</style>