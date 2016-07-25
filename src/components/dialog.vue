<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 v-if="title" class="modal-title">{{ title }}</h4>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="!noFoot">
          <slot name="foot">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary">确认</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  export default {
    props: {
      title: String,
      noFoot: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
