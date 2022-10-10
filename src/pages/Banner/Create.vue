<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const form = reactive({
  title: '',
  image: '',
  is_external_url: false,
  url_path: '',
  banner_type: 'Front'
})

const loading = computed(() => store.state.loading)

const submit = () => {
    store.dispatch('banner/storeBanner', form)
  }

const imagePreview = ref('')

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
        <div class="title">Add Banner</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Banner" />
        <q-breadcrumbs-el label="New" />
      </q-breadcrumbs>
      </div>
    <q-form @submit.prevent="submit">

        <div class="card-box card-lg">
            <q-input required outlined v-model="form.title" label="Label"></q-input>

            <div class="q-mt-md">
              <q-input outlined v-model="form.url_path" label="Path / Url"></q-input>
              <div class="text-xs text-grey-7 q-pa-xs">Gunakan absolute url jika eksternal link. eg: "https://google.com" </div>

            </div>

            <div class="q-mt-md">
              <q-select class="q-mb-md" outlined v-model="form.banner_type" label="Banner Type" :options="bannerTypeOptions"></q-select>
              <div>
                <div class="flex justify-between q-mb-sm">
                  <div class="text-label">Banner</div>
                  <q-btn v-if="imagePreview" no-caps label="Ganti Banner" @click.prevent="handleUploadImageBtn" unelevated color="primary"  size="12px"></q-btn>
                </div>
                <input id="inputFile" type="file" @input="handleImageFile" class="hidden">
                <div class="bg-grey-2">
                  <img v-if="imagePreview" :src="imagePreview" class="img-preview" />
                  <div v-else  class="flex justify-center items-center" style="min-height:160px;">
                    <div class="text-center cursor-pointer" @click.prevent="handleUploadImageBtn">
                      <q-icon name="upload" size="lg" color="grey-6"></q-icon>
                      <div class="text-grey-7 cursor-pointer">Upload Image</div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="submit-block">
                <q-btn :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
                <q-btn :disable="loading" label="Cancel" color="primary" outline :to="{ name: 'BannerIndex' }"></q-btn>
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
