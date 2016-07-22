import './css/index.css';
import Vue from 'vue';

// import 'bootstrap';

/* import components */
import Button from './components/button.vue';
import BtnGroup from './components/button-group';
import Dropdown from './components/dropdown';
import Alert from './components/alert';
import Breadcrumb from './components/breadcrumb';
import Tabs from './components/tabs';
import TabsContent from './components/tabs-content';

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
    tabs: [
      {
        title: 'Home',
        links: ['#home'],
        active: false,
      }, {
        title: 'profile',
        links: ['#profile'],
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
            link: '#dropdown1',
          }, {
            title: 'Another-Action',
            link: '#dropdown2',
          },
        ],
        active: false,
      },
    ],
    tabsContent: [
      {
        id: 'home',
        content: '土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食',
        active: false,
      }, {
        id: 'profile',
        content: '我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。 —— 蒙田',
        active: true,
      }, {
        id: 'dropdown1',
        content: '时间是一切财富中最宝贵的财富。 —— 德奥弗拉斯多',
        active: false,
      }, {
        id: 'dropdown2',
        content: '世界上一成不变的东西，只有“任何事物都是在不断变化的”这条真理。 —— 斯里兰卡',
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
    Tabs,
    TabsContent,
  },
});

// $(() => {
//   $('[data-toggle="tooltip"]').tooltip();
// });
