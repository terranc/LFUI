<template>
  <div :class="{'table-responsive': responsive}" class="table-container">
    <table class="table table-striped table-bordered table-hover" :width="width">
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
    <slot></slot>
    <pagination :url="url" :query-name="paramsName" :current-page="page" :total-item="totalItem" show-go></pagination>
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
      width: {
        type: String,
        default: '100%',
      },
      url: String,
      queryName: String,
      page: {
        type: Number,
        required: true,
      },
      totalItem: Number,
    },
    components: {
      Pagination,
    },
    methods: {
      onCheck(event) {
        event.target.parentNode.parentNode.classList.toggle('table-active');
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
