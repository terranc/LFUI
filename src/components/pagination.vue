<template>
  <div class="clearfix">
    <div class="pull-left" v-if="total" style="line-height: 46px;">共有 {{ total }} 条记录</div>
    <div class="pull-right">
      <nav aria-label="Page navigation" class="pull-right">
        <ul class="pagination">
          <li class="page-item" :class="{'disabled': !preClickable}">
            <a class="page-link" :href="pageUrl(page)" aria-label="Previous" @click="page > 1 ? page-- : 1" :class="{'disabled': !preClickable}">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item"
            v-if="printPage"
            v-for="item in printPage"
            track-by="$index"
            :class="{'active': item == page}">
            <a class="page-link"
              v-if="typeof item === 'number'"
              :href="pageUrl(item)"
              @click="page =  item">
              {{ item }}
            </a>
            <span v-else>{{item}}</span>
          </li>
          <li class="page-item" :class="{'disabled': !nextClickable}">
            <a class="page-link"
              :href="pageUrl(page)"
              aria-label="Next"
              @click="page = nextClick()">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
          <li class="page-item page-control" v-if="totalPage && showGo">
            <input class="form-control"
              min="1" :max="totalPage"
              type="number"
              @keyup.enter.prevent="pageGo"
              :value="page"> / {{ totalPage }} 页
          </li>
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
      limit: {
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
        return this.total > 0 ? Math.ceil(this.total / this.limit) : undefined;
      },
      printPage() {
        if (this.total) {
          const tempArr = [...new Array(this.visiblePage).keys()];
          if (this.visiblePage >= this.totalPage) {
            return [...new Array(this.totalPage).keys()].map(item => item + 1);
          }
          if (Math.ceil(this.visiblePage / 2) + 1 > this.page) {
            const tempArr1 = tempArr.map(item => item + 1);
            tempArr1[this.visiblePage - 1] = this.totalPage;
            tempArr1.splice(this.visiblePage - 1, 0, '···');
            return tempArr1;
          } else if (this.page + parseInt(this.visiblePage / 2) + 1 > this.totalPage) {
            const tempArr1 = tempArr.map(item => item + this.totalPage - this.visiblePage + 1);
            tempArr1[0] = 1;
            tempArr1.splice(1, 0, '···');
            return tempArr1;
          } else {
            const tempArr1 = tempArr.map(item => item + this.page - parseInt(this.visiblePage / 2));
            if (!tempArr1.includes(1)) {
              tempArr1[0] = 1;
            }
            if (!tempArr1.includes(this.totalPage)) {
              tempArr1[this.visiblePage - 1] = this.totalPage;
            }
            tempArr1.splice(1, 0, '···');
            tempArr1.splice(tempArr1.length - 1, 0, '···');
            return tempArr1;
          }
        }
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
