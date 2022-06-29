<script setup>

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

// store.commit('SET_DRAWER', true)

const postCategories = computed(() => store.state.postCategory.post_categories)

onMounted(() => store.dispatch('postCategory/getAll'))

const deleteItem = (item) => {
  Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
    store.dispatch('postCategory/destroy',item.id)
  })
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
       <div class="row items-center q-gutter-x-md">
        <div class="title">Kategori Prio Weekly</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{name: 'PostCategoryCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Category</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Prio Weekly" />
        <q-breadcrumbs-el label="Category" />
      </q-breadcrumbs>
    </div>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in postCategories" :key="i">
              <td>{{ i+1 }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(item)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'PostCategoryEdit', params: { category: item.id } }"></q-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
         <div v-if="!postCategories.length" class="text-center full-width q-py-lg bg-grey-1">Tidak ada data</div>
      </div>
    </div>
  </q-page>
</template>