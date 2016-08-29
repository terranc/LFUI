<template>
  <component :is="component" class="btn" :class="[typeClass]" :disabled="disabled" :href="href">
    <slot></slot>
  </component>
</template>

<script>
/* eslint eol-last: off */
export default {
  props: {
    /**
     * 按钮颜色类型
     * primary: 主色
     * warn：警告色
     * default：默认色（灰色）
     */
    type: {
      type: String,
      default: 'primary',
      required: false,
    },
    /**
     * 是否为disabled按钮，若为true则会阻止点击事件
     */
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    /**
     * 是否为plain按钮，plain按钮无填充色，只有边框
     * 目前只有primary和default类型支持plain按钮
     */
    outline: {
      type: Boolean,
      default: false,
      required: false,
    },
    /*
     * 链接
     */
    href: String,
  },
  computed: {
    typeClass() {
      return `btn${this.outline ? '-outline' : ''}-${this.type}`;
    },
    component() {
      if (this.href) {
        return 'LinkButton';
      } else {
        return 'PrimaryButton';
      }
    },
  },
  components: {
    LinkButton: {
      template: '<a><slot></slot></a>',
    },
    PrimaryButton: {
      template: '<button><slot></slot></button>',
    },
  },
};
</script>
