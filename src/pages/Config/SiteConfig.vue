<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { Notify } from 'quasar'

import MenuConfig from './MenuConfigTabs.vue'

const store = useStore()

const loading = computed(() => store.state.loading)
const sites = computed(() => store.state.setting.site_config)

const form = reactive({
  sitename: '',
  slogan:'',
  phone: '',
  email: '',
  icon: '',
  fax: '',
  description: '',
  logo: '',
  social_media: '',
  address: ''
})

onBeforeMount(() => {
  if(sites.value) {
    setData(sites.value)
  }else {
    getData()
  }
})

const getData = () => {
  store.dispatch('setting/getSites').then(response => {
    store.commit('setting/SET_SETTING', response.data.results)

    setData(response.data.results)
  })
}
const logoPreview = ref('')
const iconPreview = ref('')

const setData = (data) => {
  form.sitename = data.sitename
  form.slogan = data.slogan ? data.slogan : ''
  form.phone = data.phone ? data.phone : ''
  form.address = data.address ? data.address : ''
  form.email = data.email ? data.email : ''
  form.description = data.description ? data.description : ''
  form.fax = data.fax ? data.fax  : ''
  form.social_media = data.social_media ? data.social_media  : ''

  logoPreview.value = data.logo ? data.logo_src : ''
  iconPreview.value = data.icon ? data.icon_src : ''
}

const handleUploadLogo = () => {
  document.getElementById('inputLogo').value = ''
  document.getElementById('inputLogo').click()
}
const handleUploadIcon = () => {
  document.getElementById('inputIcon').value = ''
  document.getElementById('inputIcon').click()
}

const updatedata = () => {
  store.commit('SET_LOADING', true)
  store.dispatch('setting/update', form).then(response => {
    Notify.create({
      type: 'positive',
      message: 'Berhasil memperbarui data'
    })
      store.commit('setting/SET_SETTING', response.data.results)
      setData(response.data.results)
    })
    .finally(() => {
      store.commit('SET_LOADING', false)
    })
}

const updateLogoPreview = (evt) => {
  let file = evt.target.files[0]

  if(!file) return
  form.logo = file

  const reader = new FileReader()

  reader.onload = (e) => {
    logoPreview.value = e.target.result
  }

  reader.readAsDataURL(file)

}
const updateIconPreview = (evt) => {
  let file = evt.target.files[0]

  if(!file) return
  form.icon = file

  const reader = new FileReader()

  reader.onload = (e) => {
    iconPreview.value = e.target.result
  }

  reader.readAsDataURL(file)

}


</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Site Settings</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Site Settings" />
      </q-breadcrumbs>
    </div>
    <div class="q-py-md">
      <MenuConfig />
    </div>
    <div>
      <q-form @submit.prevent="updatedata">
        <div class="row">
          <div class="col q-pa-xs">
            <div class="card-box q-gutter-y-md">
              <q-input filled required v-model="form.sitename" label="Site Name"></q-input>
              <q-input filled v-model="form.slogan" label="Site Slogan"></q-input>
              <q-input filled v-model="form.phone" label="Phone"></q-input>
              <q-input filled v-model="form.fax" label="Fax"></q-input>
              <q-input filled v-model="form.email" label="Email"></q-input>
              <q-input filled v-model="form.description" type="textarea" label="Desciption"></q-input>
              <q-input filled v-model="form.address" type="textarea" label="Address"></q-input>
            </div>
          </div>
          <div class="col">
            <div class="card-box q-pa-xs">
              <div class="flex justify-between q-mb-md">
                <div class="text-md">Logo</div>
                <q-btn v-if="logoPreview" size="10px" unelevated color="primary" no-caps @click="handleUploadLogo">
                  <q-icon name="upload"></q-icon>
                  <span>Upload Logo</span>
                </q-btn>
              </div>
              <input id="inputLogo" type="file" @input="updateLogoPreview" class="hidden">
              <div class="bg-grey-2 flex justify-center items-center q-pa-md" style="min-height:120px;">
                <img v-if="logoPreview" :src="logoPreview" class="img-preview" />
                <div class="text-center cursor-pointer" v-else  @click.prevent="handleUploadLogo">
                  <q-icon name="upload" size="lg" color="grey-6"></q-icon>
                <div class="text-grey-7 cursor-pointer">Upload Logo</div>
                </div>
              </div>
            </div>
            <div class="card-box q-pa-xs">
              <div class="flex justify-between q-mb-md">
                <div class="text-md">Icon</div>
                <q-btn v-if="iconPreview" size="10px" unelevated color="primary" no-caps @click="handleUploadIcon">
                  <q-icon name="upload"></q-icon>
                  <span>Upload Icon</span>
                </q-btn>
              </div>
              <input id="inputIcon" type="file" @input="updateIconPreview" class="hidden">
              <div class="bg-grey-2 q-mt-md flex justify-center items-center q-pa-md" style="min-height:120px;">
                <img v-if="iconPreview" :src="iconPreview" class="icon-preview" />
                <div class="text-center cursor-pointer" v-else  @click.prevent="handleUploadIcon">
                  <q-icon name="upload" size="lg" color="grey-6"></q-icon>
                <div class="text-grey-7 cursor-pointer">Upload Icon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-footer class="q-pa-md bg-white">
          <div class="flex justify-end">
            <q-btn :loading="loading" label="Update Data" type="submit" color="primary" unelevated></q-btn>
          </div>
        </q-footer>
      </q-form>
    </div>
  </q-page>
</template>

<style scoped>
.img-preview {
  width:100%;
  height:auto;
}
.icon-preview {
  width: 100px;
  height: 100px;
  object-fit: contain;
}
</style>

