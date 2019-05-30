<template>
  <section class="container">
    <a-back-top />
    <div class="content-center">
      <a-card title="心情列表" :hoverable="true">
        <a-list
          class="comment-list"
          itemLayout="horizontal"
          :dataSource="data"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-comment
              :author="item.author"
              :avatar="item.avatar"
            >
              <p slot="content">{{item.content}}</p>
              <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
                <span>{{item.datetime.fromNow()}}</span>
              </a-tooltip>
            </a-comment>
          </a-list-item>
        </a-list>
      </a-card>
    </div>
  </section>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  data () {
    return {
      data: [
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(1, 'days')
        },
        {
          actions: ['Reply to'],
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          datetime: moment().subtract(2, 'days')
        }
      ],
      moment,
      likes: 0
    }
  },
  methods: {
    like () {
      this.likes = 1
      this.dislikes = 0
      this.action = 'liked'
    }
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
