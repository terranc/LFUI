<template>
  <nav aria-label="Page navigation" class="pull-right">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !preClickable}">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item" v-for="index in totalPage" :class="{'active': index + 1 == currentPage}"><a class="page-link" href="#" v-text="index + 1" @click.prevent="changeCurrent(index+1)"></a></li>
      <li class="page-item" :class="{'disabled': !nextClickable}">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      currentPage: Number,
      totalPage: Number,
    },
    computed: {
      preClickable() {
        return this.currentPage > 1;
      },
      nextClickable() {
        return this.currentPage < this.totalPage;
      },
    },
    methods: {
      changeCurrent(index) {
        this.$dispatch('current-change', index);
      },
    },
  };
</script>

<style>
  .pagination {
    padding: 0;
  }
  .page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {
    color: #818a91;
    pointer-events: none;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
</style>
