<template>
  <div class="input-group date datetimepicker" :data-format="format">
    <input type="text" :name="name" class="form-control">
    <span class="input-group-addon">
      <slot name="icon">
        <i slot="icon" class="material-icons" v-text="icon"></i>
      </slot>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      format: {
        type: String,
        required: false,
        default: 'YYYY-MM-DD',
      },
    },
    computed: {
      icon() {
        if (this.format.indexOf('mm') && !this.format.indexOf('MM')) {
          return 'schedule';
        } else {
          return 'date_range';
        }
      },
    },
  };
</script>
