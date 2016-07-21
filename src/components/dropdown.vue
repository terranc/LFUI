<template>
  <div class="dropdown" data-toggle="dropdown">
    <a :class="{'dropdown-toggle nav-link': true, 'active': active}" href="javascript:;" @click="$el.classList.toggle('open')">{{ title }}</a>
    <div class="dropdown-menu">
      <dropdown-item v-for="item in lists" :link="item.link" :title="item.title"></dropdown-item>
    </div>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  import DropdownItem from './dropdown-item';

  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      lists: {
        type: Array,
        required: true,
      },
      active: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    components: {
      DropdownItem,
    },
  };
</script>
