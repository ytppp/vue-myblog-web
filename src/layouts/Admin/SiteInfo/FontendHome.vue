<template>
  <div class="container">
    <a-back-top />
    <a-card class="card" title="首页焦点图管理" :bordered="false">
      <a-card class="card" title="图片上传" :bordered="false">
        <a-upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture"
          :defaultFileList="fileList"
          class="upload-list-inline"
        >
          <a-button>
            <a-icon type="upload" /> upload
          </a-button>
        </a-upload>
      </a-card>
      <a-card class="card" title="图片预览" :bordered="false">
        <a-row>
          <a-col :span="12">
            <a-carousel arrows autoplay>
              <div
                slot="prevArrow"
                class="custom-slick-arrow"
                style="left: 10px;zIndex: 1"
              >
                <a-icon type="left-circle" />
              </div>
              <div
                slot="nextArrow"
                class="custom-slick-arrow"
                style="right: 10px"
              >
                <a-icon type="right-circle" />
              </div>
              <div><h3>1</h3></div>
              <div><h3>2</h3></div>
              <div><h3>3</h3></div>
              <div><h3>4</h3></div>
            </a-carousel>
          </a-col>
        </a-row>
      </a-card>
      <a-card class="card" title="图片列表" :bordered="false">
        <a-table
          :columns="columns"
          :dataSource="moodsList"
          :loading="tableLoading"
        >
          <template slot="operation" slot-scope="text, record">
            <a href="javascript:;" @click="showArticleDetail(record.id)">详情</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除吗?"
              cancelText="取消"
              okText="确认"
              @confirm="() => onDelete(record.id)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
            <a-divider type="vertical" />
          </template>
        </a-table>
      </a-card>
    </a-card>
  </div>
</template>

<script>
import {
  MOOD_COLUMNS_CONFIG
} from '@/config'

export default {
  data () {
    return {
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'yyy.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ],
      columns: MOOD_COLUMNS_CONFIG,
      moodsList: [],
      tableLoading: false
    }
  }
}
</script>

<style scoped>
  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
  .ant-carousel >>> .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31,45,61,.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
.ant-carousel >>> .slick-slide  h3 {
  color: #fff;
}
</style>
