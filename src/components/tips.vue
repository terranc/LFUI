<template>
  <div class="alert alert-dismissable" :class="'alert-' + type">
    <button type="button" class="close" data-dismiss="alert">×</button>
    <div class="row">
      <div v-if="hasIcon" class="col-xs-2">
        <slot name="icon"></slot>
      </div>
      <div :class="{ 'col-xs-10': hasIcon, 'col-xs-12': !hasIcon }">
        <h4 v-if="title">{{ title }}</h4>
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
