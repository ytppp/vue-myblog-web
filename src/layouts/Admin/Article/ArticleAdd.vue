<template>
  <div class="container">
    <a-card class="card" title="发表文章" :bordered="false">
      <article-add-form></article-add-form>
    </a-card>
  </div>
</template>

<script>
import ArticleAddForm from '@/components/Admin/ArticleAddForm'
export default {
  components: {
    ArticleAddForm
  }
}
</script>
