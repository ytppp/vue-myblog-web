<template>
  <div>
    <header-con></header-con>
    <keep-alive><router-view></router-view></keep-alive>
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
