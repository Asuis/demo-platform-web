<template>
    <div class="home-container">
        <Navbar></Navbar>
        <router-view />
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    export default {
        name: "Home",
        components: {
            Navbar
        }
    }
</script>


<style scope>
    .home-container {
        height: 100vh;
    }
</style>