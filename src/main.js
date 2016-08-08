/* global $ */

// 框架
import Vue from 'vue';

// 第三方插件
import swal from 'sweetalert';
import 'bootstrap-theme-slim/dist/js/bootstrap.min';
import './js/bootstrap-datetimepicker';

// 测试数据
import nations from './filterOptions.json';

// 第三方组件
import vSelect from 'vue-select';
import {
  PulseLoader,
  GridLoader,
  ClipLoader,
  RiseLoader,
  BeatLoader,
  SyncLoader,
  RotateLoader,
  FadeLoader,
  PacmanLoader,
  SquareLoader,
  ScaleLoader,
  SkewLoader,
  MoonLoader,
  RingLoader,
  BounceLoader,
  DotLoader } from 'vue-spinner/dist/vue-spinner';

// 样式文件
import './css/index.css';

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

/* eslint no-new: off */
new Vue({
  el: 'body',
  data: {
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
    PulseLoader,
    GridLoader,
    ClipLoader,
    RiseLoader,
    BeatLoader,
    SyncLoader,
    RotateLoader,
    FadeLoader,
    PacmanLoader,
    SquareLoader,
    ScaleLoader,
    SkewLoader,
    MoonLoader,
    RingLoader,
    BounceLoader,
    DotLoader,
    Filter,
    Datetimepicker,
  },
  methods: {
    alert(title, desc, type) {
      swal({
        title,
        text: desc,
        type,
      });
    },
    confirm(title, desc, type, nextTitle, nextDesc) {
      swal({
        title,
        text: desc,
        type,
        showCancelButton: true,
        closeOnConfirm: false,
      }, () => {
        this.alert(nextTitle, nextDesc, 'success');
      });
    },
    prompt(title, desc, type, placeholder, errorText, nextTitle) {
      swal({
        title,
        text: desc,
        type,
        showCancelButton: true,
        closeOnConfirm: false,
        animation: 'slide-from-top',
        inputPlaceholder: placeholder,
      },
      (inputValue) => {
        if (inputValue === false) return false;
        if (inputValue === '') {
          swal.showInputError(errorText);
          return false;
        }
        this.alert(nextTitle, `You wrote: ${inputValue} success`);
      });
    },
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
