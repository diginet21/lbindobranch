<script setup>

import { computed, onBeforeMount, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { Dialog, Notify } from 'quasar'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const loading = computed(() => store.state.loading)
const events = computed(() => store.state.pointSetting.events)
const pointSetting = ref(null)

onBeforeMount(() => {
  if(!events.value.length) {
    store.dispatch('pointSetting/getEvents')
  }
  if(route.name == 'PointConfigEdit') {
    store.dispatch('pointSetting/getById', route.params.id).then(response => {
      if(response.status == 200) {
        pointSetting.value = response.data.results
        setData()
      }
    })
  }
})
const setData = () => {
  form.id = pointSetting.value.id
  form.label = pointSetting.value.label
  form.rule = pointSetting.value.rule
  form.event = pointSetting.value.event
  form.value = pointSetting.value.value
  form.value_type = pointSetting.value.value_type
  form.description = pointSetting.value.description
  form._method = 'PUT'
}

const form = reactive({
  id: null,
  _method: 'POST',
  rule: '',
  label: '',
  event: '',
  value: '',
  value_type: 'Percent',
  description: '',

})

const typeOptions = computed(() => {
  if(form.event == 'register' || form.event == 'login' || form.event == 'share'){
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    form.value_type = 'Amount'
    return ['Amount']
  }
  return ['Percent', 'Amount']
});

const submit = () => {
  if(!form.rule) {
    Notify.create({
      type:'negative',
      message: 'Rules wajib diisi!'
    })
    return
  }
  if(route.name == 'PointConfigEdit') {
    store.dispatch('pointSetting/update', form)
  }else {
    store.dispatch('pointSetting/store', form)
  }
}

let rulesOptions = [
  { label: 'Once', value: 'once'},
  { label: 'Daily', value: 'daily'},
  { label: 'Weekly', value: 'weekly'}, 
  { label: 'Monthly', value: 'monthly'}, 
  { label: 'Every Time', value: 'every'}
]

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
       <div class="row items-center q-gutter-x-md">
        <div class="title">Point Settings</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Point Settings" />
      </q-breadcrumbs>
    </div>
    <div class="card-block card-xl">
      <q-form @submit.prevent="submit">
        <div class="q-gutter-y-md">
          <q-select filled required label="Select Event" v-model="form.event" :options="events" emit-value map-options></q-select>
          <q-select filled required label="Select Rules" v-model="form.rule" :options="rulesOptions" emit-value map-options></q-select>
          <q-input filled required label="Label" v-model="form.label"></q-input>
          <div class="row q-gutter-x-sm">
            <div class="col">
              <q-select filled required label="Type" v-model="form.value_type" :options="typeOptions"></q-select>
            </div>
            <div class="col">
              <q-input filled required label="Nominal" v-model="form.value" mask="############"></q-input>
            </div>
          </div>
          <q-input filled type="textarea" label="Description (optional)" v-model="form.description"></q-input>
        </div>
        <div class="q-mt-md flex justify-end q-gutter-x-sm">
          <q-btn :disable="loading" label="Cancel" :to="{ name: 'PointConfig'}" outline color="primary"></q-btn>
          <q-btn :loading="loading" label="Submit" type="submit" unelevated color="primary"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>