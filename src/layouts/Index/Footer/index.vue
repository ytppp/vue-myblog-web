<template>
  <footer class="footer-box">
    Copyright ©{{thisYear}} Created by 杨庭培
  </footer>
</template>

<script>
export default {
  computed: {
    thisYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer-box {
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #364d79;
  font-size: 12px;
  color: #fff;
}
</style>
