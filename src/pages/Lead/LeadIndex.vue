<script setup>
import { computed, onBeforeMount, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

const main_data = computed(() => store.state.lead.main_data)
const statuses = computed(() => store.state.lead.lead_status)

onBeforeMount(() => {
  if(!statuses.value.length) {
    store.dispatch('lead/getStatus');
  }
  getData()
})

const statusOptions = computed(() => {
  let opts = { value: '', label: 'New'}
  opts = [ opts, ...statuses.value.map(s => ({ value: s.id, label: s.label }))]

  return opts
})

const itemEdited = ref(false) 
const modal = ref(false) 
const leadInfoModal = ref(false) 

const leadSelected = ref(null)

const selectLead = (lead) => {
  form.id = lead.id
  form.lead_status_id = lead.lead_status_id
  leadSelected.value = lead
  leadInfoModal.value = true
}

const title = ref('Leads')

const form = reactive({
  id: '',
  lead_status_id: '',
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  lead_type: '',
  description: ''
})

const editItem = (item) => {
  leadInfoModal.value = false
  form.id = item.id
  form.lead_status_id = item.lead_status_id
  form.customer_name = item.customer_name
  form.customer_phone = item.customer_phone
  form.customer_email = item.customer_email
  form.lead_type = item.lead_type
  form.description = item.description
  modal.value = true
}

const updateLead = () => {
   store.dispatch('lead/updateStatus', { id: form.id, lead_status_id: form.lead_status_id }).then(() => {
     store.dispatch('lead/getNewLeadCount');
     getData()
  })
  .finally(() => {
    modal.value = false
    leadInfoModal.value = false
  })
}

const getData = () => {
  store.dispatch('lead/getAll', formFilter);
}
const submit = () => {
  store.dispatch('lead/update', form).then(() => {
    store.dispatch('lead/getAll');
    store.dispatch('lead/getNewLeadCount');
  })
  .finally(() => modal.value = false)
}

const loading = computed(() => store.state.loading)

const formFilter = reactive({
  branch_id: '',
  limit: 5,
  start: '',
  end: ''
})

const paginateData = () => {
   let payload = {
    skip: main_data.value.data.length,
    limit: main_data.value.limit,
  };
  payload = { ...payload, ...formFilter };

  store.dispatch('lead/paginateData', payload)
}

const filterData = () => {
  store.dispatch("lead/filterData", formFilter);
};
const reset = () => {
  formFilter.branch_id = ''
  formFilter.start = ''
  formFilter.end = ''
  getData()
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">{{ title }}</div>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el :label="title" />
      </q-breadcrumbs>
    </div>
    <q-form class="col"
        @submit.prevent="filterData"
      >
      <div class="row q-gutter-x-sm q-mt-sm">
        <div class="col">
          <q-input 
            stack-label
            label="Start"
            filled
            square
            dense
            type="date"
            v-model="formFilter.start"
          ></q-input>
        </div>
        <div class="col">
          <q-input
            stack-label
            label="End"
            filled
            square
            dense
            type="date"
            v-model="formFilter.end"
          ></q-input>
        </div>
        <div class="col">
          <q-select
            required
            filled
            stack-label
            square
            dense
            label="Showing"
          :options="[5,10,20,50,100]"
          v-model="formFilter.limit">
          </q-select>
        </div>
        <q-btn
          type="submit"
          label="Filter"
          unelevated
          color="dark"
          :disable="loading"
        ></q-btn>
        <q-btn
          type="button"
          label="Reset"
          unelevated
          color="dark"
          :disable="loading"
          @click.prevent="reset"
        ></q-btn>
      </div>
    </q-form>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Created</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Status</th>
              <th align="right">Actions</th>
            </tr>
          </thead>
          <tbody v-if="main_data.ready">
            <tr v-for="(item, ind) in main_data.data" :key="item.id">
              <td>{{ ind+1 }}</td>
              <td>{{ item.created_at }}</td>
              <td>{{ item.customer_name }}</td>
              <td>{{ item.customer_phone }}</td>
              <td>{{ item.lead_type }}</td> 
              <td>
                <q-badge :color="item.status ? item.status.color : 'orange'">{{ item.status? item.status.label : 'New' }}</q-badge>
              </td>
              <td align="right">
                <div class="q-gutter-sm">
                  <!-- <q-btn round icon="view_list" size="sm" color="blue" unelevated @click="selectLead(item)"></q-btn> -->
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'LeadEdit', params: { id: item.id } }"></q-btn>
                </div>
              </td>
            </tr>
            <tr v-if="!main_data.available">
              <td colspan="6" >
                <div class="text-center q-pa-xs">No data found</div></td>
            </tr>
          </tbody>
        </table>
        <div class="text-center q-py-md" v-if="!main_data.ready">
          <q-spinner-facebook size="2em"></q-spinner-facebook>
        </div>
      </div>
    </div>
    <div class="q-pa-md text-center" v-if="main_data.count > main_data.data.length">
      <q-btn :loading="loading" label="Loadmore.." outline size="md" color="primary" no-caps @click="paginateData"></q-btn>
    </div>
    <q-dialog v-model="modal" persistent>
      <q-card class="card-lg">
        <div class="card-header">
          <div class="text-md">Edit Lead</div>
        </div>
        <q-card-section>
          <q-form @submit="submit">
            <div class="q-gutter-y-sm">
              <q-select outlined :options="statusOptions" emit-value map-options v-model="form.lead_status_id" label="Lead Status"></q-select>
              <q-input outlined label="Customer name" v-model="form.customer_name"></q-input>
              <q-input outlined label="Customer Phone" v-model="form.customer_phone"></q-input>
              <q-input outlined label="Customer Email" v-model="form.customer_email"></q-input>
              <q-input outlined label="Lead Type" v-model="form.lead_type"></q-input>
              <q-input outlined type="textarea" label="Description" v-model="form.description"></q-input>
            </div>
             <div class="flex justify-end q-gutter-x-sm q-mt-md items-center">
              <q-btn label="Cancel" outline type="button" color="primary" v-close-popup></q-btn>
              <q-btn label="Submit" unelevated type="submit" color="primary"></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="leadInfoModal" persistent>
      <q-card class="card-lg" v-if="leadSelected">
        <div class="card-header flex justify-between items-center">
          <div class="text-md">Lead {{ leadSelected.id}}</div>
        </div>
        <div class="q-pa-sm">
          <q-list separator>
            <q-item>
              <q-item-section>Name</q-item-section>
              <q-item-section>{{ leadSelected.customer_name }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Email</q-item-section>
              <q-item-section>{{ leadSelected.customer_email }}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Phone</q-item-section>
              <q-item-section>{{ leadSelected.customer_phone}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Lead Type</q-item-section>
              <q-item-section>{{ leadSelected.lead_type}}</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Status</q-item-section>
              <q-item-section>
                 <q-select filled square :options="statusOptions" emit-value map-options v-model="form.lead_status_id" dense></q-select>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Description / Message</q-item-section>
              <q-item-section>{{ leadSelected.description}}</q-item-section>
            </q-item>
          </q-list>
          <div class="flex justify-end q-gutter-x-sm q-mt-md q-pa-sm">
            <q-btn label="Close" outline v-close-popup color="blue"></q-btn>
            <q-btn label="Update" unelevated @click="updateLead" color="blue"></q-btn>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>
