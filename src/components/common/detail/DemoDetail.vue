<template>
    <el-card :shadow="shadow">
        <slot name="header"></slot>
        <div name="main" v-html="markdownData">
        </div>
        <slot name="footer"></slot>
    </el-card>
</template>

<script>
    import marked from 'marked'
    import {Card} from 'element-ui'
    export default {
        name: 'DemoDetail',
        mixins: [Card],
        props: {
            data: String
        },
        computed: {
            markdownData(){
                return marked(this.data)
            }
        }
    }
</script>

<style>

</style>