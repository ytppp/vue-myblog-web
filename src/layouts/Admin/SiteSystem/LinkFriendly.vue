<template>
  <div class="container">
    <a-card class="card" title="友情链接管理" :bordered="false">
      <a-form :form="form" class="form">
        <a-form-item
          label="对所有用户开放友情链接申请"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 8 }"
        >
          <a-switch v-decorator="['switch', { valuePropName: 'checked' }]" />
        </a-form-item>
      </a-form>
      <div class="top-wrapper">
        <div class="btns-wrapper">
          <a-radio-group
            v-model="searchParams.status"
            buttonStyle="solid"
            @change="handleStatusChange"
          >
            <a-radio-button :value="2">全部</a-radio-button>
            <a-radio-button :value="1">启用</a-radio-button>
            <a-radio-button :value="0">禁用</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <a-table
        :rowKey="record => record.id"
        :columns="LINKS_LIST_CONFIG"
        :dataSource="linksList"
        :loading="tableLoading"
      >
        <a slot="link_site_url" target="_blank" slot-scope="text" :href="text">{{text}}</a>
        <template slot="operation" slot-scope="text, record">
          <a-popconfirm
            title="确定删除吗?"
            cancelText="取消"
            okText="确认"
            @confirm="() => handleLinksDelete(record.id)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定切换该友情链接状态吗?"
            cancelText="取消"
            okText="确认"
            @confirm="() => changeStatus('status', record.id, record.status)">
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
  LINKS_LIST_CONFIG
} from '@/config'

export default {
  data () {
    return {
      LINKS_LIST_CONFIG,
      linksList: [],
      tableLoading: false,
      searchParams: {
        status: 2
      }
    }
  },
  methods: {
    // 获得友情链接列表
    getLinksList () {
      let params = {
        status: this.searchParams.status === 2 ? '' : this.searchParams.status
      }
      this.tableLoading = true
      this.$axios.get('/api/links/getLinksList', {
        params
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.linksList = result.data.links_list
          this.tableLoading = false
        }
      })
    },
    // 删除友情链接
    handleLinksDelete (id) {
      const linksList = [...this.linksList]
      this.$axios.get('/api/links/deleteLinks', {
        params: {
          id
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.linksList = linksList.filter(item => item.id !== id)
          this.$message.success('已删除该友情链接')
        } else {
          this.$message.error('删除该友情链接失败')
        }
      })
    },
    handleStatusChange (e) {
      this.searchParams.status = parseInt(e.target.value)
      this.getLinksList()
    },
    changeStatus (text, id, status) {
      const linksList = [...this.linksList]
      linksList.forEach(item => {
        if (item.id === id) {
          switch (text) {
            case 'status':
              item.status = status === 1 ? 0 : 1
              this.submitStatusChange(id, 'status', item.status)
              break
          }
        }
      })
      this.articleuserListList = linksList
    },
    submitStatusChange (id, key, value) {
      this.$axios.get('/api/links/changeLinkStatus', {
        params: {
          id,
          key,
          value
        }
      }).then(res => {
        const result = res.data
        if (result.code === 1) {
          this.$message.success('更改友情链接状态成功')
        } else {
          this.$message.error('更改友情链接状态失败')
        }
      })
    }
  },
  beforeMount () {
    this.getLinksList()
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
  .top-wrapper {
    height: 60px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    .btns-wrapper {
      display: inline-block;
    }
  }
}
</style>
