<template>
  <div class="filter-box">
    <div class="filter-label" :style="{'width': width}" v-text="title"></div>
    <div class="filter-inner">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: String,
      width: String,
    },
  };
</script>