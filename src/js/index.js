/* global $ */

// 第三方插件
import './js/bootstrap-datetimepicker';

// 第三方组件
import vSelect from 'vue-select';

// 自定义组件
import './libs/datatables/datatables';
import Button from '../components/button';
import BtnGroup from '../components/button-group';
import Dropdown from '../components/dropdown';
import Tips from '../components/tips';
import Breadcrumb from '../components/breadcrumb';
import Dialog from '../components/dialog';
import Table from '../components/table';
import Filter from '../components/filter';
import Datetimepicker from '../components/datetimepicker';
import Loading from '../components/loading';
import Ueditor from '../components/ueditor';

// 样式文件
import '../scss/lfui.scss';
import '../css/main.css';

const install = function (Vue) {
  Vue.component('Loading', Loading);
  Vue.component('Btn', Button);
  Vue.component('BtnGroup', BtnGroup);
  Vue.component('vSelect', vSelect);
  Vue.component('LfTable', Table);
  Vue.component('Ueditor', Ueditor);
  Vue.component('Dropdown', Dropdown);
  Vue.component('Tips', Tips);
  Vue.component('Breadcrumb', Breadcrumb);
  Vue.component('Dialog', Dialog);
  Vue.component('Filter', Filter);
  Vue.component('Datetimepicker', Datetimepicker);
  Vue.methods.alert = function(id, title, desc, foot) {
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
  };
};

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

module.exports = {
  install,
  Button,
  BtnGroup,
  Dropdown,
  Tips,
  Breadcrumb,
  Dialog,
  Table,
  Filter,
  Datetimepicker,
  Loading,
  Ueditor,
};
