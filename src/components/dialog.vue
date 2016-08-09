<template>
  <div class="modal fade" :id="id">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">×</button>
          <h4 v-if="title" class="modal-title">{{ title }}</h4>
        </div>
        <div class="modal-body">{{ desc }}</div>
        <div class="modal-footer" v-if="foot">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          <button type="button" class="btn btn-primary">确认</button>
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
        required: true,
      },
      title: String,
      desc: String,
      foot: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>
