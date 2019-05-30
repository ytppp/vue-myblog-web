<template>
  <section class="container">
    <a-back-top />
    <div class="content-center">
      <a-card title="心情列表" :hoverable="true">
        <a-list
          class="comment-list"
          itemLayout="horizontal"
          :dataSource="moodsList"
        > 
          <a-list-item slot="renderItem" slot-scope="item">
            <a-skeleton :loading="loading" active avatar>
              <a-comment
                :author="item.author"
                :avatar="item.avatar"
              >
                <div slot="content" v-html="item.content"></div>
                <span slot="datetime">{{item.datetime}}</span>
              </a-comment>
            </a-skeleton>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </section>
</template>

<script>
import { setTimeout } from 'timers'

export default {
  data () {
    return {
      moodsList: [],
      loading: false
    }
  },
  methods: {
    getMoodList () {
      let params = {
        type: 1
      }
      this.loading = true
      this.$axios.get('/api/mood/getMoodList', {
        params
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.moodsList = []
          setTimeout(() => {
            this.loading = false
          }, 1000)
          result.data.words_list.forEach(item => {
            this.moodsList.push({
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              author: item.user_id,
              content: item.content,
              datetime: item.create_time
            })
          })
        }
      })
    }
  },
  beforeMount () {
    this.getMoodList()
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .content-center {
    max-width: 960px;
    margin: 0 auto 20px;
  }
}
</style>
