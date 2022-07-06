<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()
const order = ref(null)
const getData = () => {
  store.dispatch('order/getById', route.params.id).then(response => {
    if(response.status == 200) {
      order.value = response.data.data
      setData(response.data.data)
    }
  })
}

const setData = (order) => {
  form.order_type = order.order_type
  form.vehilce_id = order.vehilce_id ? order.vehilce_id : ''
  form.customer_name = order.customer_name
  form.customer_phone = order.customer_phone
  form.customer_email = order.customer_email
  form.customer_address = order.customer_address
  form.order_status = order.order_status
  form.order_note = order.order_note
  form.order_note = order.order_note
  form.items = order.items
}

const form = reactive({
  order_type: '',
  vehilce_id: '',
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  customer_address: '',
  order_subtotal: '',
  order_quantity: '',
  order_weight: '',
  order_discount: '',
  order_tax: '',
  order_note: '',
  schedule_at: '',
  order_status: '',
  order_items: []
})

onMounted(() => getData())

const submit = () => {
  console.log(form);
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Edit Order</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Parts" />
      </q-breadcrumbs>
    </div>
    <div class="row" v-if="order">
     <div class="card-column q-pa-md">
      <div class="card-title">
        <h2>Customer Info</h2>
      </div>
      <div class="q-gutter-y-sm">
        <q-input label="Customer Name" v-model="form.customer_name"></q-input>
        <q-input label="Customer Email" v-model="form.customer_email"></q-input>
        <q-input label="Customer Address" v-model="form.customer_address"></q-input>
        <q-input label="Customer Phone " v-model="form.customer_phone"></q-input>
      </div>
    </div>
     <div class="card-column q-pa-md">
      <div class="card-title">
        <h2>Product Info</h2>
      </div>
        <table class="table striped">
            <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in form.items" :key="item.id">
              <td>
                {{ item.product_name }}
              </td>
              <td>{{ item.quantity }}</td>
              <td>{{ $money(item.product_price) }}</td>
              <td>{{ $money(item.product_price*item.quantity) }}</td>
            </tr>
          </tbody>
          <tfoot align="right">
            <tr>
              <td colspan="3">Subtotal</td>
              <td>{{ $money(order.order_subtotal) }}</td>
            </tr>
            <tr>
              <td colspan="3">Tax</td>
              <td>{{ $money(order.order_tax) }}</td>
            </tr>
            <tr>
              <td colspan="3">Total</td>
              <td>{{ $money(order.order_total) }}</td>
            </tr>
          </tfoot>
        </table>
    </div>  
    </div>
  </q-page>
</template>
