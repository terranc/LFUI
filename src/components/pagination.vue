<template>
  <nav aria-label="Page navigation" class="pull-right">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !preClickable}" @click.prevent="currentPage > 1 ? currentPage-- : 1">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li
        class="page-item"
        v-if="totalPage"
        v-for="index in totalPage"
        :class="{'active': index + 1 == currentPage}">
        <a class="page-link" href="#" v-text="index + 1"
          @click.prevent="currentPage = index + 1">
        </a>
      </li>
      <li class="page-item" :class="{'disabled': !nextClickable}" @click.prevent="nextClick">
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
        if (this.totalPage) {
          return this.currentPage < this.totalPage;
        }
        return true;
      },
    },
    watch: {
      currentPage(val) {
        this.changeCurrent(val);
      },
    },
    methods: {
      changeCurrent(index) {
        this.$dispatch('current-change', index);
      },
      nextClick() {
        if (typeof this.totalPage !== 'undefined') {
          this.currentPage < this.totalPage ? this.currentPage++ : this.totalPage;
        } else {
          this.currentPage++;
        }
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
