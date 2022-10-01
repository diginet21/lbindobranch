<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const part = ref(null)

const loading = computed(() => store.state.loading)

onMounted(() => {
  getData()
})

const options = computed(() => store.getters['part/getAllPartOptions'])

const main_data = computed(() => store.state.part.main_data)
const partsMaster = computed(() => store.state.part.parts_master)
const masterOptions = ref([])


onMounted(() => {
  if(!main_data.value.data.length) {
    store.dispatch('part/getIndex');
  }
  if(!partsMaster.value.length) {
    store.dispatch('part/getAll');
  }
})

const form = reactive({
  id: '',
  _method: 'PUT',
  sparepart_id: '',
  sell_price: 0,
})


const getData = () => {
  store.dispatch('part/getPartById', route.params.id)
  .then((response) => {
    let data = response.data.data
    part.value = data

    form.id = data.id
    form.sparepart_id = data.sparepart_id
    form.sell_price = data.sell_price

    let item = { value: data.sparepart_id, label: data.sparepart.title + ' ' + toMoney(data.sparepart.price) }
    masterOptions.value = [...options.value]
    masterOptions.value.push(item)
  })
}
const toMoney = (numb) => {
  return 'Rp '+ numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const submit = () => {
  store.dispatch('part/partUpdate', form)
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Edit Spareparts</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Spareparts" />
        <q-breadcrumbs-el label="New" />
      </q-breadcrumbs>
    </div>
    <q-form @submit.prevent="submit">
      <div class="row form-container">
        <div class="col q-pa-sm">
          <div class="card-box block-container">
            <div class="q-gutter-y-md">
              <q-select filled v-model="form.sparepart_id" :options="masterOptions" label="Select Sparepart" map-options emit-value>
                 <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
              <money-formatter filled v-model="form.sell_price" label="Sell Price"/>
            </div>
          <div class="submit-block">
            <q-btn :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
            <q-btn :disable="loading" label="Cancel" color="primary" outline :to="{ name: 'PartIndex' }"></q-btn>
          </div>
        </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>


<style>
.img-preview-grid {
  max-width: 120px;
  width: 100%;
  height:auto;
}
</style>