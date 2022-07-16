<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

const main_data = computed(() => store.state.order.main_data)

onMounted(() => {
  if(!main_data.value.data.length) {
    getData()
  }
})
const getData = () => {
  store.dispatch('order/getOrders');
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
  limit: 5,
  start: '',
  end: ''
})

const paginateData = () => {
   let payload = {
    skip: main_data.value.data.length,
    limit: main_data.value.limit,
  };
  payload = { ...payload, ...formFilter };

  store.dispatch('order/paginateData', payload)
}

const filterData = () => {
  store.dispatch("order/filterData", formFilter);
};
const reset = () => {
  formFilter.branch_id = ''
  formFilter.start = ''
  formFilter.end = ''
  getData()
}
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
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Order" />
      </q-breadcrumbs>
    </div>
    <q-form class="col"
        @submit.prevent="filterData"
      >
      <div class="row q-gutter-x-sm q-mt-sm">
        <div class="col">
          <q-input 
            stack-label
            label="Start"
            filled
            square
            dense
            type="date"
            v-model="formFilter.start"
          ></q-input>
        </div>
        <div class="col">
          <q-input
            stack-label
            label="End"
            filled
            square
            dense
            type="date"
            v-model="formFilter.end"
          ></q-input>
        </div>
        <div class="col">
          <q-select
            required
            filled
            stack-label
            square
            dense
            label="Showing"
          :options="[5,10,20,50,100]"
          v-model="formFilter.limit">
          </q-select>
        </div>
        <q-btn
          type="submit"
          label="Filter"
          unelevated
          color="dark"
          :disable="loading"
        ></q-btn>
        <q-btn
          type="button"
          label="Reset"
          unelevated
          color="dark"
          :disable="loading"
          @click.prevent="reset"
        ></q-btn>
      </div>
    </q-form>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
           <tr>
            <th>#Invoice</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody v-if="main_data.ready">
            <tr v-for="(item, index) in main_data.data" :key="index">
              <td>{{ item.invoice_id }}</td>
              <td>
                <div>{{ item.customer_name }}</div>
                <div>{{ item.customer_phone }}</div>
              </td>
              <td>{{ $money(item.order_total) }}</td>
              <td>
                <div class="text-uppercase">{{ item.order_type.split('_')[0] }}</div>
              </td>
              <td>{{ item.order_status }}</td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'OrderEdit', params: { id: item.id }}"></q-btn>
                </div>
              </td>
            </tr>
             <tr v-if="!main_data.available">
              <td colspan="6" >
                <div class="text-center q-pa-xs">No data found</div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center q-py-md" v-if="!main_data.ready">
          <q-spinner-facebook size="2em"></q-spinner-facebook>
        </div>
    </div>
      <div class="q-pa-md text-center" v-if="main_data.count > main_data.data.length">
        <q-btn :loading="loading" label="Loadmore.." outline size="md" color="primary" no-caps @click="paginateData"></q-btn>
      </div>
  </q-page>
</template>
