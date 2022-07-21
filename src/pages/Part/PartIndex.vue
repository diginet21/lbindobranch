<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

const main_data = computed(() => store.state.part.main_data)
const partsMaster = computed(() => store.state.part.parts_master)

onMounted(() => {
  if(!main_data.value.data.length) {
    store.dispatch('part/getIndex');
  }
  if(!partsMaster.value.length) {
    store.dispatch('part/getAll');
  }
})

const deleteItem = (item) => {
 Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
    store.dispatch('part/destroy', item.id)
  })

}
const loading = computed(() => store.state.loading)

const paginateData = () => {
  store.dispatch('part/paginateData', { take: main_data.value.limit, skip: main_data.value.data.length})
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Spareparts</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{ name: 'PartCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Spareparts</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Spareparts" />
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
            <th>Action</th>
          </tr>
          </thead>
          <tbody v-if="main_data.ready">
            <tr v-for="(part, ind) in main_data.data" :key="part.id">
              <td>{{ ind+1 }}</td>
              <td>
                <q-img v-if="part.assets.length" :src="part.assets[0].src" :ratio="1" width="60px" fit="contain"></q-img>
              </td>
              <td>{{ part.title }}</td>
              <td>{{ $moneyIdr(part.default_price) }}</td>
              <td>{{ $moneyIdr(part.sell_price) }}</td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(part)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'PartEdit', params: { id: part.id }}"></q-btn>
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
      <div class="text-center q-py-md" v-if="!main_data.ready">
          <q-spinner-facebook size="2em"></q-spinner-facebook>
        </div>
    </div>
    <div class="q-pa-md text-center" v-if="main_data.count > main_data.data.length">
      <q-btn :loading="loading" label="Loadmore.." outline size="md" color="primary" no-caps @click="paginateData"></q-btn>
    </div>
  </q-page>
</template>
