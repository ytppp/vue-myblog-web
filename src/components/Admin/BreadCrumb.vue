<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item, index) in breadCrumb" :key="index">
      <span v-if="index === 0"><a :href="item.key">{{ item.name }}</a></span>
      <span v-else>{{ item.name }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  props: {
    breadCrumb: {
      type: Array,
      required: false
    }
  }
}
</script>
