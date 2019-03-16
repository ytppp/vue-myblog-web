<template>
  <div>
    <header-con></header-con>
    <keep-alive><router-view></router-view></keep-alive>
    <footer-con></footer-con>
  </div>
</template>

<script>
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'

export default {
  components: {
    HeaderCon: Header,
    FooterCon: Footer
  }
}
</script>

<style scoped>
</style>
