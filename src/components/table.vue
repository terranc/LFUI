<template>
  <div :class="{'table-responsive': responsive}" class="table-container">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-default">
        <tr>
          <th>
            <input type="checkbox" v-model="checkAll">
          </th>
          <th v-for="i in items[0]">
            <div>{{ $key }} <i class="material-icons md-18">arrow_drop_down</i></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :class="{'table-active': checkAll}">
          <td><input type="checkbox" :checked="checkAll" @click="onCheck"></td>
          <td v-for="i in item">{{ i }}</td>
        </tr>
      </tbody>
    </table>
    <pagination :current-page="page" :total-page="totalPage" @current-change="getData"></pagination>
  </div>
</template>

<script>
  import Pagination from './pagination';

  export default {
    props: {
      responsive: Boolean,
      items: Array,
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
