<template>
  <div class="alert alert-dismissable" :class="'alert-' + type">
    <button type="button" class="close" data-dismiss="alert">×</button>
    <div class="tips-inner">
      <div v-if="hasIcon" class="flex-item-auto tips-icon">
        <slot name="icon"></slot>
      </div>
      <div class="flex-item-auto">
        <h4 v-if="title" v-text="title"></h4>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  export default {
    props: {
      type: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: false,
      },
    },
    computed: {
      hasIcon() {
        return !!this._slotContents.icon;
      },
    },
  };
</script>

<style>
  .row .flex-item-auto {
    flex: 0 1 auto;
    flex-wrap: wrap;
  }
  .tips-inner {
    display: flex;
  }
  .tips-inner .tips-icon {
    margin-right: 12px;
  }
</style>
