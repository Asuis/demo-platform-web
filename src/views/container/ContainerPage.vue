<template>
    <div class="wapper">
        <ContainerList :list="DockerList"></ContainerList>
    </div>
</template>

<script>
import ContainerList from '@/components/DockerList.vue'
export default {
    name: 'Container',
    components: {
        ContainerList
    },
    data() {
        return {
            DockerList: [],
            page: {
                total: 100,
                page: 0,
                pageSize: 10,
                order: 'ID'
            }
        }
    },
    mounted () {
        this.loadListData()
    },
    methods: {
        loadListData() {
            this.$store.dispatch('container/list', {
                page: this.page.page,
                pageSize: this.page.pageSize,
                order: this.page.order
            }).then(res => {
                console.log(res)
            })
        }
    },
}
</script>

<style>

</style>