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
    display: table-row;

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
        margin-bottom: 4px;
        padding: .5em .8em;
        cursor: pointer;
      }
      input, select {
        max-width: 25rem;
      }
      .form-control {
        padding: .75rem;
      }
      .input-group-addon {
        line-height: 1.8;
      }
      .input-group-btn {
        .btn {
          height: 100%;
        }
      }
    }
  }
  .filter-inner {
    .category-item {
      margin-right: 4px;
      margin-bottom: 4px;
      padding: 4px 8px;
    }
  }

  .filter-box + .filter-box .filter-inner {
    padding-top: 10px;
  }
</style>
