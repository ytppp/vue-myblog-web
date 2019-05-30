
// 静态文件地址
export const STATIC_IMG_URL = 'http://www.ytpblog.com'

// 左侧导航栏配置
export const MENU_CONFIG = [
  {
    key: 'home',
    name: '首页',
    icon: 'home'
  },
  {
    key: 'article',
    name: '文章管理',
    icon: 'book',
    children: [
      {
        key: 'article-list',
        name: '文章列表'
      }
      /* {
        key: 'article-add',
        name: '增加文章'
      } */
    ]
  },
  {
    key: 'user',
    name: '用户管理',
    icon: 'user'
  },
  {
    key: 'mood',
    name: '心情管理',
    icon: 'smile'
  },
  {
    key: 'words',
    name: '留言和建议管理',
    icon: 'team'
  },
  {
    key: 'site-info',
    name: '网站信息管理',
    icon: 'inbox',
    children: [
      /* {
        key: 'fontend-home',
        name: '前台首页管理'
      },
      {
        key: 'photo-wall',
        name: '照片墙'
      }, */
      {
        key: 'about',
        name: '关于页面信息'
      },
      {
        key: 'notice',
        name: '公告管理'
      }
    ]
  },
  {
    key: 'site-system',
    name: '系统管理',
    icon: 'setting',
    children: [
      {
        key: 'site-setting',
        name: '站点设置'
      },
      {
        key: 'link-friendly',
        name: '友情链接管理'
      },
      {
        key: 'site-history',
        name: '网站记录管理'
      },
      {
        key: 'site-log',
        name: '网站日志'
      }
    ]
  },
  {
    key: 'psw-modify',
    name: '修改密码',
    icon: 'lock'
  }
]

// 后台管理系统下拉列表配置
export const ADMIN_DROPDOWN_LIST_CONFIG = [
  {
    key: 0,
    name: '发表文章'
  },
  {
    key: 1,
    name: '发表心情'
  },
  {
    key: 2,
    name: '查看网站日志'
  },
  {
    key: 3,
    name: '退出网站'
  }
]

// 文章作者配置
export const ARTICLE_AUTHOR_CONFIG = [
  {
    value: 1,
    name: '原创'
  },
  {
    value: 2,
    name: '转载'
  },
  {
    value: 3,
    name: '翻译'
  }
]

// 用户列表配置
export const USER_LIST_COLUMNS_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '电话',
    dataIndex: 'mobile',
    key: 'mobile'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '登录',
    dataIndex: 'is_login',
    key: 'is_login'
  },
  {
    title: '留言',
    dataIndex: 'is_words',
    key: 'is_words'
  },
  {
    title: '评论',
    dataIndex: 'is_comment',
    key: 'is_comment'
  },
  {
    title: '点赞',
    dataIndex: 'is_like',
    key: 'is_like'
  },
  {
    title: '收藏',
    dataIndex: 'is_save',
    key: 'is_save'
  },
  {
    title: '时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

// 公告配置
export const NOTICE_LIST_COLUMNS_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '标题',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '发布时间',
    dataIndex: 'update_time',
    key: 'update_time'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

// 文章列表配置
export const ARTICLE_LIST_COLUMNS_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '栏目',
    dataIndex: 'cate_name',
    key: 'cate_name'
  },
  {
    title: '作者',
    dataIndex: 'author_id',
    key: 'author_id'
  },
  {
    title: '阅读量',
    dataIndex: 'pv',
    key: 'pv'
  },
  {
    title: '收藏量',
    dataIndex: 'save_num',
    key: 'save_num'
  },
  {
    title: '点赞量',
    dataIndex: 'like_num',
    key: 'like_num'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: {
      customRender: 'status'
    }
  },
  {
    title: '草稿',
    dataIndex: 'is_draft',
    key: 'is_draft',
    scopedSlots: {
      customRender: 'is_draft'
    }
  },
  {
    title: '置顶',
    dataIndex: 'is_top',
    key: 'is_top',
    scopedSlots: {
      customRender: 'is_top'
    }
  },
  {
    title: '热门',
    dataIndex: 'is_hot',
    key: 'is_hot',
    scopedSlots: {
      customRender: 'is_hot'
    }
  },
  {
    title: '时间',
    dataIndex: 'update_time',
    key: 'update_time'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

// 首页文章列表配置
export const HOME_ARTICLE_LIST_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '栏目',
    dataIndex: 'cate_name',
    key: 'cate_name'
  },
  {
    title: '时间',
    dataIndex: 'update_time',
    key: 'update_time'
  }
]

