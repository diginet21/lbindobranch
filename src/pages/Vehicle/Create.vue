
<script setup>
import { reactive, ref, computed, onMounted, onBeforeMount, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

// store.commit('SET_DRAWER', false)

const options = computed(() => store.getters['vehicle/getAllOptions'])
const vehicle_master = computed(() => store.state.vehicle.vehicle_master)

onBeforeMount(() => {

  if(!vehicle_master.value.length) {
    store.dispatch('vehicle/getAll')
  }
})
const form = reactive({
  sell_price: '',
  vehicle_id: '',
  dp_type: '',
  dp_amount: ''
})

watch(() => form.dp_type, () => {
  form.dp_amount = ''
})

const loading = computed(() => store.state.loading)

const submit = () => {
  store.dispatch('vehicle/store', form)
}

const dpType = ['Percent', 'Amount']

const pricing = ref('')

const selectProduct = (val) => {
  let p = vehicle_master.value.find(h => h.id == val)

  if(p) {
    form.sell_price = p.price
  }
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Add New Vehicle</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Vehicles" />
        <q-breadcrumbs-el label="New" />
      </q-breadcrumbs>
    </div>
    <q-form @submit.prevent="submit">
      <div class="form-container">
        <div class="col q-pa-sm">
          <div class="card-box">
            <div class="q-gutter-y-md">
                <q-select outlined required label="Select Vehicle" v-model="form.vehicle_id" :options="options" map-options emit-value @update:modelValue="selectProduct">
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
                  <money-formatter filled required v-if="form.dp_type == 'Amount'" v-model="form.dp_amount" label="Down Payment Amount"/>
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