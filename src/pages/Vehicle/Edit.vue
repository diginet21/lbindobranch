
<script setup>
import { reactive, ref, computed, onMounted, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const options = computed(() => store.getters['vehicle/getAllOptions'])
const vehicle_master = computed(() => store.state.vehicle.vehicle_master)
const masterOptions = ref([])
const vehicle = ref(null);

onBeforeMount(() => {
  if(!vehicle_master.value.length) {
    store.dispatch('vehicle/getAll')
  }
  getData()
})
const form = reactive({
  id: '',
  _method: 'PUT',
  vehicle_id: '',
  sell_price: '',
  dp_type: '',
  dp_amount: ''
})

const getData = () => {
  store.dispatch('vehicle/getById', route.params.id).then(response => {
    if(response.status == 200) {
      
      let data = response.data.data
      vehicle.value = data

      form.id = data.id
      form.vehicle_id = data.vehicle_id
      form.dp_type = data.dp_type
      form.sell_price = data.sell_price
      form.dp_amount = data.dp_amount

      let item = { value: data.vehicle_id, label: data.vehicle.title + ' ' + toMoney(data.vehicle.price) }
      masterOptions.value = [...options.value]
      masterOptions.value.push(item)

    }
  })
}
const loading = computed(() => store.state.loading)
const toMoney = (numb) => {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const submit = () => {
  store.dispatch('vehicle/update', form)
}
const dpType = ['Percent', 'Amount']
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Edit New Vehicle</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Vehicles" />
        <q-breadcrumbs-el label="New" />
      </q-breadcrumbs>
    </div>
    <q-form @submit.prevent="submit">
      <div class="row form-container">
        <div class="col q-pa-sm">
          <div class="card-box">
            <div class="q-gutter-y-md">
              <q-select outlined required label="Select Vehicle" v-model="form.vehicle_id" :options="masterOptions" map-options emit-value>
                 <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
                <money-formatter outlined v-model="form.sell_price" />
              <div class="row q-gutter-sm">
                <div class="col">
                  <q-select outlined required label="Down Payment Type" v-model="form.dp_type" :options="dpType" map-options emit-value></q-select>
                </div>
                 <div class="col">
                  <money-formatter outlined required v-if="form.dp_type == 'Amount'" v-model="form.dp_amount" label="Down Payment Amount"/>
                  <q-input v-else outlined required v-model="form.dp_amount" label="Down Payment Amount" mask="###"></q-input>
                </div>
              </div>
            </div>

            <div class="submit-block">
              <q-btn padding="6px 24px" :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
              <q-btn padding="6px 24px" :disable="loading" label="Cancel" class="bg-white" color="primary" outline to="/vehicles"></q-btn>
            </div>
          </div>

        </div>
      </div>
    </q-form>
  </q-page>
</template>