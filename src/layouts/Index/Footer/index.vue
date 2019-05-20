<template>
  <footer class="footer-box">
    Copyright &copy;{{thisYear}} 杨庭培
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
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #364d79;
  font-size: 12px;
  color: #fff;
}
</style>
