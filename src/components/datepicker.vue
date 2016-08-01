<template>
  <div class="input-group date" data-provide="datepicker">
  <input type="text" :name="name" class="form-control">
    <div v-if="hasIcon" class="input-group-addon">
      <slot name="icon"></slot>
    </div>
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
  };
</script>