// 首页友情链接列表配置
export const HOME_LINKS_LIST_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '网站名',
    dataIndex: 'link_site_name',
    key: 'link_site_name'
  },
  {
    title: 'URL',
    dataIndex: 'link_site_url',
    key: 'link_site_url',
    scopedSlots: { customRender: 'link_site_url' }
  },
  {
    title: '时间',
    dataIndex: 'update_time',
    key: 'update_time'
  }
]

// 首页留言列表
export const HOME_WORDS_LIST_CONFIG = [
  {
    title: '用户',
    dataIndex: 'user_id',
    key: 'user_id',
    width: 80
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    width: 120,
    scopedSlots: { customRender: 'content' }
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position',
    width: 120,
    scopedSlots: { customRender: 'position' }
  },
  {
    title: '时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width: 120
  }
]

// 首页心情列表配置
export const HOME_MOOD_LIST_CONFIG = [
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    width: 120,
    scopedSlots: { customRender: 'content' }
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position',
    width: 120,
    scopedSlots: { customRender: 'position' }
  },
  {
    title: '发表时间',
    dataIndex: 'create_time',
    key: 'create_time',
    width: 120
  }
]

// 首页友情链接列表配置
export const LINKS_LIST_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '网站名',
    dataIndex: 'link_site_name',
    key: 'link_site_name'
  },
  {
    title: 'URL',
    dataIndex: 'link_site_url',
    key: 'link_site_url',
    scopedSlots: { customRender: 'link_site_url' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '时间',
    dataIndex: 'update_time',
    key: 'update_time'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

// 心情列表配置
export const MOOD_COLUMNS_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    scopedSlots: {
      customRender: 'content'
    }
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '发表时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

export const TIMEAXIS_COLUMNS_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '留言时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

// 站点记录列表配置
export const SITELOG_COLUMNS_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '日志',
    dataIndex: 'log',
    key: 'log'
  },
  {
    title: '接口',
    dataIndex: 'api',
    key: 'api'
  },
  {
    title: '结果',
    dataIndex: 'is_success',
    key: 'is_success',
    scopedSlots: {
      customRender: 'is_success'
    }
  },
  {
    title: '时间',
    dataIndex: 'create_time',
    key: 'create_time'
  }
]

// 留言列表配置
export const WORD_COLUMNS_CONFIG = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    scopedSlots: {
      customRender: 'content'
    }
  },
  {
    title: '位置',
    dataIndex: 'position',
    key: 'position'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '留言时间',
    dataIndex: 'create_time',
    key: 'create_time'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: {
      customRender: 'operation'
    }
  }
]

// 富文本编辑器配置(文章)
export const ARTICLE_RICHEDITOR_CONFIG = [
  'head', // 标题
  'bold', // 粗体
  'fontSize', // 字号
  'fontName', // 字体
  'italic', // 斜体
  'underline', // 下划线
  'strikeThrough', // 删除线
  'foreColor', // 文字颜色
  'backColor', // 背景颜色
  'link', // 插入链接
  'list', // 列表
  'justify', // 对齐方式
  'quote', // 引用
  'emotsrc', // 表情
  'image', // 插入图片
  'table', // 表格
  'video', // 插入视频
  'code', // 插入代码
  'undo', // 撤销
  'redo' // 重复
]

// 富文本编辑器配置(心情、留言)
export const WORDS_MOOD_RICHEDITOR_CONFIG = [
  'link', // 插入链接
  'emoticon', // 表情
  'table', // 表格
  'video', // 插入视频
  'code' // 插入代码
]

