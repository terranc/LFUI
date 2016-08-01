<template>
  <div class="filter-box row">
    <div class="filter-label col-xs-2">{{ title }}</div>
    <div class="filter-inner col-xs-10" v-if="type == 'tag'">
      <span v-for="item in options" class="label label-primary">{{ item }}</span>
    </div>
  </div>
</template>
<script>
  import Dropdown from './dropdown';

  export default {
    props: {
      /**
       * type: 筛选器类型
       * tag | select | input
       */
      type: {
        type: String,
        default: 'tag',
        required: false,
      },
      title: String,
      options: [],
    },
    components: {
      Dropdown,
    },
  }
</script>
