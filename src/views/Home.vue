<template>
    <div class="home-container">
        <Navbar></Navbar>
        <router-view />
        <Footer></Footer>
    </div>
</template>

<script>
    import Navbar from '@/components/Navbar.vue'
    import Footer from '@/components/Footer.vue'
    export default {
        name: "Home",
        components: {
            Navbar,
            Footer
        }
    }
</script>


<style scope>
    .home-container {
        height: 100vh;
        width: 100%;
    }
</style>