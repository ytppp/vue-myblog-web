<template>
  <a-card :title="cateName" :bordered='false' :hoverable="true">
    <a-list
      itemLayout="vertical"
      :pagination="pagination"
      :dataSource="listData"
    >
      <a-list-item slot="renderItem" slot-scope="item" key="item.title">
        <template slot="actions" v-for="{type, text} in item.actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{text}}
          </span>
        </template>
        <img slot="extra" width="150" alt="logo" :src="item.avatar" />
        <a-list-item-meta>
          <div slot="description" v-html="contentFilter(item.content)"></div>
          <a slot="title" href="javascript:;" @click="goArticleDetail(item.id)">{{item.title}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script>

export default {
  props: {
    listData: {
      type: Array
    },
    cateName: {
      type: String
    }
  },
  data () {
    return {
      pagination: {
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 10
      }
    }
  },
  computed: {
    contentFilter () {
      return (content) => {
        if (content.length > 100) {
          return content.substring(0, 100) + '...'
        } else {
          return content
        }
      }
    }
  },
  methods: {
    goArticleDetail (id) {
      this.$router.push({
        path: '/index/detail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
