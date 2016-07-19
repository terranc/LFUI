import './css/index.css';
import Vue from 'vue';

import Button from './components/button.vue';

/* eslint no-new: off */
new Vue({
  el: 'body',
  data: {
    title: 'Hello world',
    msg: 'this is humen a bid step',
  },
  components: {
    Btn: Button,
  },
});
