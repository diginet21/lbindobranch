<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const part = ref(null)

const loading = computed(() => store.state.loading)

onMounted(() => {
  store.dispatch('part/getPartById', route.params.part)
  .then((response) => {
    // console.log( response.data.data);
    part.value = response.data.data
    setData()
  })
})

const partAllOptions = computed(() => store.getters['part/getAllPartOptions'])

onMounted(() => {
   if(partAllOptions.value.length < 2) {
    store.dispatch('part/getAll')
  }
})

const form = reactive({
  id: '',
  _method: 'PUT',
  sparepart_id: '',
  sell_price: 0,
})

const setData = () => {
  form.id = part.value.id
  form.sparepart_id = part.value.sparepart_id
  form.sell_price = part.value.sell_price
}


const submit = () => {
    store.dispatch('part/partUpdate', form)

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
const removeOldImage = (img) => {
  oldImages.value = oldImages.value.filter(im => im.id != img.id)
  form.delete_images.push(img.path)
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
        </div>>
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