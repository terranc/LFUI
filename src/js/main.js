/* global $ */

// 框架
import Vue from 'vue';

// 测试数据
import nations from './filterOptions.json';

// 样式文件
import '../scss/lfui.scss';
import '../css/main.css';
import '../css/example.css';

// 自定义组件
import 'nice-validator';
import 'nice-validator/dist/local/zh-CN';
import 'moment';
import 'eonasdan-bootstrap-datetimepicker';
import modules from './modules';  // 常用组件加载
modules.forEach((component) => {
  Vue.component(component.name, component.module);
});

/* eslint no-new: off */
window.vm = new Vue({
  data: {
    loading: false,
    modal: {
      id: '',
      title: '',
      desc: '',
      type: '',
      foot: true,
      event: Function,
    },
    btns: [
      {
        type: 'primary',
        title: '主色',
      }, {
        type: 'secondary',
        title: '普通',
      }, {
        type: 'success',
        title: '成功',
      }, {
        type: 'info',
        title: '信息',
      }, {
        type: 'warning',
        title: '警告',
      }, {
        type: 'danger',
        title: '危险',
      }, {
        type: 'mint',
        title: '薄荷',
      }, {
        type: 'purple',
        title: '紫色',
      }, {
        type: 'pink',
        title: '粉色',
      }, {
        type: 'dark',
        title: '黑色',
      }, {
        type: 'link',
        title: '连接',
      },
    ],
    icons: ['account_circle', 'alarm', 'android', 'announcement', 'assessment', 'assignment', 'autorenew', 'bookmark', 'build', 'credit_card', 'date_range', 'done', 'explore', 'favorite', 'face', 'grade', 'group_work', 'home', 'info', 'invert_colors', 'label', 'language', 'lock', 'opacity', 'payment', 'schedule', 'search'],
    links: [
      {
        title: 'Baidu',
        link: 'https://baidu.com',
      }, {
        title: 'Google',
        link: 'https://google.com',
      },
    ],
    breadcrumb: [
      {
        title: 'Home',
        link: '#',
      }, {
        title: 'Library',
        link: '#',
      }, {
        title: 'Data',
      },
    ],
    interests: {
      selected: null,
      options: nations,
    },
    users: [
      {
        id: 1,
        username: 'tomo',
        nickname: '@tomoyuen',
        register_date: '2016-06-06',
        like: 1949,
        collect: 4560,
      },
      {
        id: 2,
        username: 'tomo',
        nickname: '@tomoyuen',
        register_date: '2016-06-06',
        like: 1949,
        collect: 4560,
      },
      {
        id: 3,
        username: 'tomo',
        nickname: '@tomoyuen',
        register_date: '2016-06-06',
        like: 1949,
        collect: 4560,
      },
      {
        id: 4,
        username: 'tomo',
        nickname: '@tomoyuen',
        register_date: '2016-06-06',
        like: 1949,
        collect: 4560,
      },
    ],
    titles: [
      {
        name: 'id',
        key: 'id',
        order: 1,
      }, {
        name: '昵称',
        key: 'nickname',
      }, {
        name: '用户名',
        key: 'username',
      }, {
        name: '注册日期',
        key: 'register_date',
        order: 1,
      }, {
        name: '点赞',
        key: 'like',
        order: -1,
      }, {
        name: '收藏',
        key: 'collect',
        order: 1,
      },
    ],
    myModal1: {
      title: 'myModal1',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis mollitia molestias m',
      type: 'alert',
      event() {
        console.log('you click the confirm button');
      },
    },
    myModal2: {
      title: 'myModal2',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis mollitia molestias m',
      type: 'confirm',
      event() {
        console.log('you click the confirm button');
      },
    },
  },
  methods: {
    dialog(id, options) {
      this.modal = {
        id,
        title: options.title,
        desc: options.desc,
        foot: options.foot || true,
        type: options.type || 'confirm',
        event: options.event,
      };
    },
  },
  ready() {
    $('body').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body',
    }).popover({
      selector: '[data-toggle="popover"]',
      container: 'body',
    });
    for (let item of $('.datetimepicker')) {
      let format = $(item).data('format') || 'YYYY-MM-DD';
      $(item).datetimepicker({
        locale: 'zh-cn',
        format: format,
      });
    }
  },
});
