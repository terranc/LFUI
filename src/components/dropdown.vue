<template>
  <div class="dropdown" data-toggle="dropdown">
    <a :class="{'dropdown-toggle': true, 'nav-link': $parent.multiple, 'active': active}"
      :id = "id"
      @click="$el.classList.toggle('open')"
      href="javascript:;"
      aria-haspopup="true"
      aria-expanded="false">
      {{ title }}
    </a>
    <div class="dropdown-menu">
      <a v-for="item in lists"
        :class="{'dropdown-item': true, 'active': active}"
        :href="item.link">
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script>
  /* eslint eol-last: off */

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
      selected: String,
      id: String,
    },
  };
</script>
