<template>
    <div class="container">
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                 <AdminNavbar></AdminNavbar>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <Navbar></Navbar>
                </el-header>

                <el-main>
                    <keep-alive>
                <router-view></router-view>
            </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import AdminNavbar from '@/components/admin/AdminNavbar.vue'
    import Navbar from '@/components/Navbar.vue'
    export default {
        name: 'AdminPage',
        components: {
            AdminNavbar,
            Navbar
        },
        data() {
            return {
 activeIndex: '1',
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .container{
        height: 100vh;
        max-width: 100%;
        padding: 0;
    }
</style>>
