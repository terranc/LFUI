<template>
  <ol class="breadcrumb">
    <li v-for="item in lists" :class="{ 'active': !item.link}">
      <a v-if="item.link" :href="item.link">{{ item.title }}</a>
      <span v-else>{{ item.title }}</span>
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
