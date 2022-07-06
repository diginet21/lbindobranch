<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

// store.commit('SET_DRAWER', true)

const orders = computed(() => store.state.order.orders)

onMounted(() => {
  if(!orders.value.length) {
    store.dispatch('order/getOrders');
  }
})

const deleteItem = (item) => {
 Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
    store.dispatch('order/destroy', item.id)
  })

}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Order</div>
        <!-- <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{ name: 'OrderCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Order</span>
        </q-btn> -->
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Parts" />
      </q-breadcrumbs>
    </div>
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
          <tbody>
            <tr v-for="(item, index) in orders.data" :key="index">
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
             <tr v-if="!orders.data.length">
              <td colspan="6" >
                <div class="text-center q-pa-xs">No data found</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-page>
</template>
