
<script setup>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

import { Dialog } from 'quasar'

const store = useStore()

// store.commit('SET_DRAWER', true)

const main_data = computed(() => store.state.vehicle.main_data)
const vehicle_master = computed(() => store.state.vehicle.vehicle_master)

onBeforeMount(() => {
  if(!main_data.value.data.length) {
    store.dispatch('vehicle/getIndex')
  }
  if(!vehicle_master.value.length) {
    store.dispatch('vehicle/getAll')
  }
})

const deleteItem = (item) => {
  Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
   store.dispatch('vehicle/destroy', item.id)
  })
}

const loading = computed(() => store.state.loading)

const paginateData = () => {
  store.dispatch('vehicle/paginateData', { take: main_data.value.limit, skip: main_data.value.data.length})
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Vehicles</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps to="/vehicle/add">
          <q-icon name="add"></q-icon>
          <span>New Vehicle</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Vehicle" />
      </q-breadcrumbs>
    </div>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
           <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Default Price</th>
            <th>Sell Price</th>
            <th>Booking Fee</th>
            <th align="right">Action</th>
          </tr>
          </thead>
          <tbody v-if="main_data.ready">
            <tr v-for="(item, ind) in main_data.data" :key="ind">
              <td>{{ ind+1 }}</td>
              <td>
                <q-img v-if="item.assets.length" :src="item.assets[0].src" :ratio="1" width="60px" fit="contain"></q-img>
              </td>
              <td>{{ item.title }}</td>
              <td>{{ $moneyIdr(item.default_price) }}</td>
              <td>{{ $moneyIdr(item.sell_price) }}</td>
              <td>
                <div>{{ item.booking_type == 'Percent' ? item.booking_amount +'%' : $moneyIdr(item.booking_amount) }}</div>
              </td>
              <td align="right">
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(item)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'VehicleEdit', params: { id: item.id }}"></q-btn>
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
    </div>
    <div class="text-center q-py-md" v-if="!main_data.ready">
      <q-spinner-facebook size="2em"></q-spinner-facebook>
    </div>
     <div class="q-pa-md text-center" v-if="main_data.count > main_data.data.length">
        <q-btn :loading="loading" label="Loadmore.." outline size="md" color="primary" no-caps @click="paginateData"></q-btn>
      </div>
  </q-page>
</template>