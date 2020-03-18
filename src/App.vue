<template>
  <div id="app">
    <keep-alive>
        <router-view/>
      </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  mounted () {
    this.$store.commit('user/fetchUserFromSession')
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style>
body,html{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
