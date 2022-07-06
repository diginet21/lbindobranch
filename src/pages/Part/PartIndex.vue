<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

// store.commit('SET_DRAWER', true)

const parts = computed(() => store.state.part.parts)
const partsAll = computed(() => store.state.part.parts_all)

onMounted(() => {
  if(!parts.value.length) {
    store.dispatch('part/getParts');
  }
  if(!partsAll.value.length) {
    store.dispatch('part/getAll');
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
    store.dispatch('part/destroy', item.id)
  })

}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Parts</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{ name: 'PartCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Parts</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Parts" />
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
          <tbody>
            <tr v-for="(part, ind) in parts" :key="part.id">
              <td>{{ ind+1 }}</td>
              <td>
                <q-img v-if="part.assets.length" :src="part.assets[0].src" :ratio="1" width="60px" fit="contain"></q-img>
              </td>
              <td>{{ part.title }}</td>
              <td>{{ toMoney(part.default_price) }}</td>
              <td>{{ toMoney(part.sell_price) }}</td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(part)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'PartEdit', params: { part: part.id }}"></q-btn>
                </div>
              </td>
            </tr>
             <tr v-if="!parts.length">
              <td colspan="6" >
                <div class="text-center q-pa-xs">No data found</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-page>
</template>