// 表情配置
export const EMOTIONS_LIST = [
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7a/shenshou_thumb.gif',
    alt: '[草泥马]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/60/horse2_thumb.gif',
    alt: '[神马]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/fuyun_thumb.gif',
    alt: '[浮云]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c9/geili_thumb.gif',
    alt: '[给力]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f2/wg_thumb.gif',
    alt: '[围观]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/vw_thumb.gif',
    alt: '[威武]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/panda_thumb.gif',
    alt: '[熊猫]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/81/rabbit_thumb.gif',
    alt: '[兔子]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/bc/otm_thumb.gif',
    alt: '[奥特曼]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/15/j_thumb.gif',
    alt: '[囧]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/hufen_thumb.gif',
    alt: '[互粉]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c4/liwu_thumb.gif',
    alt: '[礼物]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ac/smilea_thumb.gif',
    alt: '[呵呵]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0b/tootha_thumb.gif',
    alt: '[嘻嘻]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6a/laugh.gif',
    alt: '[哈哈]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/14/tza_thumb.gif',
    alt: '[可爱]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/kl_thumb.gif',
    alt: '[可怜]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a0/kbsa_thumb.gif',
    alt: '[挖鼻屎]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f4/cj_thumb.gif',
    alt: '[吃惊]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6e/shamea_thumb.gif',
    alt: '[害羞]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c3/zy_thumb.gif',
    alt: '[挤眼]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/29/bz_thumb.gif',
    alt: '[闭嘴]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/71/bs2_thumb.gif',
    alt: '[鄙视]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/lovea_thumb.gif',
    alt: '[爱你]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9d/sada_thumb.gif',
    alt: '[泪]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/19/heia_thumb.gif',
    alt: '[偷笑]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8f/qq_thumb.gif',
    alt: '[亲亲]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/b6/sb_thumb.gif',
    alt: '[生病]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/mb_thumb.gif',
    alt: '[太开心]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/17/ldln_thumb.gif',
    alt: '[懒得理你]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/98/yhh_thumb.gif',
    alt: '[右哼哼]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/zhh_thumb.gif',
    alt: '[左哼哼]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a6/x_thumb.gif',
    alt: '[嘘]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/af/cry.gif',
    alt: '[衰]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/73/wq_thumb.gif',
    alt: '[委屈]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/9e/t_thumb.gif',
    alt: '[吐]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/f3/k_thumb.gif',
    alt: '[打哈欠]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/27/bba_thumb.gif',
    alt: '[抱抱]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7c/angrya_thumb.gif',
    alt: '[怒]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/5c/yw_thumb.gif',
    alt: '[疑问]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/a5/cza_thumb.gif',
    alt: '[馋嘴]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/70/88_thumb.gif',
    alt: '[拜拜]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/e9/sk_thumb.gif',
    alt: '[思考]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/24/sweata_thumb.gif',
    alt: '[汗]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/7f/sleepya_thumb.gif',
    alt: '[困]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6b/sleepa_thumb.gif',
    alt: '[睡觉]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/90/money_thumb.gif',
    alt: '[钱]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/0c/sw_thumb.gif',
    alt: '[失望]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/cool_thumb.gif',
    alt: '[酷]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/8c/hsa_thumb.gif',
    alt: '[花心]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/49/hatea_thumb.gif',
    alt: '[哼]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/36/gza_thumb.gif',
    alt: '[鼓掌]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d9/dizzya_thumb.gif',
    alt: '[晕]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1a/bs_thumb.gif',
    alt: '[悲伤]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/62/crazya_thumb.gif',
    alt: '[抓狂]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/91/h_thumb.gif',
    alt: '[黑线]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6d/yx_thumb.gif',
    alt: '[阴险]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/89/nm_thumb.gif',
    alt: '[怒骂]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/hearta_thumb.gif',
    alt: '[心]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/ea/unheart.gif',
    alt: '[伤心]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/58/pig.gif',
    alt: '[猪头]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d6/ok_thumb.gif',
    alt: '[ok]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d9/ye_thumb.gif',
    alt: '[耶]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d8/good_thumb.gif',
    alt: '[good]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/c7/no_thumb.gif',
    alt: '[不要]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d0/z2_thumb.gif',
    alt: '[赞]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/40/come_thumb.gif',
    alt: '[来]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d8/sad_thumb.gif',
    alt: '[弱]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/91/lazu_thumb.gif',
    alt: '[蜡烛]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/6a/cake.gif',
    alt: '[蛋糕]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/d3/clock_thumb.gif',
    alt: '[钟]'
  },
  {
    src: 'http://img.t.sinajs.cn/t35/style/images/common/face/ext/normal/1b/m_thumb.gif',
    alt: '[话筒]'
  }
]
