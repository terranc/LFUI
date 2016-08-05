<template>
  <div class="input-group date form_date col-md-5" data-date="" data-date-format="dd MM yyyy" data-link-field="dtp_input2" data-link-format="yyyy-mm-dd">
    <input class="form-control" size="16" type="text" value="" readonly>
    <span class="input-group-addon"><i class="material-icons">clear</i></span>
    <span class="input-group-addon"><i class="material-icons">date_range</i></span>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
    },
    computed: {
      hasIcon() {
        return !!this._slotContents.icon;
      },
    },
  };
</script>
