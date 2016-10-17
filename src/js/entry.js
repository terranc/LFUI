/* global $ */

// 框架
import Vue from 'vue';
import vSelect from 'vue-select';

// 样式文件
import '../scss/lfui.scss';

// 自定义组件
import 'bootstrap-sass';
import 'nice-validator';
import 'nice-validator/dist/local/zh-CN';
import 'moment';
import 'eonasdan-bootstrap-datetimepicker';
import 'jquery-query-object';
import 'bootstrap-notify';
import waitingDialog from 'bootstrap-waitingfor';
import modules from './modules';  // 常用组件加载
modules.forEach((component) => {
  Vue.component(component.name, component.module);
});
window.Vue = Vue;
window.bootbox = require('bootbox');
window.bootbox.setDefaults({
  title: '提示',
  locale: 'zh_CN',
  backdrop: true,
  className: 'lf_modal',
});

window.waitingDialog = waitingDialog;

/* eslint no-new: off */
window.vm = new Vue({
  components: {
    vSelect,
  },
  data: {
    data: {},
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

  for (let item of $('.datetimepicker')) {
    let format = $(item).data('format') || 'YYYY-MM-DD';
    $(item).datetimepicker({
      locale: 'zh-cn',
      format: format,
    });
  }
});
