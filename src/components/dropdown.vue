<template>
  <div class="btn-group">
    <template v-if="split">
      <a class="btn" :class="'btn-' + type" :href="href"><slot></slot></a>
      <button class="btn dropdown-toggle dropdown-toggle-icon" :class="'btn-' + type" data-toggle="dropdown" type="button">
        <span class="caret"></span>
      </button>
    </template>
    <template v-else>
      <button class="btn dropdown-toggle" :class="'btn-' + type" data-toggle="dropdown">
        <slot></slot>
        <span class="caret"></span>
      </button>
    </template>
    <ul class="dropdown-menu">
      <li>
        <a v-for="item in lists"
          :href="item.link"
          v-text="item.title">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  /* eslint eol-last: off */
  // import Button from './button';

  export default {
    props: {
      split: Boolean,
      href: {
        type: String,
        default: 'javascript:;',
      },
      lists: {
        type: Array,
        required: true,
      },
      type: String,
    },
    components: {
      // Btn: Button,
    },
  };
</script>
