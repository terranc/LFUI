<template>
  <a :class="{'dropdown-item': true, 'active': active}"
    :href="link"
    @click="changeState">
    {{ title }}
  </a>
</template>

<script>
  /* eslint eol-last: off */
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        default: '#',
        required: false,
      },
      active: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    methods: {
      changeState() {
        this.$parent.$children.forEach((item) => {
          item.$set('active', false);
        });
        this.$set('active', true);
        if (this.$parent.$parent.multiple) {
          this.$parent.$parent.$parent.$children.forEach((item) => {
            item.$set('active', false);
          });
          this.$parent.$parent.$set('active', true);
        }
        this.$parent.$el.classList.remove('open');
      },
    },
  };
</script>
