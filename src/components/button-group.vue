<template>
  <div :class="'btn-' + type">
    <slot></slot>
  </div>
</template>

<script>
/* eslint eol-last: off */
  export default {
    props: {
    /**
    * 按钮组类型
    * group: 基本
    * toolbar：工具栏
    * group-vertical: 竖排
    */
      type: {
        type: String,
        default: 'group',
        required: false,
      },
    },
  };
</script>
