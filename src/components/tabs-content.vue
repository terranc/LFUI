<template>
  <div class="tab-content">
    <tab-content-item v-for="item in lists"
      :id="item.id"
      :content="item.content"
      :active="item.active">
    </tab-content-item>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  import TabContentItem from './tab-content-item';

  export default {
    props: {
      lists: {
        type: Array,
        required: true,
      },
    },
    components: {
      TabContentItem,
    },
  };
</script>
