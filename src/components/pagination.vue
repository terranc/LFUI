<template>
  <nav aria-label="Page navigation" class="pull-right">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !preClickable}" @click.prevent="currentPage > 1 ? currentPage-- : 1">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true" :class="{'sr-only': !totalPage}">&laquo;</span>
          <span :class="{'sr-only': totalPage}">上一页</span>
        </a>
      </li>
      <li
        class="page-item"
        v-if="totalPage <= visiblePage && totalPage"
        v-for="index in totalPage"
        :class="{'active': index + 1 == currentPage}">
        <a class="page-link" href="#" v-text="index + 1"
          @click.prevent="currentPage = index + 1">
        </a>
      </li>
      <li
        class="page-item"
        v-if="currentPage <= visiblePage && totalPage"
        v-for="index in visiblePage"
        :class="{'active': index + 1 == currentPage}">
        <a class="page-link" href="#" v-text="index + 1"
          @click.prevent="currentPage = index + 1">
        </a>
      </li>
      <li
        class="page-item"
        v-if="currentPage > visiblePage && currentPage + parseInt(visiblePage / 2) < totalPage && totalPage"
        v-for="index in visiblePage"
        :class="{'active': currentPage - parseInt(visiblePage / 2) + index == currentPage}">
        <a class="page-link" href="#" v-text="currentPage - parseInt(visiblePage / 2) + index"
          @click.prevent="currentPage = currentPage - parseInt(visiblePage / 2) + index">
        </a>
      </li>
      <li
        class="page-item"
        v-if="currentPage + parseInt(visiblePage / 2) >= totalPage && totalPage"
        v-for="index in visiblePage"
        :class="{'active': totalPage - visiblePage + 1 + index == currentPage}">
        <a class="page-link" href="#" v-text="totalPage - visiblePage + 1 + index"
          @click.prevent="currentPage = totalPage - visiblePage + 1 + index">
        </a>
      </li>
      <li class="page-item" :class="{'disabled': !nextClickable}" @click.prevent="nextClick">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true" :class="{'sr-only': !totalPage}">&raquo;</span>
          <span :class="{'sr-only': totalPage}">下一页</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true,
        default: 1,
      },
      totalPage: Number,
      visiblePage: {
        type: Number,
        required: false,
        default: 5,
      },
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
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
</style>
