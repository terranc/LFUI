<template>
  <div class="nav nav-tabs">
    <tab-item v-for="item in lists" :title="item.title" :links="item.links" :active="item.active"></tab-item>
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
    },
    components: {
      TabItem,
    },
  };
</script>
