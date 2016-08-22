/* global $ */

// 框架
import Vue from 'vue';

// 测试数据
import nations from './filterOptions.json';

// 第三方组件
import vSelect from 'vue-select';

// 样式文件
import './scss/lfui.scss';
import './css/main.css';
import './css/example.css';

// 自定义组件
import Button from './components/button';
import BtnGroup from './components/button-group';
import Dropdown from './components/dropdown';
import Tips from './components/tips';
import Breadcrumb from './components/breadcrumb';
import Dialog from './components/dialog';
import Table from './components/table';
import Filter from './components/filter';
import Datetimepicker from './components/datetimepicker';
import Loading from './components/loading';
import Ueditor from './components/ueditor';

/* eslint no-new: off */
new Vue({
  el: 'body',
  data: {
    loading: true,
    dialog: {
      id: '',
      title: '',
      desc: '',
      foot: true,
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
  },
  components: {
    vSelect,
    Btn: Button,
    LfTable: Table,
    BtnGroup,
    Dropdown,
    Tips,
    Breadcrumb,
    Dialog,
    Filter,
    Datetimepicker,
    Loading,
    Ueditor,
  },
  methods: {
    alert(id, title, desc, foot) {
      this.dialog.id = id;
      if (typeof desc === 'undefined') {
        desc = title;
        this.dialog.desc = desc;
        return;
      } else if (typeof foot === 'undefined') {
        this.dialog.title = title;
        this.dialog.desc = desc;
        this.dialog.foot = true;
        return;
      }
      this.dialog = {
        id,
        title,
        desc,
        foot,
      };
    },
    confirm(title, desc, type, nextTitle, nextDesc) {

    },
  },
  ready() {
    let self = this;
    setTimeout(() => {
      self.loading = false;
    }, 1000);
  },
});

$(() => {
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body',
  });

  for (let item of $('[data-picker=datetimepicker]')) {
    let format = $(item).data('format');
    $(item).datetimepicker({
      locale: 'zh-cn',
      format: format,
    });
  }
});
