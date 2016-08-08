<template>
  <div class="input-group">
    <input type="text" :name="name" class="form-control">
    <span class="add-on input-group-addon">
      <i slot="icon" class="material-icons">date_range</i>
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
        format: 'yyyy-MM-dd hh:mm:ss',
        autoclose: true,
      });
    },
  };
</script>

<style>
  .bootstrap-datetimepicker-widget ul {
    padding: 0;
  }
</style>
