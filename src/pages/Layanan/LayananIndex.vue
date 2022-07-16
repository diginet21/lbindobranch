<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

const main_data = computed(() => store.state.layanan.main_data)
const master_data = computed(() => store.state.layanan.master_data)

onMounted(() => {
  if(!main_data.value.data.length) {
    store.dispatch('layanan/getIndex');
  }
  if(!master_data.value.length) {
    store.dispatch('layanan/getMaster');
  }
})

const toMoney = (numb) => {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const deleteItem = (item) => {
 Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
    store.dispatch('layanan/destroy', item.id)
  })

}
const loading = computed(() => store.state.loading)

const paginateData = () => {
  store.dispatch('layanan/paginateData', { take: main_data.value.limit, skip: main_data.value.data.length})
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Services</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{ name: 'LayananCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Services</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Services" />
      </q-breadcrumbs>
    </div>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
           <tr>
            <th>#</th>
            <th>Title</th>
            <th>Default Price</th>
            <th>Sell Price</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody v-if="main_data.ready">
            <tr v-for="(item, ind) in main_data.data" :key="ind">
              <td>{{ ind+1 }}</td>
              <td>{{ item.title }}</td>
              <td>{{ toMoney(item.default_price) }}</td>
              <td>{{ toMoney(item.sell_price) }}</td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(item)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'LayananEdit', params: { id: item.id }}"></q-btn>
                </div>
              </td>
            </tr>
            <tr v-if="!main_data.available">
              <td colspan="6" >
                <div class="text-center q-pa-xs">No data found</div></td>
            </tr>
          </tbody>
        </table>
        <div class="text-center q-py-md" v-if="!main_data.ready">
          <q-spinner-facebook size="2em"></q-spinner-facebook>
        </div>
      </div>
    </div>
    <div class="q-pa-md text-center" v-if="main_data.count > main_data.data.length">
      <q-btn :loading="loading" label="Loadmore.." outline size="md" color="primary" no-caps @click="paginateData"></q-btn>
    </div>
  </q-page>
</template>
