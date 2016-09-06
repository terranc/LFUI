<template>
  <div class="paging row">
    <div class="col-md-3 visible-lg-block" v-if="total">共有 {{ total }} 条记录</div>
    <div :class="total ? 'col-md-9' : 'col-md-12'">
      <nav aria-label="Page navigation" class="pull-right">
        <ul class="pagination">
          <li :class="{'disabled': !preClickable}">
            <a :href="pageUrl(page)" aria-label="Previous" @click="page > 1 ? page-- : 1">
              <!-- <span aria-hidden="true" :class="{'sr-only': !totalPage}">&laquo;</span>
              <span :class="{'sr-only': totalPage}">上一页</span> -->
              上一页
            </a>
          </li>
          <li
            v-if="page - parseInt(visiblePage/2) > 1 && totalPage > visiblePage">
            <a :href="pageUrl(1)" v-text="1"
              @click="page =  1">
            </a>
          </li>
          <li
            v-if="page - parseInt(visiblePage/2) > 2 && totalPage > visiblePage">
            <span>···</span>
          </li>
          <li
           
            v-if="totalPage <= visiblePage && totalPage > visiblePage"
            v-for="index in totalPage"
            :class="{'active': index + 1 == page}">
            <a :href="pageUrl(index + 1)" v-text="index + 1"
              @click="page = index + 1">
            </a>
          </li>
          <li
           
            v-if="page <= (visiblePage + 1) /2 && totalPage > visiblePage"
            v-for="index in visiblePage"
            :class="{'active': index + 1 == page}">
            <a :href="pageUrl(index + 1)" v-text="index + 1"
              @click="page = index + 1">
            </a>
          </li>
          <li
           
            v-if="page > (visiblePage + 1) /2 && page + parseInt(visiblePage / 2) < totalPage && totalPage > visiblePage"
            v-for="index in visiblePage"
            :class="{'active': page - parseInt(visiblePage / 2) + index == page}">
            <a :href="pageUrl(page - parseInt(visiblePage / 2) + index)" v-text="page - parseInt(visiblePage / 2) + index"
              @click="page = page - parseInt(visiblePage / 2) + index">
            </a>
          </li>
          <li
           
            v-if="page + parseInt(visiblePage / 2) >= totalPage && totalPage > visiblePage"
            v-for="index in visiblePage"
            :class="{'active': totalPage - visiblePage + 1 + index == page}">
            <a :href="pageUrl(totalPage - visiblePage + 1 + index)" v-text="totalPage - visiblePage + 1 + index"
              @click="page = totalPage - visiblePage + 1 + index">
            </a>
          </li>
          <li v-if="totalPage-page-parseInt(visiblePage/2) > 1"><span>···</span></li>
          <li
            v-if="totalPage-page-parseInt(visiblePage/2) > 0 && totalPage > visiblePage">
            <a :href="pageUrl(totalPage)" v-text="totalPage"
              @click="page =  totalPage">
            </a>
          </li>
          <li
            v-if="totalPage <= visiblePage" v-for="item in totalPage"
            :class="{'active': page ===  item + 1}">
            <a
              :href="pageUrl(item + 1)"
              v-text="item + 1"
              @click="page =  item + 1">
            </a>
          </li>
          <li :class="{'disabled': !nextClickable}">
            <a :href="pageUrl(page)" aria-label="Next" @click="page = nextClick()">
              <!-- <span aria-hidden="true" :class="{'sr-only': !totalPage}">&raquo;</span> -->
              <!-- <span :class="{'sr-only': totalPage}">下一页</span> -->
              下一页
            </a>
          </li>
          <li class="page-control" v-if="totalPage && showGo"><input class="form-control" min="1" :max="totalPage" type="number" @keyup.enter.prevent="pageGo" :value="page"> / {{ totalPage }} 页</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      url: String,
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
        return this.url ? this.url.replace(/{page}/, val) : 'javascript:;';
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
        event.preventDefault();
        if (typeof this.url === 'undefined') {
          this.page = parseInt(event.target.value);
        } else {
          location.href = this.pageUrl(event.target.value);
        }
      },
    },
  };
</script>
