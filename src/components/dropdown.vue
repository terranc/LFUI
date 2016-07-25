<template>
  <div class="dropdown">
    <btn :type="type" class="dropdown-toggle" data-toggle="dropdown">
      <slot></slot>
    </btn>
    <div class="dropdown-menu">
      <a v-for="item in lists"
        class="dropdown-item"
        :href="item.link">
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  import Button from './button';

  export default {
    props: {
      lists: {
        type: Array,
        required: true,
      },
      type: String,
    },
    components: {
      Btn: Button,
    },
  };
</script>
