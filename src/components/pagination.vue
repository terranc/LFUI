<template>
  <div class="clearfix">
    <div class="pull-left" v-if="total" style="line-height: 46px;">共有 {{ total }} 条记录</div>
    <div class="pull-right">
      <nav aria-label="Page navigation" class="pull-right">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled': !preClickable}" @click="page > 1 ? page-- : 1">
            <a class="page-link" :href="pageUrl(page > 1 ? page-1 : 1)" aria-label="Previous">
              <!-- <span aria-hidden="true" :class="{'sr-only': !totalPage}">&laquo;</span>
              <span :class="{'sr-only': totalPage}">上一页</span> -->
              上一页
            </a>
          </li>
          <li class="page-item"
            v-if="page - parseInt(visiblePage/2) > 1 && totalPage">
            <a class="page-link" :href="pageUrl(1)" v-text="1"
              @click="page =  1">
            </a>
          </li>
          <li class="page-item"
            v-if="page - parseInt(visiblePage/2) > 2 && totalPage">
            ···
          </li>
          <li
            class="page-item"
            v-if="totalPage <= visiblePage && totalPage"
            v-for="index in totalPage"
            :class="{'active': index + 1 == page}">
            <a class="page-link" :href="pageUrl(index + 1)" v-text="index + 1"
              @click="page = index + 1">
            </a>
          </li>
          <li
            class="page-item"
            v-if="page <= (visiblePage + 1) /2 && totalPage"
            v-for="index in visiblePage"
            :class="{'active': index + 1 == page}">
            <a class="page-link" :href="pageUrl(index + 1)" v-text="index + 1"
              @click="page = index + 1">
            </a>
          </li>
          <li
            class="page-item"
            v-if="page > (visiblePage + 1) /2 && page + parseInt(visiblePage / 2) < totalPage && totalPage"
            v-for="index in visiblePage"
            :class="{'active': page - parseInt(visiblePage / 2) + index == page}">
            <a class="page-link" :href="pageUrl(page - parseInt(visiblePage / 2) + index)" v-text="page - parseInt(visiblePage / 2) + index"
              @click="page = page - parseInt(visiblePage / 2) + index">
            </a>
          </li>
          <li
            class="page-item"
            v-if="page + parseInt(visiblePage / 2) >= totalPage && totalPage"
            v-for="index in visiblePage"
            :class="{'active': totalPage - visiblePage + 1 + index == page}">
            <a class="page-link" :href="pageUrl(totalPage - visiblePage + 1 + index)" v-text="totalPage - visiblePage + 1 + index"
              @click="page = totalPage - visiblePage + 1 + index">
            </a>
          </li>
          <li class="page-item" v-if="totalPage-page-parseInt(visiblePage/2) > 1">···</li>
          <li class="page-item"
            v-if="totalPage-page-parseInt(visiblePage/2) > 0 && totalPage">
            <a class="page-link" :href="pageUrl(totalPage)" v-text="totalPage"
              @click="page =  totalPage">
            </a>
          </li>
          <li class="page-item" :class="{'disabled': !nextClickable}" @click="page = nextClick()">
            <a class="page-link" :href="pageUrl(nextClick())" aria-label="Next">
              <!-- <span aria-hidden="true" :class="{'sr-only': !totalPage}">&raquo;</span> -->
              <!-- <span :class="{'sr-only': totalPage}">下一页</span> -->
              下一页
            </a>
          </li>
          <li class="page-item page-control disabled" v-if="totalPage && showGo"><input class="form-control" min="1" :max="totalPage" type="number" @keyup.enter="pageGo" :value="page"> / {{ totalPage }} 页</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      url: String,
      queryName: {
        type: String,
        default: 'page',
      },
      page: {
        type: Number,
        required: true,
        default: 1,
      },
      size: {
        type: Number,
        default: 10,
      },
      total: Number,
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
        return this.page > 1;
      },
      nextClickable() {
        if (this.totalPage) {
          return this.page < this.totalPage;
        }
        return true;
      },
      totalPage() {
        return this.total > 0 ? parseInt((this.total - 1) / this.size) + 1 : undefined;
      },
    },
    watch: {
      page(val) {
        this.changeCurrent(val);
      },
    },
    methods: {
      pageUrl(val) {
        return this.url ? (this.url + '?' + this.queryName + '=' + val) : 'javascript:;';
      },
      changeCurrent(index) {
        this.$dispatch('current-change', index);
      },
      nextClick() {
        if (typeof this.totalPage !== 'undefined') {
          return this.page < this.totalPage ? this.page + 1 : this.totalPage;
        } else {
          return this.page + 1;
        }
      },
      pageGo(event) {
        if (typeof this.url === 'undefined') {
          this.page = parseInt(event.target.value);
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
