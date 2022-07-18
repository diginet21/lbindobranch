<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { Loading, Notify } from 'quasar'

import MenuConfig from './MenuConfigTabs.vue'

const store = useStore()

const loading = computed(() => store.state.loading)
const config = computed(() => store.state.config.paygate_config)
const branch = computed(() => store.state.branch)

onBeforeMount(() => {
  getData()
})

const getData = () => {
  store.dispatch('config/getPaygate', branch.value.id).then(response => {
    store.commit('config/SET_PAYGATE', response.data.data)

    setData(response.data.data)
  })
}
const form = reactive({
  id: '',
  branch_id: '',
  provider: '',
  endpoint:'',
  endpoint_sanbox: '',
  api_key: '',
  private_key: '',
  merchant_id: '',
  mode: '',
})

const setData = (data) => {
  form.id = data.id
  form.branch_id = data.branch_id
  form.provider = data.provider
  form.endpoint = data.endpoint
  form.endpoint_sanbox = data.endpoint_sanbox
  form.mode = data.mode
  form.api_key = data.api_key ? data.api_key : ''
  form.private_key = data.private_key ? data.private_key : ''
  form.merchant_id = data.merchant_id ? data.merchant_id : ''
}

const modeOptions = ['sanbox', 'producttion']

const updatedata = () => {
  Loading.show()
  store.dispatch('config/storePaygate', form).then(response => {
    Notify.create({
      type: 'positive',
      message: 'Berhasil memperbarui data'
    })
      store.commit('config/SET_PAYGATE', response.data.data)
      setData(response.data.data)
    })
    .finally(() => {
      Loading.hide()
    })
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Payment Gateway</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Payment Gateway" />
      </q-breadcrumbs>
    </div>
    <div class="q-py-md">
       <MenuConfig />
    </div>
    <div>
      <q-form @submit.prevent="updatedata">
        <div class="row">
          <div class="col q-pa-xs">
            <div class="card-box q-gutter-y-md">
              <q-input required readonly filled v-model="form.provider" label="Provider"></q-input>
              <q-select :options="modeOptions" required filled v-model="form.mode" label="Mode"></q-select>
              <q-input required filled v-model="form.endpoint" label="Endpoint"></q-input>
              <q-input required filled v-model="form.endpoint_sanbox" label="Endpoint Sanbox"></q-input>
              <q-input required filled v-model="form.api_key" label="Api Key"></q-input>
              <q-input required filled v-model="form.private_key" label="Private Key"></q-input>
              <q-input required filled v-model="form.merchant_id" label="Merchant ID"></q-input>
            </div>
          </div>
        </div>
        <q-footer class="q-pa-md bg-white">
          <div class="flex justify-end">
            <q-btn :loading="loading" label="Update Data" type="submit" color="primary" unelevated></q-btn>
          </div>
        </q-footer>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped>
.img-preview {
  width:100%;
  height:auto;
}
.icon-preview {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>

