<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

const events = computed(() => store.state.event.events)

onMounted(() => {
  if(!events.value.length) {
    store.dispatch('event/getAllEvent');
  }
})

const deleteItem = (item) => {
  Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
   store.dispatch('event/destroy', item.id)
  })
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Events</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{ name: 'EventCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Event</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Events" />
      </q-breadcrumbs>
    </div>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Time</th>
              <th>Approved</th>
              <th>Category</th>
              <th align="right">Action</th>
            </tr>
          </thead>
          <tbody v-if="events.ready">
            <tr v-for="(item, ind) in events.data" :key="item.id">
              <td>{{ ind+1 }}</td>
              <td>
                <q-img v-if="item.asset" :src="item.asset.src" :ratio="9/6" width="70px"></q-img>
              </td>
              <td>{{ item.title }}</td>
              <td>
                <table>
                  <tr>
                    <td>Start :</td>
                    <td>{{ item.start_at }}</td>
                  </tr>
                  <tr>
                    <td>End :</td>
                    <td>{{ item.end_at }}</td>
                  </tr>
                </table>
              </td>
              <td>{{ item.is_active? 'Yes' : 'No' }}</td> 
              <td>{{ item.category }}</td>
              <td align="right">
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(item)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'EventEdit', params: { id: item.id }}"></q-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center q-py-md" v-if="!events.ready">
          <q-spinner-facebook size="2em"></q-spinner-facebook>
        </div>
         <div v-if="!events.available" class="text-center full-width q-pa-md">No data found</div>
      </div>
    </div>
  </q-page>
</template>
