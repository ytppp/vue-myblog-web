<template>
  <div class="article-box">
    <article class="article-detail-wrapper">
      <h1 class="article-title">
        {{ article.title }}
      </h1>
      <div class="article-info">
        <div class="text-muted info-item">
          阅读&nbsp;{{ article.pv }}
        </div>
        <div class="text-muted info-item">
          收藏&nbsp;{{ article.save_num }}
        </div>
        <div class="text-muted info-item">
          赞&nbsp;{{ article.like_num }}
        </div>
        <div class="text-muted info-item">
          {{ article.update_time }}
        </div>
      </div>
      <div class="article-url" v-show="article.url_address">
        原文链接&nbsp;
        <a href="#">
          {{ article.url_address }}
        </a>
      </div>
      <div class="article-img" v-show="article.avatar">
        <img :src="article.avatar" alt="文章封面">
      </div>
      <div class="article-author text-muted">
        作者｜{{ article.author }}
      </div>
      <div class="article-content" style="margin-top: 0">
        <div class="content-style" v-html="article.content"></div>
      </div>
      <div class="article-operate" v-show="operates.isShowBottom">
        <span class="operate-item">
          <a-icon type="star-o" />
        </span>
        <span class="operate-item">
          <a-icon type="like-o"/>
        </span>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => {
        return {
          title: '2019年大前端技术趋势深度解读',
          pv: 1,
          save_num: 1,
          like_num: 1,
          update_time: '2019-03-16',
          url_address: 'mp.weixin.qq.com',
          avatar: 'https://user-gold-cdn.xitu.io/2019/3/16/16985f2e3dbe4e7c?imageView2/0/w/1280/h/960/ignore-error/1',
          author: '',
          content: `
            <p>我其实特别反感很多人说“前端娱乐圈”这种话，诚然，爆发式增长必然会带来焦点，但也不必过度解读，2018 年的几件大事儿我都了解，真的不是大家看到的那样的。学会辩证的看问题，用心去体味背后的趋势，我想这比所谓的“正直”更有价值，我更希望大家能够坚持学习，保持思辨和平和。</p>
            <p>我其实特别反感很多人说“前端娱乐圈”这种话，诚然，爆发式增长必然会带来焦点，但也不必过度解读，2018 年的几件大事儿我都了解，真的不是大家看到的那样的。学会辩证的看问题，用心去体味背后的趋势，我想这比所谓的“正直”更有价值，我更希望大家能够坚持学习，保持思辨和平和。</p>
            <p>我其实特别反感很多人说“前端娱乐圈”这种话，诚然，爆发式增长必然会带来焦点，但也不必过度解读，2018 年的几件大事儿我都了解，真的不是大家看到的那样的。学会辩证的看问题，用心去体味背后的趋势，我想这比所谓的“正直”更有价值，我更希望大家能够坚持学习，保持思辨和平和。</p>
          `
        }
      }
    },
    operates: {
      type: Object,
      default: () => {
        return {
          isShowBottom: true
        }
      }
    }
  }
}
</script>

<style lang="less">
.content-style {
  /* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }
  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }
  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }
  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }
}
</style>

<style scoped>
.article-box {
  background-color: #fff;
  padding: 30px 24px;
  box-sizing: border-box;
}
.article-detail-wrapper {
  display: block;
}
.article-title {
  font-size: 20px;
  padding: 15px 0;
}
.article-info {
  display: flex;
  align-items: baseline;
}
.text-muted {
  color: #666;
}
.info-item {
  margin-right: 5px;
  font-size: 12px;
}
.article-url {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
}
.article-img {
  margin: 15px 0;
  max-width: 300px;
}
.article-img img {
  border: 0;
  width: 100%;
  height: 100%;
}
.article-author {
  font-size: 14px;
}
.article-content, .article-content p {
  line-height: 1.75;
  margin: 22px 0;
  font-weight: 400;
  font-size: 15px;
  overflow-x: hidden;
}
.article-operate {
  display: flex;
  align-items: center;
  justify-content: center;
}
.operate-item {
  font-size: 24px;
  padding: 0 10px;
}
</style>
