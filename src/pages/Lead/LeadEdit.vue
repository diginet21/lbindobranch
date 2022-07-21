<script setup>
import { reactive, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const store = useStore()
const router = useRouter()

const form = reactive({
  id: '',
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  status: '',
  description: '',
  lead_status_id: '',
  lead_type: ''
})

const statuses = ref([])
const statusSelected = ref(null)

const getData = () => {
  store.dispatch('lead/getById', route.params.id).then(response => {
    if(response.status == 200) {
      let lead = response.data.data.lead
      statuses.value = response.data.data.statuses

      form.id = lead.id
      form.customer_name = lead.customer_name
      form.customer_phone = lead.customer_phone
      form.customer_email = lead.customer_email
      form.description = lead.description
      form.lead_type = lead.lead_type
      form.lead_status_id = lead.lead_status_id

      statusSelected.value = lead.status ? lead.status : null
    }
  })
}


onBeforeMount(() => {
  getData()
})

const modal = ref(false)
const selectStatus = (item) => {
  statusSelected.value = item
  form.lead_status_id = item.id
}

const submit = () => {
  store.dispatch('lead/update', form)
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Edit Lead</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Lead" />
        <q-breadcrumbs-el label="Edit" />
      </q-breadcrumbs>
    </div>
    <div class="card-box card-xl">
      <q-form @submit.prevent="submit">
        <div class="q-gutter-y-sm">
          <q-input required filled label="Customer Name" v-model="form.customer_name"></q-input>
          <q-input required filled label="Customer Phone" v-model="form.customer_phone"></q-input>
          <q-input required filled label="Customer Email" v-model="form.customer_email"></q-input>
          <q-input required filled label="Lead Type" v-model="form.lead_type"></q-input>
          <!-- <q-input filled label="Status" :value="statusSelected ? statusSelected.label : '-'">
            <template v-slot:append>
              <q-btn label="Select" @click.prevent="modal = true"></q-btn>
            </template>
          </q-input> -->
          <div class="row justify-between items-center">
            <div class="row q-gutter-x-md q-pa-md"><span class="">Status</span> <div class="q-px-md bg-green rounded-borders text-white">{{ statusSelected ? statusSelected.label : 'New' }}</div></div>
            <q-btn label="Edit Status" color="blue" size="sm" unelevated @click="modal = true"></q-btn>
          </div>
          <q-input required filled type="textarea" v-model="form.description" label="Description"></q-input>
        </div>
        <div class="q-mt-md flex justify-end q-gutter-x-md">
          <q-btn label="Cancel" type="button" color="primary" outline :to="{ name: 'LeadIndex' }"></q-btn>
          <q-btn label="Submit" type="submit" color="primary"></q-btn>
        </div>
      </q-form>
    </div>
    <q-dialog v-model="modal">
      <q-card class="card-lg">
        <div class="card-title q-pa-md flex justify-between items-center bordered">
          <h2>Select Status</h2>
        </div>
        <q-list separator v-for="(item, index) in statuses" :key="index">
          <q-expansion-item v-if="item.childs.length" expand-separator
          :label="item.label"
          >
          <q-item @click="selectStatus(sub)" clickable v-for="sub in item.childs" :key="sub.id">
            <q-item-section side>
              <q-icon class="cursor-pointer" :name="form.lead_status_id == sub.id ? 'radio_button_checked' : 'radio_button_unchecked'" :color="form.lead_status_id == sub.id ? 'green' : 'grey-7'"></q-icon>
            </q-item-section>
            <q-item-section>
              {{ sub.label }}
            </q-item-section>
          </q-item>
          </q-expansion-item>
          <q-item v-else @click="selectStatus(item)" clickable>
              <q-item-section side>
                <q-icon class="cursor-pointer" :name="form.lead_status_id == item.id ? 'radio_button_checked' : 'radio_button_unchecked'" :color="form.lead_status_id == item.id ? 'green' : 'grey-7'"></q-icon>
              </q-item-section>
              <q-item-section>
                {{ item.label }}
              </q-item-section>
          </q-item>
        </q-list>
        <div class="q-pa-md flex justify-end bg-grey-1">
          <q-btn label="Close" v-close-popup unelevated color="primary"></q-btn>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>