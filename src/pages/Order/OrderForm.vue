<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
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
  form.id = order.id
  form.customer_name = order.customer_name
  form.customer_phone = order.customer_phone
  form.customer_email = order.customer_email
  form.customer_address = order.customer_address
  form.order_status = order.order_status
  form.order_note = order.order_note
  form.order_tax = order.order_tax
  form.shipping_cost = order.shipping_cost
  form.order_subtotal = order.order_subtotal
  form.additional_cost_amount = order.additional_cost_amount ? order.additional_cost_amount : ''
  form.additional_cost_description = order.additional_cost_description ? order.additional_cost_description : ''
}

const form = reactive({
  id: '',
  _method: 'PUT',
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  customer_address: '',
  order_note: '',
  order_tax: '',
  order_status: '',
  additional_cost_amount: '',
  shipping_cost: '',
  additional_cost_description: '',
  order_subtotal: '',
})

onMounted(() => getData())

const additional_cost_helper = computed({
  get() {
    return form.additional_cost_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  set(val) {
    if(val) {
      form.additional_cost_amount = val.split('.').join('')
    }
  }
})

// watch(() => additional_cost_helper.value, (val) => {
//   form.additional_cost_amount = val.split('.').join('')
// })

const ppnTotal = computed(() => {
  return parseInt(form.order_subtotal)*parseInt(form.order_tax)/100
})

const additionalCost = computed(() => {
  return form.additional_cost_amount.length
  ? parseInt(form.additional_cost_amount)
  : 0
})
 
const orderTotal = computed(() => {
  return order.value.order_subtotal + additionalCost.value + order.value.shipping_cost
})
const grandTotal = computed(() => {
  return orderTotal.value + ppnTotal.value
})

const submit = () => {
  store.dispatch('order/update', form)
}

const statusOrdeOptions = computed(() => store.state.order.order_status)

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Edit Order</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Order" />
      </q-breadcrumbs>
    </div>
    <!-- {{ order }} -->
    <div v-if="order">
      <div class="card-column q-pa-md">
        <div class="card-title">
          <h2>Customer Info</h2>
        </div>
        <div class="q-gutter-y-sm">
          <q-input filled label="Customer Name" v-model="form.customer_name"></q-input>
          <q-input filled label="Customer Email" v-model="form.customer_email"></q-input>
          <q-input filled label="Customer Phone " v-model="form.customer_phone"></q-input>
          <q-input filled type="textarea" label="Customer Address" v-model="form.customer_address"></q-input>
        </div>
      </div>
      <div class="card-column q-pa-md">
        <div class="card-title">
          <h2>Additional Cost</h2>
        </div>
        <div class="q-gutter-y-sm">
           <money-formatter v-model="additional_cost_helper" label="Additional Cost Amount"/>
          <q-input filled label="Additional Cost Description" v-model="form.additional_cost_description"></q-input>
        </div>
      </div>
      <div class="card-column q-pa-md">
        <div class="card-title">
          <h2>Order Info</h2>
        </div>
        <div class="q-gutter-y-sm">
          <q-input filled label="Order Tax" v-model="form.order_tax" suffix="%"></q-input>
          <q-input filled label="Shipping Cost" v-model="form.shipping_cost"></q-input>
          <q-select filled v-model="form.order_status" label="Order Status" :options="statusOrdeOptions"></q-select>
          <q-input filled type="textarea" v-model="form.order_note" label="Order Note"></q-input>
        </div>
      </div>
      <div class="card-column q-pa-md">
        <div class="card-title">
          <h2>Order Items</h2>
        </div>
        <table class="table striped">
            <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id">
              <td>
                {{ item.product_name }}
              </td>
              <td>{{ item.quantity }}</td>
              <td>{{ $money(item.product_price) }}</td>
              <td>{{ $money(item.product_price*item.quantity) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="column items-end q-mt-md">
          <table class="table dense bolder align-right">
            <tr>
              <td>Subtotal</td>
              <td>Rp</td>
              <td>{{ $money(order.order_subtotal) }}</td>
            </tr>
            <tr v-if="order.shipping_cost">
              <td>Ongkos Kirim</td>
              <td>Rp</td>
              <td>{{ $money(order.shipping_cost) }}</td>
            </tr>
            <tr v-if="form.additional_cost_amount">
              <td>
                <div>Additional Cost</div>
                <div class="text-caption" v-if="form.additional_cost_description">({{ form.additional_cost_description }})</div>
              </td>
              <td>Rp</td>
              <td>{{ $money(form.additional_cost_amount) }}</td>
            </tr>
            <tr>
              <td>Total Order</td>
              <td>Rp</td>
              <td>{{ $money(orderTotal) }}</td>
            </tr>
          </table>
          <table class="table dense bolder q-mt-md align-right">
            <tr>
              <td>Tax ({{order.order_tax}}%)</td>
              <td>Rp</td>
              <td>{{ $money(ppnTotal) }}</td>
            </tr>
            <tr>
              <td>Grand Total</td>
              <td>Rp</td>
              <td>{{ $money(grandTotal) }}</td>
            </tr>
          </table>
        </div>
      </div>  
    </div>
    <div class="q-gutter-x-sm flex justify-end q-pa-lg">
      <q-btn label="Back" color="primary" outline :to="{ name: 'OrderIndex' }"></q-btn>
      <q-btn @click="submit" label="Update" color="primary" unelevated></q-btn>
    </div>
  </q-page>
</template>
