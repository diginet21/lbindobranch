<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const imagePreview = ref('')

const form = reactive({
  title: '',
  description: '',
  start_at: '',
  end_at: '',
  image: '',
  map: '',
  whatsapp_contact: '',
  category: ''
})

const loading = computed(() => store.state.loading)

const submit = () => {
  store.dispatch('event/storeEvent', form)
}


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

const category = ['Event', 'Promotion', 'Career']

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Add Events</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Events" />
        <q-breadcrumbs-el label="New" />
      </q-breadcrumbs>
    </div>
    <q-form @submit.prevent="submit">
      <div class="row form-container">
        <div class="col q-pa-sm">
           <div class="card-box">
            <div class="q-gutter-y-md">
              <q-input outlined v-model="form.title" label="Title"></q-input>
              <q-select outlined v-model="form.category" :options="category" label="Category"></q-select>
              <q-input outlined v-model="form.whatsapp_contact" label="Contact Whatsapp"></q-input>
              <div class="q-mt-md">
                <div class="input-label">Start At</div>
                <q-input outlined v-model="form.start_at">

                  <template v-slot:append>
                     <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.start_at" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="form.start_at" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="q-mt-md">
                <div class="input-label">End At ( optional )</div>
               <q-input outlined v-model="form.end_at">

                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.end_at" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time v-model="form.end_at" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              </div>

              <div>
                <div class="q-mt-md">
                  <div class="input-label">Deskripsi</div>
                </div>
                <q-editor v-model="form.description"></q-editor>
              </div>
          </div>
        </div>
        </div>
        <div class="q-pa-sm card-sm">
           <div class="card-box">
            <div class="flex justify-between q-mb-md">
              <div class="text-md">Image</div>
               <q-btn v-if="imagePreview" size="10px" unelevated color="primary" no-caps @click="handleUploadImage">
                <q-icon name="upload"></q-icon>
                <span>Edit Image</span>
              </q-btn>
            </div>
             <input id="inputFile" type="file" @input="handleInputImage" class="hidden">
            <div class="flex justify-center items-center bg-grey-2" style="min-height:130px;">
              <img v-if="imagePreview" :src="imagePreview" class="img-preview" />
              <div class="text-center cursor-pointer" v-else  @click.prevent="handleUploadImage">
                <q-icon name="upload" size="lg" color="grey-6"></q-icon>
               <div class="text-grey-7 cursor-pointer">Upload Image</div>
              </div>
            </div>
          </div>
           <div class="card-box">
            <div>
              <div class="text-md q-mb-sm">Google Map</div>
              <div class="text-label text-grey-7 q-mb-xs">Embed Google Map</div>
              <q-input outlined type="textarea" v-model="form.map" rows="12"></q-input>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-block q-px-md q-mb-xl">
        <q-btn :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
        <q-btn :disable="loading" label="Cancel" color="primary" outline :to="{ name: 'EventIndex' }"></q-btn>
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