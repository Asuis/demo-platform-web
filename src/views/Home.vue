<template>
    <div class="home-container">
        <Navbar></Navbar>
        <router-view />
        <Footer class="home-footer"></Footer>
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
    .home-footer{
     position: fixed;
   bottom:0;
    }
</style>