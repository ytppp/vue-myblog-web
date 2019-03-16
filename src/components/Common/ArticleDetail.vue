<template>
  <div class="article-box">
    <article class="article-detail-wrapper">
      <h1 class="article-title">2019年大前端技术趋势深度解读</h1>
      <div class="article-info">
        <div class="text-muted info-item">阅读&nbsp;123</div>
        <div class="text-muted info-item">收藏&nbsp;123</div>
        <div class="text-muted info-item">赞&nbsp;123</div>
        <div class="text-muted info-item">2019-03-16</div>
      </div>
      <div class="article-url">
        原文链接&nbsp;<a href="#">mp.weixin.qq.com</a>
      </div>
      <div class="article-img">
        <img src="https://user-gold-cdn.xitu.io/2019/3/16/16985f2e3dbe4e7c?imageView2/0/w/1280/h/960/ignore-error/1" alt="文章标题">
      </div>
      <div class="article-author text-muted">作者｜狼</div>
      <div class="article-content" style="margin-top: 0">
        <p>我其实特别反感很多人说“前端娱乐圈”这种话，诚然，爆发式增长必然会带来焦点，但也不必过度解读，2018 年的几件大事儿我都了解，真的不是大家看到的那样的。学会辩证的看问题，用心去体味背后的趋势，我想这比所谓的“正直”更有价值，我更希望大家能够坚持学习，保持思辨和平和。</p>
        <p>我其实特别反感很多人说“前端娱乐圈”这种话，诚然，爆发式增长必然会带来焦点，但也不必过度解读，2018 年的几件大事儿我都了解，真的不是大家看到的那样的。学会辩证的看问题，用心去体味背后的趋势，我想这比所谓的“正直”更有价值，我更希望大家能够坚持学习，保持思辨和平和。</p>
        <p>我其实特别反感很多人说“前端娱乐圈”这种话，诚然，爆发式增长必然会带来焦点，但也不必过度解读，2018 年的几件大事儿我都了解，真的不是大家看到的那样的。学会辩证的看问题，用心去体味背后的趋势，我想这比所谓的“正直”更有价值，我更希望大家能够坚持学习，保持思辨和平和。</p>
      </div>
      <div class="article-operate">
        <span class="operate-item">
          <a-icon type="star-o" />
        </span>
        <span class="operate-item">
          <a-icon type="like-o"/>
        </span>
      </div>
      <comment></comment>
    </article>
  </div>
</template>

<script>
import Comment from '@/components/Common/Comment.vue'
export default {
  components: {
    Comment
  }
}
</script>

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
  width: 600px;
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
