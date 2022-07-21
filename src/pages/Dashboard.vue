
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
          <q-list separator>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold">Detail</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">Type</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-bold">Status</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>Created</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-for="item in currentOrder" :key="item.id">
              <!-- {{ item }} -->
              <q-item-section>
                <q-item-label>{{ item.invoice_id }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <div class="text-uppercase">{{ item.order_type.split('_')[0] }}</div>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ item.order_status }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>{{ item.created_at }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
           <div class="q-py-lg text-center" v-if="!orders.available">
            Tidak ada data
          </div>
        </q-card-section>
      </q-card>

      <q-card class="box-shadow q-mt-lg">
        <q-card-section>
          <div class="card-title">
            <h3>Recent Leads</h3>
          </div>
           <q-list separator>
            <q-item v-for="item in currentLeads" :key="item.id">
              <q-item-section>
                <q-item-label>{{ item }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label>{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <div class="q-py-lg text-center" v-if="!leads.available">
            Tidak ada data
          </div>
        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>
