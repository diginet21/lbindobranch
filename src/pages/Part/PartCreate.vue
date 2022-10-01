<script setup>
import { computed, reactive, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const loading = computed(() => store.state.loading)
const partAllOptions = computed(() => store.getters['part/getAllPartOptions'])

const main_data = computed(() => store.state.part.main_data)
const partsMaster = computed(() => store.state.part.parts_master)

onMounted(() => {
  if(!main_data.value.data.length) {
    store.dispatch('part/getIndex');
  }
  if(!partsMaster.value.length) {
    store.dispatch('part/getAll');
  }
})

const deleteItem = (id) => {
  console.log(id);
}
const money = (numb) => {
  return numb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


const form = reactive({
  sparepart_id: '',
  sell_price: '',
})

const submit = () => {
  store.dispatch('part/partStore', form)
}

const imagePreview = ref([])


const handleInputImage = (evt) => {

  let files = evt.target.files

  Array.from(files).forEach(file => {

    form.images.push(file)

    const reader = new FileReader()
  
    reader.onload = (e) => {
      imagePreview.value.push(e.target.result)
    }
  
    reader.readAsDataURL(file)
  })

}

const handleUploadImage = () => {
  document.getElementById('inputFile').click()
}

const removeImage = (index) => {
  imagePreview.value.splice(index, 1)
  form.images.splice(index, 1)
}

const selectProduct = (val) => {
  let p = partsMaster.value.find(h => h.id == val)

  if(p) {
    form.sell_price = p.price
  }
}


</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Add Spareparts</div>
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
              <q-select filled v-model="form.sparepart_id" :options="partAllOptions" label="Select Sparepart" map-options emit-value @update:modelValue="selectProduct">
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
            <q-btn :disable="loading" outline label="Cancel" color="primary" :to="{ name: 'PartIndex' }"></q-btn>
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