<script setup>

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

import MenuConfig from './MenuConfigTabs.vue'

const store = useStore()

const pointSettings = computed(() => store.state.pointSetting.point_settings)

onMounted(() => store.dispatch('pointSetting/getAll'))

const deleteItem = (item) => {
  Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
    store.dispatch('pointSetting/destroy',item.id)
  })
}
let rulesOptions = [
  { label: 'Once', value: 'once'},
  { label: 'Daily', value: 'daily'},
  { label: 'Weekly', value: 'weekly'}, 
  { label: 'Monthly', value: 'monthly'}, 
  { label: 'Every Time', value: 'every'}
]
const findRulelabel = (rule) => {
  if(!rule) return ''
  return rulesOptions.find(e => e.value == rule).label
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
       <div class="row items-end q-gutter-x-md">
        <div class="title">Point Settings</div>
        <q-btn unelevated color="primary" no-caps :to="{name: 'PointConfigCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Rule</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Point Settings" />
      </q-breadcrumbs>
    </div>
    <div class="q-py-md">
      <MenuConfig />
    </div>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Label</th>
              <th>Bonus Point</th>
              <th>Rules</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in pointSettings.data" :key="i">
              <td>{{ i+1 }}</td>
              <td>{{ item.label }}</td>
              <td>{{ item.value_type == 'Percent' ? item.value +'%' : $money(item.value) }}</td>
              <td>
                <div>{{ findRulelabel(item.rule) }}</div>
              </td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(item)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'PointConfigEdit', params: { id: item.id } }"></q-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
         <div v-if="!pointSettings.available" class="text-center full-width q-py-lg bg-grey-1">No data found</div>
      </div>
    </div>
  </q-page>
</template>