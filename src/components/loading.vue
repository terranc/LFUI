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
  import {
  PulseLoader,
  GridLoader,
  ClipLoader,
  RiseLoader,
  BeatLoader,
  SyncLoader,
  RotateLoader,
  FadeLoader,
  PacmanLoader,
  SquareLoader,
  ScaleLoader,
  SkewLoader,
  MoonLoader,
  RingLoader,
  BounceLoader,
  DotLoader } from 'vue-spinner/dist/vue-spinner';

  export default {
    props: {
      type: String,
    },
    components: {
      PulseLoader,
      GridLoader,
      ClipLoader,
      RiseLoader,
      BeatLoader,
      SyncLoader,
      RotateLoader,
      FadeLoader,
      PacmanLoader,
      SquareLoader,
      ScaleLoader,
      SkewLoader,
      MoonLoader,
      RingLoader,
      BounceLoader,
      DotLoader,
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
