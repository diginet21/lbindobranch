<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { Dialog, Notify } from 'quasar'
import { useRoute } from 'vue-router'
import { Api } from 'boot/axios'

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

const invoiceNumber = ref('')

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

  invoiceNumber.value = order.invoice_id
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
  subtotal: 0
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

const statusOrdeOptions = computed(() => store.state.order.order_status_options)

const handleProcessOrder = () => {
  Dialog.create({
    title: 'Konfirmasi',
    message: 'Ini akan merubah status pesanan menjadi "PROCESS"',
    cancel: true
  }).onOk(() => {
    processOrder()
  })
}

const processOrder = () => {
   store.dispatch('order/process', order.value.id).then(() => {
    getData()
    Notify.create({
      type: 'positive',
      message: 'Order has been successfully updated',
      position: 'top-right'
    })
    store.dispatch('order/getOrders')
  })
}
const handleAbortOrder = () => {
   store.dispatch('order/abort', order.value.id).then(() => {
    getData()
    Notify.create({
      type: 'positive',
      message: 'Order has been successfully updated',
      position: 'top-right'
    })
    store.dispatch('order/getOrders')
  })
}
const resiModal = ref(false)

const resiNumber =ref('')

const handleInputResi = () => {
  resiModal.value = true
}
const submitResi = () => {
  resiModal.value = false
  store.dispatch('order/inputResi', { order_id: order.value.id, resi_code: resiNumber.value }).then(() => {
    getData()
    Notify.create({
      type: 'positive',
      message: 'Order has been successfully updated',
      position: 'top-right'
    })
    store.dispatch('order/getOrders')
  })
}
const orderModal = ref(false)
const userModal = ref(false)

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Order {{ invoiceNumber }}</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Order" />
      </q-breadcrumbs>
    </div>
    <div class="flex justify-end q-gutter-x-sm">
      <q-btn @click="handleProcessOrder" color="blue" size="13px" label="Process Order"></q-btn>
      <q-btn @click="handleInputResi" color="purple" size="13px" label="Input Resi"></q-btn>
      <q-btn @click="handleAbortOrder" color="red" size="13px" label="Cancel Order"></q-btn>
    </div>
    <div v-if="order">
       <div class="card-column q-pa-md">
        <div class="card-title">
          <h2>Products</h2>
        </div>
        <table class="table striped">
            <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id">
              <td>
                {{ item.product_name }}
              </td>
              <td>{{ item.quantity }}</td>
              <td>IDR {{ $money(item.product_price) }}</td>
              <td>IDR {{ $money(item.product_price*item.quantity) }}</td>
            </tr>
            
          </tbody>
        </table>
      </div> 
      <div class="card-column q-pa-md">
        <div class="card-title justify-between">
          <h2>Order Info</h2>
          <!-- <q-btn label="Edit" @click="orderModal = true"></q-btn> -->
        </div>
        <q-list separator>
          <q-item>
            <q-item-section>INVOICE</q-item-section>
            <q-item-section>{{ order.invoice_id }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Type</q-item-section>
            <q-item-section class="text-uppercase">{{ order.order_type.split('_').join(' ') }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Status</q-item-section>
            <q-item-section>{{ order.order_status }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Subtotal</q-item-section>
            <q-item-section>IDR {{ $money(form.order_subtotal) }}</q-item-section>
          </q-item>
          <q-item v-if="order.order_discount">
            <q-item-section>Discount</q-item-section>
            <q-item-section>{{ form.order_discount }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Shipping Cost</q-item-section>
            <q-item-section>IDR {{ $money(form.shipping_cost) }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Tax Total</q-item-section>
            <q-item-section>IDR {{ ppnTotal }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Order Total</q-item-section>
            <q-item-section>IDR {{ $money(grandTotal) }}</q-item-section>
          </q-item>
        </q-list>
        <q-dialog v-model="orderModal">
          <q-card class="card-md">
            <div class="card-title q-pa-md">
              <h4>Edit Order</h4>
              <q-btn flat icon="close" dense v-close-popup></q-btn>
            </div>
            <q-card-section>
              <div class="q-gutter-y-sm">
                <q-select v-model="form.order_status" label="Order Status" :options="statusOrdeOptions"></q-select>
                <q-input label="Order Tax" v-model="form.order_tax" suffix="%"></q-input>
                <q-input label="Shipping Cost" v-model="form.shipping_cost"></q-input>
                <q-input type="textarea" v-model="form.order_note" label="Order Note"></q-input>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
     
      <div class="card-column q-pa-md">
        <div class="card-title justify-between">
          <h2>Customer Info</h2>
        </div>
        <div class="q-gutter-y-sm">
          <q-input label="Customer Name" v-model="form.customer_name"></q-input>
          <q-input label="Customer Email" v-model="form.customer_email"></q-input>
          <q-input label="Customer Phone " v-model="form.customer_phone"></q-input>
          <q-input type="textarea" label="Customer Address" v-model="form.customer_address"></q-input>
        </div>
      </div>
      <!-- <div class="card-column q-pa-md">
        <div class="card-title">
          <h2>Additional Cost</h2>
        </div>
        <div class="q-gutter-y-sm">
           <money-formatter v-model="additional_cost_helper" label="Additional Cost Amount"/>
          <q-input label="Additional Cost Description" v-model="form.additional_cost_description"></q-input>
        </div>
      </div> -->
      
      <div class="card-column q-pa-md">
        <div class="card-title">
          <h2>Invoices</h2>
        </div>
        <div v-for="payment in order.payments" :key="payment.id" class="q-mb-md">
          <div class="q-pa-xs">
            <q-list separator bordered>
              <q-item>
                <q-item-section>Reference</q-item-section>
                <q-item-section>{{ payment.ref }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Method</q-item-section>
                <q-item-section>{{ payment.method.split('_').join(' ') }} - {{ payment.name }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Type</q-item-section>
                <q-item-section>{{ payment.payment_type }} </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Status</q-item-section>
                <q-item-section>{{ payment.status }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Customer Fee</q-item-section>
                <q-item-section>IDR {{ $money(payment.payment_fee) }}</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Total Amount</q-item-section>
                <q-item-section>IDR {{ $money(payment.amount) }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
    <div class="q-gutter-x-sm flex justify-end q-pa-lg">
      <q-btn label="Back" color="primary" outline :to="{ name: 'OrderIndex' }"></q-btn>
      <q-btn @click="submit" label="Update" color="primary" unelevated></q-btn>
    </div>
    <q-dialog v-model="resiModal">
       <q-card class="card-md">
        <q-card-section>
           <q-form @submit.prevent="submitResi">
            <div class="text-md q-mb-sm">Resi Number</div>
            <q-input filled required v-model="resiNumber"></q-input>
            <div class="q-mt-md q-gutter-x-sm flex justify-end">
              <q-btn outline color="primary" label="Cancel" v-close-popup></q-btn>
              <q-btn unelavated color="primary" type="submit" label="Submit"></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
