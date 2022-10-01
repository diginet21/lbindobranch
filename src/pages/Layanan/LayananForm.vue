<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const loading = computed(() => store.state.loading)
const masterOptions = computed(() => store.getters['layanan/getMasterOptions'])

const main_data = computed(() => store.state.layanan.main_data)
const master_data = computed(() => store.state.layanan.master_data)

onMounted(() => {
  if(!main_data.value.data.length) {
    store.dispatch('layanan/getIndex');
  }
  if(!master_data.value.length) {
    store.dispatch('layanan/getMaster');
  }
})

const form = reactive({
  layanan_id: '',
  sell_price: '',
})

const submit = () => {
  store.dispatch('layanan/store', form)
}

const selectProduct = (val) => {
  let p = master_data.value.find(h => h.id == val)

  if(p) {
    form.sell_price = p.price
  }
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Add Services</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Parts" />
        <q-breadcrumbs-el label="New" />
      </q-breadcrumbs>
    </div>
    <q-form @submit.prevent="submit">
      <div class="row form-container">
        <div class="col q-pa-sm">
          <div class="card-box block-container">
            <div class="q-gutter-y-md">
              <q-select filled v-model="form.layanan_id" :options="masterOptions" label="Select Services" map-options emit-value @update:modelValue="selectProduct">
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
            <q-btn :disable="loading" label="Cancel" color="primary" outline :to="{ name: 'LayananIndex' }"></q-btn>
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