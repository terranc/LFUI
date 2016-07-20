<template>
  <div class="alert alert-dismissable" :class="'alert-' + type">
    <button type="button" class="close" data-dismiss="alert">×</button>
    <h4 v-if="title">{{ title }}</h4>
    <p v-html="desc"></p>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  export default {
    props: {
      type: {
        type: String,
        required: false,
      },
      title: {
        type: String,
        required: false,
      },
      desc: {
        type: String,
        required: true,
      },
    },
  };
</script>
