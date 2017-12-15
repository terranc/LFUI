<template>
  <div class="lf-table" v-el:table>
    <slot></slot>
  </div>
</template>

<script>

  export default {
    created () {
      if (!this.uuid) {
        this.uuid = + new Date();
      }
    },
    methods: {
      addRule(selector, styles, sheet) {
        styles = (function (styles) {
          if (typeof styles === 'string') return styles;
          var clone = '';
          for (var p in styles) {
            if (styles.hasOwnProperty(p)) {
              var val = styles[p];
              p = p.replace(/([A-Z])/g, '-$1').toLowerCase(); // convert to dash-case
              clone += p + ':' + (p === 'content' ? '"' + val + '"' : val) + '; ';
            }
          }
          return clone;
        }(styles));
        sheet = sheet || document.styleSheets[document.styleSheets.length - 1];

        if (sheet.insertRule) sheet.insertRule(selector + ' {' + styles + '}', sheet.cssRules.length);
        else if (sheet.addRule) sheet.addRule(selector, styles);

        return this;
      },
    },
    components: {
      // Pagination,
    },
    ready() {
      const table = this.$els.table.querySelector('table');
      const _columns = table.querySelectorAll('thead th');
      const columns = Array.prototype.slice.call(_columns, 0);
      const _rows = table.querySelectorAll('tbody tr');
      const rows = Array.prototype.slice.call(_rows, 0);
      const style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
      style.sheet.media.mediaText = 'only screen and (max-width : 800px)';
      let titles = [];
      columns.forEach((column, i) => {
        titles[i] = column.innerText;
        this.addRule('.lf-table table td.table-' + this.uuid + '-' + i + ':before', {
          content: column.innerText,
        }, style.sheet);
      });
      rows.forEach((row, i) => {
        const _cols = row.querySelectorAll('td');
        const cols = Array.prototype.slice.call(_cols, 0);
        cols.forEach((col, n) => {
          col.classList.add('table-' + this.uuid + '-' + n);
        });
      });
    },
  };
</script>
