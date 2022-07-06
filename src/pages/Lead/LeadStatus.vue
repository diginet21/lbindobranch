<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

// store.commit('SET_DRAWER', true)

const statuses = computed(() => store.state.leadStatus.lead_status)

onMounted(() => {
  if(!statuses.value.length) {
    store.dispatch('leadStatus/getAll');
  }
})

const deleteItem = (item) => {
 Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
    store.dispatch('leadStatus/destroy', item.id)
  })

}

const modal = ref(false)
const loading = ref(false)

const form = reactive({
  type: 'Add',
  id: '',
  label: ''
})

const addItem = () => {
  form.type = 'Add'
  form.label = ''
  modal.value = true
}

const editItem = (item) => {
  form.type = 'Edit'
  form.label = item.label
  form.id = item.id
  modal.value = true
}

const submitItem = () => {
  if(form.type == 'Add') {

    store.dispatch('leadStatus/store', form).then(() => {
      store.dispatch('leadStatus/getAll')
      modal.value = false
    })
    .finally(() => loading.value = false)
  }
  if(form.type == 'Edit') {

    store.dispatch('leadStatus/update', form).then(() => {
      store.dispatch('leadStatus/getAll')
      modal.value = false
    })
    .finally(() => loading.value = false)
  }
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Lead Status</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps @click="addItem">
          <q-icon name="add"></q-icon>
          <span>Add Lead Status</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Lead Status" />
      </q-breadcrumbs>
    </div>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Label</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, ind) in statuses" :key="item.id">
              <td>{{ ind+1 }}</td>
              <td>{{ item.label }}</td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(item)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated @click="editItem(item)"></q-btn>
                </div>
              </td>
            </tr>
             <tr v-if="!statuses.length">
              <td colspan="3" >
                <div class="text-center">No data found</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <q-dialog v-model="modal">
      <q-card class="card-md">
        <div class="card-header">
          <div class="text-md">{{ form.type }} Status Label</div>
        </div>
        <q-card-section>
          <q-form @submit="submitItem">
            <q-input label="Status Label" v-model="form.label" outlined></q-input>
            <div class="flex justify-end q-gutter-x-sm q-mt-md items-center">
              <q-btn label="Cancel" outline type="button" color="primary" v-close-popup></q-btn>
              <q-btn label="Submit" unelevated type="submit" color="primary"></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
