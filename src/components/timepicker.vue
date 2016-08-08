<template>
  <div class="input-group">
    <input type="text" :name="name" class="form-control">
    <span v-if="hasIcon" class="add-on input-group-addon">
      <slot name="icon"></slot>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
    },
    computed: {
      hasIcon() {
        return !!this._slotContents.icon;
      },
    },
    ready() {
      $(this.$el).datetimepicker({
        language: 'zh-CN',
        format: 'hh:mm:ss',
        pickDate: false,
        autoclose: true,
      });
    },
  };
</script>
