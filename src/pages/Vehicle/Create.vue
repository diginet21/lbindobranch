
<script setup>
import { reactive, ref, computed, onMounted, onBeforeMount, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'

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
  booking_type: 'Amount',
  booking_amount: '',
  down_payments: [
    { dp_type: 'Amount', dp_amount: '' }
  ]
})

watch(() => form.booking_type, () => {
  form.booking_amount = ''
})

const loading = computed(() => store.state.loading)

const submit = () => {
  if(!form.vehicle_id) {
    Notify.create({
      type: 'negative',
      message: 'Produk tidak boleh kosong'
    })

    return
  }
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

const handleAddDp = () => {

  form.down_payments.push({ dp_type: 'Amount', dp_amount: '' })

}

const removeDp = (index) => {
  form.down_payments.splice(index, 1)
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
                 <money-formatter label="Sell Price" required outlined v-model="form.sell_price" />
              <div class="row q-gutter-sm">
                <div class="col">
                  <q-select outlined required label="Booking Fee Type" v-model="form.booking_type" :options="dpType" map-options emit-value></q-select>
                </div>
                <div class="col">
                  <money-formatter outlined required v-if="form.booking_type == 'Amount'" v-model="form.booking_amount" label="Booking Fee Amount"/>
                  <q-input v-else outlined required v-model="form.booking_amount" label="Booking Fee Amount" mask="##"></q-input>
                </div>
              </div>
              </div>
              <div class="q-mt-xl" style="min-height:200px;">
                <div class="flex justify-between items-center q-mb-md">
                  <div class="text-md">Down Payments</div>
                    <q-btn label="Add Down Payment Field" color="primary" size="12px" @click="handleAddDp"></q-btn>
                </div>
                <div>
                  <q-list>
                    <q-item v-for="(item, index) in form.down_payments" :key="index">
                      <q-item-section>
                        <q-select outlined required label="Down Payment Type" v-model="form.down_payments[index].dp_type" :options="dpType" map-options emit-value></q-select>
                      </q-item-section>
                      <q-item-section class="col">
                        <money-formatter v-if="form.down_payments[index].dp_type == 'Amount'" outlined required v-model="form.down_payments[index].dp_amount" label="Down Payment Amount"/>
                        <q-input v-else outlined required v-model="form.down_payments[index].dp_amount" label="Down Payment Amount" mask="##"></q-input>
                      </q-item-section>
                       <q-item-section side>
                        <q-btn v-if="form.down_payments.length > 1" icon="delete" round @click="removeDp(index)" color="red" unelevated size="sm"></q-btn>
                      </q-item-section>
                    </q-item>
                  </q-list>

                  <div class="text-center q-pt-lg" v-if="!form.down_payments.length">Tidak ada data</div>
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