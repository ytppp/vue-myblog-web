/*
  后续增加喜欢、不喜欢，回复功能
  实现嵌套评论
*/
<template>
  <div>
    <a-list
      v-if="comments.length"
      :dataSource="comments"
      itemLayout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
        >
          <template slot="actions">
            <span>
              <a-tooltip title="Like">
                <a-icon
                  type="like"
                  :theme="action === 'liked' ? 'filled' : 'outlined'"
                  @click="like"
                />
              </a-tooltip>
              <span style="padding-left: '8px';cursor: 'auto'">
                {{likes}}
              </span>
            </span>
            <span>Reply to</span>
          </template>
          <a-comment>
            <template slot="actions">
              <span>
                <a-tooltip title="Like">
                  <a-icon
                    type="like"
                    :theme="action === 'liked' ? 'filled' : 'outlined'"
                    @click="like"
                  />
                </a-tooltip>
                <span style="padding-left: '8px';cursor: 'auto'">
                  {{likes}}
                </span>
              </span>
              <span>Reply to</span>
            </template>
            <a slot="author">Han Solo</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <p slot="content">We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
          </a-comment>
        </a-comment>
      </a-list-item>
    </a-list>
    <a-comment>
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="1" @change="handleChange" :value="value" ></a-textarea>
        </a-form-item>
        <a-form-item>
          <a-button
            htmlType="submit"
            :loading="submitting"
            @click="handleSubmit"
            type="primary"
          >
            增加评论
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'

export default {
  data () {
    return {
      comments: [],
      submitting: false,
      value: '',
      moment,
    }
  },
  methods: {
    handleSubmit() {
      if (!this.value) {
        return;
      }

      this.submitting = true

      setTimeout(() => {
        this.submitting = false
        this.comments = [
          {
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().fromNow(),
          },
          ...this.comments,
        ]
        this.value = ''
      }, 1000)
    },
    handleChange(e) {
      this.value = e.target.value
    }
  },
}
</script>