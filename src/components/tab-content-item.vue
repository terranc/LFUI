<template>
  <div :class="{ 'tab-pane': true, 'fade': animate, 'active in': active }" :id="id" :aria-expanded="active">
    <p>{{ content }}</p>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  export default {
    props: {
      animate: {
        type: Boolean,
        default: true,
        required: false,
      },
      id: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      active: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
  };
</script>
