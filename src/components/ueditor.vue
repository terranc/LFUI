<template>
  <textarea :name="name" :id="id" class="textarea"></textarea>
</template>

<style>
  .textarea {
    width: 998px;
  }
</style>

<script>
  /* global UE */
  export default {
    props: {
      id: String,
      rows: {
        type: Number,
        default: 8,
      },
      name: String,
    },
    ready() {
      UE.getEditor(this.id, {
        toolbars: [
          ['fullscreen', 'source', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'strikethrough', '|', 'justifyleft', 'justifycenter', 'justifyright', '|', 'insertorderedlist', 'insertunorderedlist', '|', 'link', 'unlink', '|', 'simpleupload', 'insertimage', 'insertvideo', 'map', 'wordimage', '|', 'horizontal', 'spechars', 'removeformat', '|', 'searchreplace', '|', 'preview'],
        ],
        autoHeightEnabled: true,
        initialFrameHeight: 180,
      });
    },
  };
</script>
