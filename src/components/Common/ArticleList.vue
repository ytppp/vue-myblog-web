<template>
  <a-card title="Card Title" :bordered='false'>
    <a-list
      itemLayout="vertical"
      :pagination="pagination"
      :dataSource="listData"
    >
      <a-list-item slot="renderItem" slot-scope="item" key="item.title">
        <template slot="actions" v-for="{type, text} in actions">
          <span :key="type">
            <a-icon :type="type" style="margin-right: 8px" />
            {{text}}
          </span>
        </template>
        <img slot="extra" width="150" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />
        <a-list-item-meta
          :description="item.description">
          <a slot="title" :href="item.href">{{item.title}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script>

const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://vue.ant.design/',
    title: `ant design vue part ${i}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}

export default {
  data () {
    return {
      listData,
      pagination: {
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 10
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' }
      ],
      tabList: [
        {
          key: 'tab1',
          scopedSlots: {
            tab: 'customRender'
          }
        },
        {
          key: 'tab2',
          tab: 'tab2'
        }
      ],
      contentList: {
        tab1: 'content1',
        tab2: 'content2'
      },
      tabListNoTitle: [
        {
          key: 'article',
          tab: 'article'
        },
        {
          key: 'app',
          tab: 'app'
        },
        {
          key: 'project',
          tab: 'project'
        }
      ],
      key: 'tab1',
      noTitleKey: 'app'
    }
  }
}
</script>

<style scoped>
</style>
