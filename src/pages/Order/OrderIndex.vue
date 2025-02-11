<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

const main_data = computed(() => store.state.order.main_data)

onMounted(() => {
   if (!main_data.value.data.length) {
      getData()
   }
})

const getData = (url = null) => {
   if (!url) {
      url = `orders?${new URLSearchParams(formFilter).toString()}`
   }
   store.dispatch('order/getOrders', url);
}

const deleteItem = (item) => {
   Dialog.create({
      title: 'Yakin Akan menghapus data?',
      message: 'Data yang dihapus tidak dapat dikembalikan',
      cancel: true
   }).onOk(() => {
      store.dispatch('order/destroy', item.id)
   })

}

const loading = computed(() => store.state.loading)

const formFilter = reactive({
   branch_id: '',
   limit: 10,
   start: '',
   end: '',
   status: ''
})

const reset = () => {
   formFilter.branch_id = ''
   formFilter.start = ''
   formFilter.end = ''
   formFilter.limit = 10
   formFilter.status = ''
   getData()
}
const orderStatus = computed(() => store.state.order.order_status)

</script>

<template>
   <q-page padding>
      <div class="q-py-sm">
         <div class="row items-center q-gutter-x-md">
            <div class="title">Orders</div>
            <!-- <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{ name: 'OrderCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Order</span>
        </q-btn> -->
         </div>
         <q-breadcrumbs class="text-grey" active-color="secondary">
            <q-breadcrumbs-el label="Dashboard" />
            <q-breadcrumbs-el label="Orders" />
         </q-breadcrumbs>
      </div>
      loading: {{ main_data.loading }}
      <q-form class="col" @submit.prevent="getData()">
         <div class="row q-gutter-x-sm q-mt-sm">
            <div class="col">
               <q-input stack-label label="Start" filled square dense type="date" v-model="formFilter.start"></q-input>
            </div>
            <div class="col">
               <q-input stack-label label="End" filled square dense type="date" v-model="formFilter.end"></q-input>
            </div>
            <div class="col">
               <q-select required filled stack-label square dense label="Showing" :options="[10, 20, 50, 100]"
                  v-model="formFilter.limit">
               </q-select>
            </div>
            <div class="col">
               <q-select required filled stack-label square dense label="Order Status" :options="orderStatus"
                  v-model="formFilter.status">
               </q-select>
            </div>
            <q-btn type="submit" label="Filter" unelevated color="dark" :loading="loading"></q-btn>
            <q-btn type="button" label="Reset" unelevated color="dark" :disable="loading"
               @click.prevent="reset"></q-btn>
         </div>
      </q-form>
      <div class="card-column">
         <div class="table-responsive">
            <table class="table striped">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>#Invoice</th>
                     <th>Created</th>
                     <th>Customer</th>
                     <th>Type</th>
                     <th>Status</th>
                     <th align="right">Action</th>
                  </tr>
               </thead>
               <tbody v-if="main_data.ready">
                  <tr v-for="(item, index) in main_data.data" :key="index">
                     <td>{{ main_data.from + index }}</td>
                     <td>
                        <div>{{ item.invoice_id }}</div>
                     </td>
                     <td>{{ item.created_at }}</td>
                     <td>
                        <div>{{ item.customer_name }}</div>
                        <div>{{ item.customer_phone }}</div>
                     </td>
                     <td>
                        <div>{{ item.type_label }}</div>
                     </td>
                     <td>{{ item.order_status }}</td>
                     <td align="right">
                        <div class="q-gutter-sm">
                           <q-btn size="sm" color="blue" unelevated :to="{ name: 'OrderEdit', params: { id: item.id } }"
                              label="Detail"></q-btn>
                        </div>
                     </td>
                  </tr>
                  <tr v-if="main_data.ready && !main_data.total">
                     <td colspan="6">
                        <div class="text-center q-pa-xs">No data found</div>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
      <q-inner-loading :showing="main_data.loading"></q-inner-loading>
      <SimplePagination v-bind="main_data" @loadUrl="getData"></SimplePagination>
   </q-page>
</template>
