/* global $ */

// 框架
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

// Http相关
Vue.http.options.crossOrigin = true;
Vue.http.options.xhr = { withCredentials: true };

// 样式文件
import '../scss/lfui.scss';
import '../css/main.css';
// import 'datatables.net-bs';
// import 'datatables.net-responsive-bs';

// 自定义组件
import modules from './modules';  // 常用组件加载
modules.forEach((component) => {
  Vue.component(component.name, component.module);
});
// import 'datatables.net';
// import 'datatables.net-buttons';
// import 'datatables.net-responsive';


/* eslint no-new: off */
window.vm = new Vue({
  data: {
    data: {},
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
});

$(() => {
  $('body').tooltip({
    selector: '[data-toggle="tooltip"]',
    container: 'body',
  }).popover({
    selector: '[data-toggle="popover"]',
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
