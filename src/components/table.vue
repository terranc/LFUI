<template>
  <div :class="{'table-responsive': responsive}" class="table-container">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-default">
        <tr>
          <th>
            <input type="checkbox" v-model="checkAll">
          </th>
          <th v-for="item in titles">
            <div>
              {{ item.name }}
              <i v-if="item.order && parseInt(item.order) > 0" class="material-icons md-18" @click="changeOrder(item)">arrow_drop_down</i>
              <i v-if="item.order && parseInt(item.order) <= 0" class="material-icons md-18" @click="changeOrder(item)">arrow_drop_up</i>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :class="{'table-active': checkAll}">
          <td><input type="checkbox" :checked="checkAll" @click="onCheck"></td>
          <td v-for="i in item">{{ i }}</td>
        </tr>
      </tbody>
    </table>
    <div class="clearfix">
      <div class="pull-left" v-if="totalItem" style="line-height: 46px;">共有 {{totalItem}} 条记录</div>
      <div class="pull-right">
        <pagination :current-page="page" :total-page="totalPage" @current-change="getData" show-go></pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from './pagination';

  export default {
    props: {
      responsive: Boolean,
      titles: Array,
      data: Array,
      checkAll: {
        type: null,
        default: false,
        twoWay: true,
      },
      page: {
        type: Number,
        required: true,
      },
      totalPage: Number,
      totalItem: Number,
    },
    components: {
      Pagination,
    },
    methods: {
      onCheck(event) {
        event.target.parentNode.parentNode.classList.toggle('table-active');
      },
      getData(index) {
        console.log(index);
      },
      changeOrder(item) {
        console.log('wow');
        item.order = item.order > 0 ? -1 : 1;
      },
    },
  };
</script>

<style>
  .table-container {
    overflow-y: hidden;
  }
  th {
    .material-icons {
      cursor: pointer;
    }
  }
</style>
