<template>
  <div class="filter-box">
    <div class="filter-label" :style="{'width': width}">{{ title }}</div>
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
<style>
  .filter-box {
    display: table;

    .filter-label {
      display: table-cell;
      min-width: 6em;
      padding-right: 2em;
      padding-top: 6px;
      text-align: right;
      box-sizing: content-box;
    }
    .filter-inner {
      display: table-cell;
      .label {
        padding: .5em .8em;
        margin-bottom: 4px;
        cursor: pointer;
      }
    }
  }
</style>
