<template>
  <div class="modal fade" :id="id">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
          <h4 class="modal-title" v-text="title"></h4>
        </div>
        <div v-if="desc" class="modal-body" v-text="desc"></div>
        <div class="modal-footer" v-if="foot">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-if="type === 'confirm'">关闭</button>
          <button type="button" class="btn btn-primary" @click="confirmEvent">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        default: 'dialog-' + new Date(),
      },
      title: String,
      desc: String,
      foot: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        default: 'confirm',
      },
    },
    methods: {
      confirmEvent() {
        this.$dispatch('confirm-event');
      },
    },
  };
</script>
