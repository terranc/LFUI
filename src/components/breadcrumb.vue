<template>
  <ol class="breadcrumb">
    <li v-for="item in lists" class="breadcrumb-item" :class="{ 'active': !item.link}">
      <a v-if="item.link" :href="item.link" v-text="item.title"></a>
      <span v-else v-text="item.title"></span>
    </li>
  </ol>
</template>

<script>
  export default {
    props: {
      lists: {
        type: Array,
        required: true,
      },
    },
  };
</script>
