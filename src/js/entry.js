/* global $ */

// 框架
import Vue from 'vue';

// 样式文件
import '../scss/lfui.scss';
import '../css/main.css';

// 自定义组件
import modules from './modules';  // 常用组件加载
modules.forEach((component) => {
  Vue.component(component.name, component.module);
});


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
