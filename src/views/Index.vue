<template>
  <div class="app-container">
    <header-con></header-con>
    <div>
      <router-view></router-view>
    </div>
    <footer-con></footer-con>
  </div>
</template>

<script>
import Header from '../layouts/Index/Header'
import Footer from '../layouts/Index/Footer'

export default {
  components: {
    HeaderCon: Header,
    FooterCon: Footer
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh
}
</style>
