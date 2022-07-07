<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
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

const form = reactive({
  sparepart_id: '',
  sell_price: 0,
})

// store.commit('SET_DRAWER', false)

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

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Add Spareparts</div>
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
              <q-select outlined v-model="form.sparepart_id" :options="partAllOptions" label="Pilih Sparepart" map-options emit-value></q-select>
              <q-input mask="###########" outlined v-model="form.sell_price" label="Sell Price" prefix="Rp"></q-input>

            </div>
          <div class="submit-block">
            <q-btn :disable="loading" label="Cancel" color="primary" flat :to="{ name: 'PartIndex' }"></q-btn>
            <q-btn :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
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