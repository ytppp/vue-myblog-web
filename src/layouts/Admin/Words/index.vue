<template>
  <div class="container">
    <a-back-top />
    <a-card class="card" title="留言和建议管理" :bordered="false">
      <a-form :form="form" class="form">
        <a-row class="form-row">
          <a-col :span="6">
            <a-form-item
              label="留言"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-switch v-model="siteInfo.is_words" @change="handleSwitchChange('is_words', siteInfo.is_words)" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              label="留言评论审核"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-switch v-model="siteInfo.is_check" @change="handleSwitchChange('is_check', siteInfo.is_check)" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="top-wrapper">
        <div class="btns-wrapper">
          <a-radio-group
            v-model="searchParams.type"
            buttonStyle="solid"
            class="btns"
            @change="handleTypeChange"
          >
            <a-radio-button :value="2">留言</a-radio-button>
            <a-radio-button :value="0">建议</a-radio-button>
          </a-radio-group>
          <a-radio-group
            v-model="searchParams.status"
            buttonStyle="solid"
            class="btns"
            @change="handleStatusChange"
          >
            <a-radio-button :value="2">全部</a-radio-button>
            <a-radio-button :value="1">公开</a-radio-button>
            <a-radio-button :value="0">私密</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <a-table
        :rowKey="record => record.id"
        :columns="WORD_COLUMNS_CONFIG"
        :dataSource="wordsList"
        :loading="tableLoading"
      >
        <template slot="content" slot-scope="content">
          <div v-html="content"></div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="确定删除吗?"
            cancelText="取消"
            okText="确认"
            @confirm="() => handleWordsDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定切换留言状态吗?"
            cancelText="取消"
            okText="确认"
            @confirm="() => changeWordsStatus('status', record.id, record.status)">
            <a href="javascript:;">
              {{ record.status === 1 ? '禁用' : '启用' }}
            </a>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import {
  WORD_COLUMNS_CONFIG
} from '@/config'

// 留言信息模拟数据
const mockWordsInfo = [
  {
    id: 1,
    content: '你好呀呀',
    position: '四川省宜宾市翠屏区',
    status: 1,
    create_time: '2015-08-27'
  }
]

export default {
  data () {
    return {
      WORD_COLUMNS_CONFIG,
      wordsList: mockWordsInfo,
      tableLoading: false,
      siteInfo: {
        is_words: true,
        is_check: false
      },
      searchParams: {
        type: 2,
        status: 2
      }
    }
  },
  methods: {
    handleTypeChange (e) {
      this.searchParams.type = parseInt(e.target.value)
      this.getWordsList()
    },
    handleStatusChange (e) {
      this.searchParams.status = parseInt(e.target.value)
      this.getWordsList()
    },
    getWordsList () {
      let params = {
        status: this.searchParams.status === 2 ? '' : this.searchParams.status,
        type: this.searchParams.type
      }
      this.$axios.get('/api/mood/getMoodList', {
        params
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.wordsList = result.data.words_list
          this.tableLoading = false
        }
      })
    },
    changeWordsStatus (text, id, status) {
      const wordsList = [...this.wordsList]
      wordsList.forEach(item => {
        if (item.id === id) {
          switch (text) {
            case 'status':
              item.status = status === 1 ? 0 : 1
              this.submitStatusChange(id, 'status', item.status)
              break
          }
        }
      })
      this.wordsList = wordsList
    },
    submitStatusChange (id, key, value) {
      this.$axios.get('/api/mood/changeMoodStatus', {
        params: {
          id,
          key,
          value
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.$message.success('更改状态成功')
        } else {
          this.$message.error('更改状态失败')
        }
      })
    },
    handleWordsDelete (key) {
      const wordsList = [...this.wordsList]
      this.$axios.get('/api/mood/deleteMood', {
        params: {
          id: key
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.wordsList = wordsList.filter(item => item.id !== key)
          this.$message.success('已删除该数据项')
        } else {
          this.$message.error('删除数据项失败')
        }
      })
    },
    // 获得站点信息，这里包括两个：1 是否允许所有用户留言 2 是否开启留言审核
    getSiteInfo () {
      this.$axios.get('/api/site/getSiteStatus', {
        params: {
          key: 'is_words, is_check'
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.siteInfo = {
            is_words: result.data.is_words === 1,
            is_check: result.data.is_check === 1
          }
        } else {
          this.$message.error(result.message)
        }
      })
    },
    handleSwitchChange (key, value) {
      this.$axios.post('/api/site/setSiteStatus', {
        key,
        value
      }).then((res) => {
        const result = res.data
        if (result.code === 1) {
          this.$message.success(result.message)
        } else {
          this.$message.error(result.message)
        }
      })
    },
    getRouterInfo () {
      if (this.$route.query.type) {
        if (this.$route.query.type === 1) {
          this.searchParams.type = 2
        } else if (this.$route.query.type === 2) {
          this.searchParams.type = 0
        }
      } else {
        this.searchParams.type = 2
      }
    } 
  },
  beforeMount () {
    this.getRouterInfo()
    this.getSiteInfo()
    this.getWordsList()
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  }
}
</script>

<style lang="less" scoped>
.container {
  background-color: #ffffff;
  height: 100%;
  .form{
    .form-row{
      margin: 0 -8px
    }
  }
  .top-wrapper {
    height: 60px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .btns-wrapper {
      display: inline-block;
      .btns {
        margin-right: 8px;
      }
    }
  }
}
</style>
