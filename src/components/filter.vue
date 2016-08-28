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
      margin: 4px 8px 6px 0;
      padding: 4px 6px;
      line-height: 1;
      border-radius: 0;
    }
  }

  .filter-box + .filter-box .filter-inner {
    padding-top: 10px;
  }
</style>
