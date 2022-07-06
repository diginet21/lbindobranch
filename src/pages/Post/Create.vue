<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const categoryOptions = computed(() => store.getters['post/getCategoryOptions'])

onMounted(() => {
  if(categoryOptions.value.length < 2) {
    store.dispatch('post/getPostCategories')
  }
})

const loading = computed(() => store.state.loading)

const deleteItem = (id) => {
  console.log(id);
}

const form = reactive({
  title: '',
  summary: '',
  body: '',
  meta_title: '',
  category_id: '',
  meta_keyword: '',
  meta_description: '',
  image: ''
})

// store.commit('SET_DRAWER', false)

const submit = () => {
    store.dispatch('post/postStore', form)

  }

const imagePreview = ref('')

const handleInputImage = (evt) => {
  let file = evt.target.files[0]

  if(!file) return

  form.image = file


  const reader = new FileReader()

  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }

  reader.readAsDataURL(file)


}

const handleUploadImage = () => {
  document.getElementById('inputFile').click()
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Add Prio Weekly</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Prioweekly" />
        <q-breadcrumbs-el label="New" />
      </q-breadcrumbs>
    </div>
    <q-form @submit.prevent="submit">
      <div class="row form-container">
        <div class="col q-pa-sm">
          <div class="card-box block-container">
            <div class="q-gutter-y-md">
              <q-input outlined v-model="form.title" label="Title"></q-input>
              <q-select outlined v-model="form.category_id" :options="categoryOptions" label="Category" emit-value map-options></q-select>
              <div>
                <div class="q-mt-md">
                  <div class="input-label">Content</div>
                </div>
                <q-editor v-model="form.body" min-height="26em"></q-editor>
              </div>
            </div>
          <div class="submit-block">
            <q-btn :disable="loading" label="Back" color="primary" flat :to="{ name: 'PostIndex' }"></q-btn>
            <q-btn :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
          </div>
        </div>
        </div>
        <div class="q-pa-sm card-sm">

            <div class="card-box">
            <div class="flex justify-between q-mb-md">
              <div class="text-md">Feature Image</div>
              <q-btn v-if="imagePreview" size="10px" unelevated color="primary" no-caps @click="handleUploadImage">
                <q-icon name="upload"></q-icon>
                <span>Edit Image</span>
              </q-btn>
            </div>
             <input id="inputFile" type="file" @input="handleInputImage" class="hidden">
            <div class="bg-grey-2 flex justify-center items-center" style="min-height:150px;">
              <img v-if="imagePreview" :src="imagePreview" class="img-preview" />
              <div class="text-center cursor-pointer" v-else  @click.prevent="handleUploadImage">
                <q-icon name="upload" size="lg" color="grey-6"></q-icon>
               <div class="text-grey-7 cursor-pointer">Upload Image</div>
              </div>
            </div>
          </div>

          <div class="card-box" style="">
            <div class="q-gutter-y-md">
              <div class="text-md">Metatags</div>
              <q-input outlined v-model="form.meta_title" label="Meta Title"></q-input>
              <q-input outlined v-model="form.meta_keyword" label="Meta Keyword"></q-input>
              <q-input type="textarea" outlined v-model="form.meta_description" label="Meta Description"></q-input>
            </div>
          </div>
         
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<style>
.img-preview {
  width: 100%;
  height:auto;
}
</style>