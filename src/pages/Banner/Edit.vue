<script setup>
import { computed, reactive, onMounted, ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const categoryOptions = computed(() => store.getters['postCategory/getPostCategoryOptions'])

const banner = ref(null)

const form = reactive({
  id: null,
  title: '',
  image: '',
  is_external_url: false,
  url_path: '',
  banner_type: ''
})

const imagePreview = ref('')

onBeforeMount(() => {
  if(route.params.id) {
    getDataById(route.params.id) 
  }

})

const getDataById = (id) => {
 store.dispatch('banner/getBannerById', id).then((response) => {

   let data = response.data.data

   console.log(data);

   banner.value = data

   form.id = data.id
   form.title = data.title
   form.banner_type = data.banner_type
   form.is_external_url = data.is_external_url
   form.url_path = data.url_path
   
   imagePreview.value = data.asset.src
 })
}

onMounted(() => {
  if(!categoryOptions.value.length) {
    store.dispatch('postCategory/getPostCategories')
  }
})

const loading = computed(() => store.state.loading)

console.log(loading);

const submit = () => {
  store.dispatch('banner/updateBanner', form)
}

const handleImageFile = (evt) => {
  let file = evt.target.files[0]

  if(!file) return

  form.image = file

  const reader = new FileReader()

  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }

  reader.readAsDataURL(file)


}

const handleUploadImageBtn = () => {
  document.getElementById('inputFile').click()
}

const bannerTypeOptions = ['Front', 'Post'];

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Edit Banner</div>
        </div>
        <q-breadcrumbs class="text-grey" active-color="secondary">
          <q-breadcrumbs-el label="Dashboard"/>
          <q-breadcrumbs-el label="Banner" />
          <q-breadcrumbs-el label="Edit" />
        </q-breadcrumbs>
      </div>
    <q-form @submit.prevent="submit">

        <div class="card-box card-lg">
            <q-input outlined v-model="form.title" label="Label"></q-input>

            <div class="q-mt-md">

              <div class="flex justify-between">
                <q-checkbox v-model="form.is_external_url" label="External Link?"></q-checkbox>
              </div>
              <q-input outlined v-model="form.url_path" label="Path / Url"></q-input>
              <div class="text-xs text-grey-7">Gunakan absolute url jika eksternal link. eg: "https://google.com" </div>

            </div>

            <div class="q-mt-md">
                <q-select class="q-mb-md" outlined v-model="form.banner_type" label="Banner Type" :options="bannerTypeOptions"></q-select>
              <div class="q-mt-md">

                <div class="flex justify-between q-mb-md">
                  <div class="text-md">Banner</div>
                  <q-btn label="Upload Image" @click.prevent="handleUploadImageBtn" unelevated color="primary"  size="12px"></q-btn>
                </div>
                <input id="inputFile" type="file" @input="handleImageFile" class="hidden">
                <div class="bg-grey-2" style="min-height:160px;">
                  <img v-if="imagePreview" :src="imagePreview" class="img-preview" />
                  <div v-else  class="flex justify-center items-center">
                    <div class="text-center cursor-pointer" @click.prevent="handleUploadImageBtn">
                      <q-icon name="upload" size="lg" color="grey-6"></q-icon>
                      <div class="text-grey-7 cursor-pointer">Upload Image</div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="flex justify-end q-mt-md q-gutter-md">
                <q-btn :disable="loading" label="Cancel" color="primary" flat :to="{ name: 'BannerIndex' }"></q-btn>
                <q-btn :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
              </div>
          </div>
        </div>

    </q-form>
  </q-page>
</template>

<style scoped>
.img-preview {
  width: 100%;
  height:auto;
}
</style>>