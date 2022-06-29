<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

const store = useStore()

const route = useRoute()

const router = useRouter()

// store.commit('SET_DRAWER', false)


const form = reactive({
  id: '',
  title: '',
  description: '',
})

onBeforeMount(() => getdata())

const getdata = async () => {
  const response = await store.dispatch('postCategory/getById', route.params.category)

  if(response.status == 200) {
    const result = response.data.data

    form.id = result.id
    form.title = result.title
    form.description = result.description
    form.icon = result.icon
    
  }
}

const loading = computed(() => store.state.loading)

const submit = () => {
  store.dispatch('postCategory/update', form)
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Edit Kategori Prio Weekly</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Prio Weekly" />
        <q-breadcrumbs-el label="Category" />
        <q-breadcrumbs-el label="Edit" />
      </q-breadcrumbs>
    </div>
    <q-form @submit.prevent="submit">
      <div class="row form-container card-lg">
        <div class="col q-px-sm">
           <div class="card-box">
            <div class="q-gutter-y-md">
              <q-input outlined required v-model="form.title" label="Title"></q-input>
              <q-input outlined type="textarea" label="Description" v-model="form.description"></q-input>
              <!-- <q-input outlined type="textarea" rows="8" required v-model="form.icon" label="Icon Svg"></q-input> -->
            </div>
            <div class="flex justify-end q-mt-md q-gutter-md">
              <q-btn :disable="loading" label="Cancel" color="primary" flat :to="{name: 'PostCategoryIndex'}"></q-btn>
              <q-btn :loading="loading" type="submit" label="Submit" color="primary" unelevated></q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>