<template>
  <nav aria-label="Page navigation" class="pull-right">
    <ul class="pagination">
      <li class="page-item" :class="{'disabled': !preClickable}" @click="currentPage > 1 ? currentPage-- : 1">
        <a class="page-link" :href="pageUrl(currentPage > 1 ? currentPage-1 : 1)" aria-label="Previous">
          <!-- <span aria-hidden="true" :class="{'sr-only': !totalPage}">&laquo;</span>
          <span :class="{'sr-only': totalPage}">上一页</span> -->
          上一页
        </a>
      </li>
      <li class="page-item"
        v-if="currentPage - parseInt(visiblePage/2) > 1 && totalPage">
        <a class="page-link" :href="pageUrl(1)" v-text="1"
          @click="currentPage =  1">
        </a>
      </li>
      <li class="page-item"
        v-if="currentPage - parseInt(visiblePage/2) > 2 && totalPage">
        ···
      </li>
      <li
        class="page-item"
        v-if="totalPage <= visiblePage && totalPage"
        v-for="index in totalPage"
        :class="{'active': index + 1 == currentPage}">
        <a class="page-link" :href="pageUrl(index + 1)" v-text="index + 1"
          @click="currentPage = index + 1">
        </a>
      </li>
      <li
        class="page-item"
        v-if="currentPage <= (visiblePage + 1) /2 && totalPage"
        v-for="index in visiblePage"
        :class="{'active': index + 1 == currentPage}">
        <a class="page-link" :href="pageUrl(index + 1)" v-text="index + 1"
          @click="currentPage = index + 1">
        </a>
      </li>
      <li
        class="page-item"
        v-if="currentPage > (visiblePage + 1) /2 && currentPage + parseInt(visiblePage / 2) < totalPage && totalPage"
        v-for="index in visiblePage"
        :class="{'active': currentPage - parseInt(visiblePage / 2) + index == currentPage}">
        <a class="page-link" :href="pageUrl(currentPage - parseInt(visiblePage / 2) + index)" v-text="currentPage - parseInt(visiblePage / 2) + index"
          @click="currentPage = currentPage - parseInt(visiblePage / 2) + index">
        </a>
      </li>
      <li
        class="page-item"
        v-if="currentPage + parseInt(visiblePage / 2) >= totalPage && totalPage"
        v-for="index in visiblePage"
        :class="{'active': totalPage - visiblePage + 1 + index == currentPage}">
        <a class="page-link" :href="pageUrl(totalPage - visiblePage + 1 + index)" v-text="totalPage - visiblePage + 1 + index"
          @click="currentPage = totalPage - visiblePage + 1 + index">
        </a>
      </li>
      <li class="page-item" v-if="totalPage-currentPage-parseInt(visiblePage/2) > 1">···</li>
      <li class="page-item"
        v-if="totalPage-currentPage-parseInt(visiblePage/2) > 0 && totalPage">
        <a class="page-link" :href="pageUrl(totalPage)" v-text="totalPage"
          @click="currentPage =  totalPage">
        </a>
      </li>
      <li class="page-item" :class="{'disabled': !nextClickable}" @click="currentPage = nextClick()">
        <a class="page-link" :href="pageUrl(nextClick())" aria-label="Next">
          <!-- <span aria-hidden="true" :class="{'sr-only': !totalPage}">&raquo;</span> -->
          <!-- <span :class="{'sr-only': totalPage}">下一页</span> -->
          下一页
        </a>
      </li>
      <li class="page-item page-control disabled" v-if="totalPage && showGo"><input class="form-control" min="1" :max="totalPage" type="number" @keyup.enter="pageGo" :value="currentPage"> / {{ totalPage }} 页</li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      href: String,
      paramsName: {
        type: String,
        default: 'page',
      },
      currentPage: {
        type: Number,
        required: true,
        default: 1,
      },
      totalPage: Number,
      visiblePage: {
        type: Number,
        required: false,
        default: 7,
      },
      showGo: {
        type: Boolean,
        default: false,
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
      pageUrl(val) {
        return this.href ? (this.href + '?' + this.paramsName + '=' + val) : 'javascript:;';
      },
      changeCurrent(index) {
        this.$dispatch('current-change', index);
      },
      nextClick() {
        if (typeof this.totalPage !== 'undefined') {
          return this.currentPage < this.totalPage ? this.currentPage + 1 : this.totalPage;
        } else {
          return this.currentPage + 1;
        }
      },
      pageGo(event) {
        if (typeof this.href === 'undefined') {
          this.currentPage = parseInt(event.target.value);
        } else {
          location.href = this.pageUrl(event.target.value);
        }
      },
    },
  };
</script>

<style scoped>
  .pagination {
    padding: 0;
  }
  .page-control{
    margin-left: 10px;
  }
  .pagination .page-item.disabled .page-link, 
  .pagination .page-item.disabled .page-link:focus, 
  .pagination .page-item.disabled .page-link:hover {
    color: #818a91;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
  .form-control {
    width: 3em;
    appearance: none;
    transition: width .3s ease-in-out;
    text-align: center;
    display: inline-block;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      width: 4em;
      &::-webkit-outer-spin-button {
        -webkit-appearance: outer-spin-button;
      }
      &::-webkit-inner-spin-button{
        -webkit-appearance: inner-spin-button;
      }
    }
  }
</style>
