import './css/index.css';
import Vue from 'vue';

// import 'bootstrap';

/* import components */
import Button from './components/button.vue';
import BtnGroup from './components/button-group';
import Dropdown from './components/dropdown';
import Alert from './components/alert';
import Breadcrumb from './components/breadcrumb';
import Tabbar from './components/tabbar';

/* eslint no-new: off */
new Vue({
  el: 'body',
  data: {
    title: 'Hello world',
    msg: 'this is humen a bid step',
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
    nav: [
      {
        title: 'Home',
        links: ['#home'],
        active: false,
      }, {
        title: 'Library',
        links: ['#home'],
        active: false,
      }, {
        title: 'Data',
        links: ['#data'],
        active: true,
      }, {
        title: '下拉菜单',
        links: [
          {
            title: 'Action',
            link: '#action',
          }, {
            title: 'Another-Action',
            link: '#another-action',
          },
        ],
        active: false,
      },
    ],
  },
  components: {
    Btn: Button,
    BtnGroup,
    Dropdown,
    Alert,
    Breadcrumb,
    Tabbar,
  },
});

// $(() => {
//   $('[data-toggle="tooltip"]').tooltip();
// });
