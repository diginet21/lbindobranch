
<script setup>
  import { computed, onBeforeMount } from 'vue'
  import { useStore } from 'vuex'
  import { copyToClipboard, Notify } from 'quasar'

  const store = useStore()

  store.dispatch('lead/getNewLeadCount')

  const branch = computed(() => store.state.branch)

  const leads = computed(() => store.state.lead.main_data)
  const orders = computed(() => store.state.order.main_data)

  const currentOrder = computed(() => {
    if(orders.value.data.length) {
      let items = [...orders.value.data]
      return items.splice(0,5)
    }
    return []
  })
  const currentLeads = computed(() => {
    if(leads.value.data.length) {
      let items = [...leads.value.data]
      return items.splice(0,5)
    }
    return []
  })

 onBeforeMount(() => {
   if(!leads.value.length) {
      store.dispatch('lead/getAll')
    }
   if(!orders.value.length) {
      store.dispatch('order/getOrders')
    }
 })

  const branchLink = computed({
    get() {
      let main_url = branch.value.main_url
      if(branch.value) {
        main_url += `?branch=${branch.value.slug}`
      }
  
      return main_url;
    },
    set(val) {
      console.log(val);
    }
  })
  const callbackUrl = computed({
    get() {
      let main_url = branch.value.main_url
      if(branch.value) {
        main_url += `/api/tripay/callback?bid=${branch.value.id}`
      }
  
      return main_url;
    },
    set(val) {
      console.log(val);
    }
  })
  const copyUrl = (url) => {
    copyToClipboard(url).then(() => {
      Notify.create({
        type: 'positive',
        message: 'Berhasil menyalin alamat url',
        timeout: 700
      })
    })
  }
</script>
<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="title">Dashboard</div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Home" />
      </q-breadcrumbs>
    </div>
    <div class="q-my-md">
      
      <div class="row q-gutter-md">
        <div class="col">
          <q-card class="box-shadow border-bottom primary">
            <q-card-section class="q-py-xl text-center">
             <div class="text-xl text-weight-bold">{{ leads.total }}</div>
             <div>Leads</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card class="box-shadow border-bottom positive">
            <q-card-section class="q-py-xl text-center">
             <div class="text-xl text-weight-bold">{{ orders.total }}</div>
             <div>Order</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card class="box-shadow q-mt-lg">
        <q-card-section>
          <div class="card-title">
            <h3>Branch Url</h3>
          </div>
          <q-input readonly v-model="branchLink" outlined>
            <template v-slot:prepend>
              <q-btn icon="content_copy" flat dense @click="copyUrl(branchLink)"></q-btn>
            </template>
          </q-input>
        </q-card-section>
      </q-card>
      <q-card class="box-shadow q-mt-lg">
        <q-card-section>
          <div class="card-title">
            <h3>Tripay Callback Url</h3>
          </div>
          <q-input readonly v-model="callbackUrl" outlined>
            <template v-slot:prepend>
              <q-btn icon="content_copy" flat dense @click="copyUrl(callbackUrl)"></q-btn>
            </template>
          </q-input>
        </q-card-section>
      </q-card>

      <q-card class="box-shadow q-mt-lg">
        <q-card-section>
          <div class="card-title">
            <h3>Recent Orders</h3>
          </div>
           <div class="table-responsive">
            <table class="table striped">
              <thead>
              <tr>
                <th>#Invoice</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody v-if="currentOrder.length">
                <tr v-for="(item, index) in currentOrder" :key="index">
                  <td>
                    <div>{{ item.invoice_id }}</div>
                    <div class="text-grey-8"> {{ item.created_at }}</div>
                  </td>
                  <td>
                    <div>{{ item.customer_name }}</div>
                    <div>{{ item.customer_phone }}</div>
                  </td>
                  <td>{{ $moneyIdr(item.order_total) }}</td>
                  <td>
                    <div class="text-uppercase">{{ item.order_type.split('_')[0] }}</div>
                  </td>
                  <td>{{ item.order_status }}</td>
                </tr>
                <tr v-if="!orders.available">
                  <td colspan="6" >
                    <div class="text-center q-pa-xs">No data found</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </q-card-section>
      </q-card>

      <q-card class="box-shadow q-mt-lg">
        <q-card-section>
          <div class="card-title">
            <h3>Recent Leads</h3>
          </div>
           <div class="table-responsive">
            <table class="table striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, ind) in currentLeads" :key="item.id">
                  <td>{{ ind+1 }}</td>
                  <td>{{ item.customer_name }}</td>
                  <td>{{ item.customer_phone }}</td>
                  <td>{{ item.lead_type }}</td> 
                  <td>
                    <q-badge color="teal">{{ item.status? item.status.label : 'New' }}</q-badge>
                  </td>
                  <td>
                    <div class="q-gutter-sm">
                      <!-- <q-btn round icon="view_list" size="sm" color="blue" unelevated @click="selectLead(item)"></q-btn> -->
                      <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'LeadEdit', params: { id: item.id } }"></q-btn>
                    </div>
                  </td>
                </tr>
                <tr v-if="!leads.available">
                  <td colspan="6" >
                    <div class="text-center q-pa-xs">No data found</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>
