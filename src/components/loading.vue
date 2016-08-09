<template>
  <div class="modal modal-loading">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <pulse-loader></pulse-loader>
        <slot>正在加载中···</slot>
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
    data: {
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
      transform: translate(-50%, -50%);
    }

    .modal-content {
      padding: 20px 0;
    }
  }
</style>
