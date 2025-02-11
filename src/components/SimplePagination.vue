<template>
   <div class="flex no-wrap items-center pagination q-pa-sm q-gutter-x-xs" :class="`justify-${position}`"
      v-if="hideIfNodata">
      <span>page {{ current_page }} / {{ last_page }}</span>
      <span class="q-pr-xs">total {{ total }}</span>
      <q-btn padding="4px 14px" size="12px" no-caps unelevated :disable="!prev_page_url"
         :color="prev_page_url ? 'teal' : 'grey-5'" @click="loadData(current_page - 1, prev_page_url)">Prev</q-btn>
      <q-btn padding="4px 14px" size="12px" no-caps unelevated :disable="!next_page_url"
         :color="next_page_url ? 'teal' : 'grey-5'" @click="loadData(current_page + 1, next_page_url)">Next</q-btn>
   </div>
</template>

<script>
export default {
   props: {
      autoHide: {
         type: Boolean,
         default: false,
      },
      per_page: {
         default: 0,
      },
      current_page: {
         default: null,
      },
      last_page: {
         default: null,
      },
      total_page: {
         default: null,
      },
      prev_page_url: {
         default: null,
      },
      next_page_url: {
         default: null,
      },
      total: {
         default: 0,
      },
      position: {
         type: String,
         default: "end",
      },
   },
   computed: {
      hideIfNodata() {
         if (this.total == 0) {
            return false;
         }
         return true;
      },
   },
   methods: {
      loadData(page, url) {
         this.$emit('loadmore', page)
         this.$emit('loadUrl', url)
      }
   }
};
</script>
