<template>
  <textarea name="textarea" :id="id" rows="8" class="textarea"></textarea>
</template>

<script>
  /* global UE */
  export default {
    props: {
      id: String,
      rows: String,
    },
    ready() {
      UE.getEditor(this.id);
    },
  };
</script>
