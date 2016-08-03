<template>
  <table class="table table-striped table-bordered table-hover">
    <tr>
      <th v-for="i in data[0]">
        <div class="th-inner sortable both desc">{{ $key }}</div>
      </th>
    </tr>
    <tr v-for="item in data">
      <td v-for="i in item">{{ i }}</td>
    </tr>
  </table>
</template>

<script>
  export default {
    props: {
      data: Array,
    },
  };
</script>
