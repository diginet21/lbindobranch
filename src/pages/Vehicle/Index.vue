
<script setup>
import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

import { Dialog } from 'quasar'

const store = useStore()

// store.commit('SET_DRAWER', true)

const vehicles = computed(() => store.state.vehicle.vehicles)
const vehicle_master = computed(() => store.state.vehicle.vehicle_master)

onBeforeMount(() => {
  if(!vehicles.value.length) {
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

const toMoney = (numb) => {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Kendaraan</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps to="/vehicle/add">
          <q-icon name="add"></q-icon>
          <span>New Vehicle</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Kendaraan" />
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
            <td>Down Payment</td>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, ind) in vehicles" :key="ind">
              <td>{{ ind+1 }}</td>
              <td>
                <q-img v-if="item.assets.length" :src="item.assets[0].src" :ratio="1" width="60px" fit="contain"></q-img>
              </td>
              <td>{{ item.title }}</td>
              <td>{{ toMoney(item.default_price) }}</td>
              <td>{{ toMoney(item.sell_price) }}</td>
              <td>
                <div>Type : {{ item.dp_type }}</div>
                <div>Value : {{ item.dp_type == 'Percent' ? item.dp_amount +'%' : toMoney(item.dp_amount) }}</div>
              </td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(item)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'VehicleEdit', params: { id: item.id }}"></q-btn>
                </div>
              </td>
            </tr>
             <tr v-if="!vehicles.length">
              <td colspan="6" >
                <div class="text-center q-pa-xs">No data found</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-page>
</template>