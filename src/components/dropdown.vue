<template>
  <div class="dropdown">
    <btn type="secondary" @click="toggle">{{ title }} <i class="material-icons">keyboard_arrow_down</i></btn>
    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <a v-for="item in lists" class="dropdown-item" :href="item.link">{{ item.title }}</a>
    </div>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  import Button from './button';
  export default {
    props: {
      title: {
        type: String,
        default: 'Dropdown',
        required: false,
      },
      lists: {
        type: Array,
        required: true,
      },
    },
    components: {
      Btn: Button,
    },
    methods: {
      toggle() {
        this.$el.classList.toggle('open');
      },
    },
  };
</script>
