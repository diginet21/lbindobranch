
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
      <div class="row form-container">
        <div class="col q-pa-sm">
          <div class="card-box">
            <div class="q-gutter-y-md">
                <q-select filled required label="Select Vehicle" v-model="form.vehicle_id" :options="options" map-options emit-value></q-select>
                 <money-formatter v-model="form.sell_price" />
              <div class="row q-gutter-sm">
                <div class="col">
                  <q-select filled required label="Down Payment Type" v-model="form.dp_type" :options="dpType" map-options emit-value></q-select>
                </div>
                <div class="col">
                  <money-formatter required v-if="form.dp_type == 'Amount'" v-model="form.dp_amount" label="Down Payment Amount"/>
                  <q-input v-else filled required v-model="form.dp_amount" label="Down Payment Amount" mask="###"></q-input>
                </div>
              </div>
              </div>
          </div>

        </div>
      </div>
      <q-footer class="flex q-px-lg q-py-md bg-grey-1 justify-end" dark reveal>
        <div class="q-gutter-x-md">
          <q-btn padding="6px 24px" :disable="loading" label="Cancel" class="bg-white" color="primary" outline to="/vehicles"></q-btn>
          <q-btn padding="6px 24px" :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
        </div>
      </q-footer>
    </q-form>
  </q-page>
</template>