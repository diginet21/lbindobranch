<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { Dialog, Loading, Notify } from 'quasar'
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

const paymentChanelsOptions = computed(() => store.getters['paymentChanelsOptions'])
const branch = computed(() => store.state.branch)

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
  order_subtotal: 0
})

onMounted(() => {
  getData()
  if(!paymentChanelsOptions.value.length < 2) {
    store.dispatch('getPaymentChanels')
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
  Loading.show()
  store.dispatch('order/update', form)
  .then(() => {
    getData()
    Notify.create({
      type: 'positive',
      message: 'Order has been successfully updated',
      position: 'top-right'
    })
     store.dispatch('order/getOrders')
  })
  .finally(() => Loading.hide())
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
   Dialog.create({
    title: 'Konfirmasi',
    message: 'Konfirmasi Pembatalan Pesanan',
    cancel: true
  }).onOk(() => {
    abortOrder()
  })
}
const abortOrder = () => {

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
const invoiceModal = ref(false)

const handleCreateInvoice = () => {
  clearForm()
  formInvoice.order_id = order.value.id
  formInvoice.branch_id = branch.value.id
  formInvoice.amount = maxTotalAmount.value
  invoiceModal.value = true
}

const maxTotalAmount = computed(() => {
  let totalAmount = parseInt(order.value.order_total) 
  return order.value.payments_sum_amount ? totalAmount - parseInt(order.value.payments_sum_amount) : totalAmount
})

const formInvoice = reactive({
  order_id: '',
  branch_id: '',
  amount: '',
  payment_code: ''
})
const invoice_amount_helper = computed({
  get() {
    return formInvoice.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  set(val) {
    if(val) {
      formInvoice.amount = val.split('.').join('')
    }
  }
})

const errorMaxTotalAmount = computed(() => {
  if(formInvoice.amount > maxTotalAmount.value) {
    return true
  }
  return false
})


const formAddItem = reactive({
  order_id: '',
  branch_id: '',
  product_price: '',
  product_name: '',
  note: '',
  quantity: 1,
  product_sku: '123'
})

const add_item_helper = computed({
  get() {
    return formAddItem.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  set(val) {
    if(val) {
      formAddItem.product_price = val.split('.').join('')
    }
  }
})


const clearForm = () => {
  formInvoice.order_id = ''
  formInvoice.branch_id = ''
  formInvoice.amount = ''
  formInvoice.payment_code = ''
  invoiceModal.value = false

  formAddItem.order_id = ''
  formAddItem.branch_id = ''
  formAddItem.product_price = ''
  formAddItem.product_name = ''
  formAddItem.note = ''
  formAddItem.quantity = 1
  formAddItem.product_sku = '123'
  addItemModal.value = false
}

const submitInvoice =() => {
  if(errorMaxTotalAmount.value == true) return
  if(!formInvoice.payment_code) {
    Notify.create({
      type: 'negative',
      message: 'Metode pembayaran belum dipilih'
    })
    return
  }
  store.dispatch('order/createInvoice', formInvoice).then((res) => {
    getData()
  }).finally(() => invoiceModal.value = false)

}

const addItemModal = ref(false)

const handleAddItem = () => {
  clearForm()
  formAddItem.order_id = order.value.id
  formAddItem.branch_id = branch.value.id
  addItemModal.value = true
}

const submitAddItem = () => {
  store.dispatch('order/addOrderItem', formAddItem).then((res) => {
    getData()
  }).finally(() => addItemModal.value = false)
}

const removeItem = (item) => {
  Dialog.create({
    title: 'Confirm',
    message: 'Konfirmasi pemghapusan item',
    cancel: true
  }).onOk(() => {
    store.dispatch('order/removeOrderItem', item.id).then(() => {
      getData()
    })
  })
}

const canCreateInvoice = computed(() => {
  if(order.value.order_total > order.value.payments_sum_amount) {
    return true
  }
  return false
})

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
    <div class="flex justify-end q-gutter-x-sm" v-if="order">
      <q-btn :to="{ name: 'OrderIndex' }" color="grey-8" size="13px" label="Back"></q-btn>
      <q-btn v-if="order.order_status == 'PENDING'" @click="handleAddItem" color="pink" size="13px" label="Additional Item"></q-btn>
      <q-btn :disable="!canCreateInvoice" @click="handleCreateInvoice" color="teal" size="13px" label="Generate Invoice"></q-btn>
      <q-btn @click="handleProcessOrder" color="blue" size="13px" label="Process Order"></q-btn>
      <q-btn v-if="order.shipping_courier_name" @click="handleInputResi" color="purple" size="13px" label="Input Resi"></q-btn>
      <q-btn v-if="order.order_status == 'PENDING' || order.order_status == 'UNPAID'" @click="handleAbortOrder" color="red" size="13px" label="Cancel Order"></q-btn>
    </div>
    <div v-if="order">
      <div class="card-column q-pa-md">
        <div class="card-title justify-between">
          <h2>Order Detail</h2>
          <!-- <q-btn label="Edit" @click="orderModal = true"></q-btn> -->
        </div>
        <q-list separator>
          <q-item>
            <q-item-section>INVOICE</q-item-section>
            <q-item-section>{{ order.invoice_id }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Payment Type</q-item-section>
            <q-item-section>{{ order.is_cash_payment ? 'CASH' : 'KREDIT' }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Type</q-item-section>
            <q-item-section>{{ order.type_label }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Status</q-item-section>
            <q-item-section>
              <q-item-label>
                <q-badge>{{ order.order_status }}</q-badge>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Subtotal</q-item-section>
            <q-item-section>IDR {{ $money(form.order_subtotal) }}</q-item-section>
          </q-item>
          <q-item v-if="order.order_discount">
            <q-item-section>Discount</q-item-section>
            <q-item-section>{{ form.order_discount }}</q-item-section>
          </q-item>
          <!-- <q-item>
            <q-item-section>
              <q-item-label>Additional Cost</q-item-label>
              <q-item-label v-if="order.additional_cost_description" caption>{{ order.additional_cost_description }}</q-item-label>
            </q-item-section>
            <q-item-section>IDR {{ order.additional_cost_amount ?  $money(order.additional_cost_amount) : 0 }}</q-item-section>
          </q-item> -->
          <q-item>
            <q-item-section>Tax Total</q-item-section>
            <q-item-section>IDR {{ $money(order.tax_total) }}</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Order Total</q-item-section>
            <q-item-section>IDR {{ $money(order.order_total) }}</q-item-section>
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
        <div class="card-title">
          <h2>Order Items</h2>
        </div>
        <table class="table striped">
            <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Note</th>
              <th></th>
              <th align="right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id">
              <td>
                {{ item.product_name }}
              </td>
              <td>{{ item.quantity }}</td>
              <td>IDR {{ $money(item.product_price) }}</td>
              <td><p>{{ item.note }}</p></td>
              <td>
                <q-btn label="remove" padding="1px 5px" no-caps dense color="red" size="11px" outline v-if="order.order_status == 'PENDING' && item.is_additional == 1" @click="removeItem(item)"></q-btn>
              </td>
              <td align="right">IDR {{ $money(item.product_price*item.quantity) }}</td>
            </tr>
            
          </tbody>
        </table>
      </div> 

       <div class="card-column q-pa-md">
        <div class="card-title">
          <h2>Invoices</h2>
        </div>
        <div class="table-responsive">
        <table class="table striped">
          <thead>
           <tr>
            <th>Reference</th>
            <th>Payment Method</th>
            <th>Type</th>
            <th>Status</th>
            <th>Customer Fee</th>
            <th align="right">Total Amount</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="payment in order.payments" :key="payment.id">
              <td>
               {{ payment.ref }}
              </td>
              <td>
                {{ payment.method.split('_').join(' ') }} - {{ payment.name }}
              </td>
              <td>{{ payment.payment_type }}</td>
              <td> 
                <q-badge>{{ payment.status }}</q-badge>
              </td>
              <td>
                IDR {{ $money(payment.payment_fee) }}
              </td>
              <td align="right">
                IDR {{ $money(payment.amount) }}
              </td>
            </tr>
            <tr v-if="!order.payments.length">
              <td colspan="6" class="text-center">No data available</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
     
      <div class="card-column q-pa-md">
        <div class="card-title justify-between">
          <h2>Customer Info</h2>
        </div>
        <div class="q-gutter-y-sm q-px-md">
          <q-input label="Customer Name" v-model="form.customer_name"></q-input>
          <q-input label="Customer Email" v-model="form.customer_email"></q-input>
          <q-input label="Customer Phone " v-model="form.customer_phone"></q-input>
          <q-input type="textarea" label="Customer Address" rows="3" v-model="form.customer_address"></q-input>
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
    <q-dialog v-model="invoiceModal" persistent>
      <q-card class="card-lg">
        <div class="card-header text-md">Generate Invoice</div>
        <q-separator></q-separator>
        <q-card-section>
          <q-form @submit.prevent="submitInvoice">
             <money-formatter required v-model="invoice_amount_helper" label="Amount"/>
             <div class="text-red text-xs q-pa-xs" v-if="errorMaxTotalAmount">Maximal {{ $moneyIdr(maxTotalAmount) }}</div>
            <q-select required label="Payment Method" v-model="formInvoice.payment_code" :options="paymentChanelsOptions" map-options emit-value></q-select>
            <q-input v-model="formInvoice.note" label="Description" type="textarea"></q-input>
            <div class="q-mt-md q-gutter-x-sm">
              <q-btn label="Submit" type="submit" color="primary" unelevated></q-btn>
              <q-btn label="Cancel"  color="primary" outline v-close-popup></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="addItemModal" persistent>
      <q-card class="card-lg">
        <div class="card-header text-md">Additional Item</div>
        <q-separator></q-separator>
        <q-card-section>
          <q-form @submit.prevent="submitAddItem">
            <q-input min="0" required v-model="formAddItem.product_name" label="Name"></q-input>
             <money-formatter required v-model="add_item_helper" label="Amount"/>
            <q-input min="0" required v-model="formAddItem.quantity" label="Quantity"></q-input>
            <q-input v-model="formAddItem.note" label="Description" type="textarea"></q-input>
            <div class="q-mt-md q-gutter-x-sm">
              <q-btn label="Submit" type="submit" color="primary" unelevated></q-btn>
              <q-btn label="Cancel"  color="primary" outline v-close-popup></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
