<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered table-hover">
      <thead class="thead-default">
        <tr>
          <th>
            <input type="checkbox" :checked="checkAll" @change="check">
          </th>
          <th v-for="i in items[0]">
            <div class="th-inner sortable both desc">{{ $key }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td><input type="checkbox" :checked="checkAll"></td>
          <td v-for="i in item">{{ i }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array,
      checkAll: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      check(event) {
        event.preventDefault();
        this.checkAll = event.target.checked;
      },
    },
  };
</script>
