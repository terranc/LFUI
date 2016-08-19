<template>
  <div class="modal modal-loading">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <component :is="currentActive"></component>
          <slot>正在加载中···</slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
      type: String,
    },
    computed: {
      currentActive() {
        if (this.type) {
          return this.type.replace(/^\S/, function(s) {
            return s.toUpperCase();
          }) + 'Loader';
        }
        return 'PulseLoader';
      },
    },
  };
</script>

<style>
  .modal-loading {
    background-color: rgba(0, 0, 0, .5);
    display: block;
    text-align: center;

    .modal-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 300px;
      transform: translate(-50%, -50%);
    }

    .modal-content {
      padding: 20px 0;

      .v-spinner {
        margin: 0 auto 10px;
      }
    }
  }
</style>
