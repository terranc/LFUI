<template>
  <div class="nav-item" v-if="!multiple">
    <a data-toggle="tab" :href="links[0]"
      :class="{ 'nav-link': true, 'active': active}"
      :aria-expanded="active"
      @click="changeState">
      {{ title }}
    </a>
  </div>
  <dropdown class="nav-item"
    :title="title"
    :lists="links"
    :active="active"
    v-else>
  </dropdown>
</template>

<script>
  /* eslint eol-last: off */
  import Dropdown from './dropdown';

  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      links: {
        type: Array,
        required: false,
      },
      active: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    computed: {
      multiple() {
        if (this.links.length > 1) {
          return true;
        } else {
          return false;
        }
      },
    },
    methods: {
      changeState() {
        this.$parent.$children.forEach((item) => {
          item.$set('active', false);
        });
        this.$set('active', true);
      },
    },
    components: {
      Dropdown,
    },
  };
</script>
