/* global $ */

// 框架
import Vue from 'vue';

// 第三方组件
import vSelect from 'vue-select';

// 样式文件
import './scss/lfui.scss';
import './css/main.css';

// 自定义组件
import Loading from './components/loading';
import Button from './components/button';
import BtnGroup from './components/button-group';
import Dropdown from './components/dropdown';
import Tips from './components/tips';
import Breadcrumb from './components/breadcrumb';
import Dialog from './components/dialog';
import Table from './components/table';
import Filter from './components/filter';
import Datetimepicker from './components/datetimepicker';
import Ueditor from './components/ueditor';

/* eslint no-new: off */
new Vue({
  el: 'body',
  data: {
    data: {},
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
    Ueditor,
    Loading,
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
