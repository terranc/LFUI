<template>
  <div class="filter-box row">
    <div class="filter-label col-xs-2">{{ title }}</div>
    <div class="filter-inner col-xs-10">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: String,
    },
  };
</script>
