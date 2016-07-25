<template>
  <div class="nav nav-tabs">
    <tab-item v-for="item in lists" :title="item.title" :id="item.id" :links="item.links" :active="item.active"></tab-item>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  import TabItem from './tab-item';

  export default {
    props: {
      lists: {
        type: Array,
        required: true,
      },
      selected: {
        type: String,
        required: false,
      },
    },
    components: {
      TabItem,
    },
  };
</script>
