<template>
  <div class="dropdown">
    <button class="btn dropdown-toggle" :class="'btn-' + type" data-toggle="dropdown">
      <slot></slot>
    </button>
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
