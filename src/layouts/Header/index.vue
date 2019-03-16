<template>
  <header class="main-header-box">
    <header-top></header-top>
    <header-main></header-main>
  </header>
</template>

<script>
import HeaderTop from './HeaderTop'
import HeaderMain from './HeaderMain'

export default {
  components: {
    HeaderTop,
    HeaderMain
  }
}
</script>

<style scoped>
.main-header-box {
  height: 80px;
}
</style>
