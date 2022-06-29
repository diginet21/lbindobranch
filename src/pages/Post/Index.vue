<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

// store.commit('SET_DRAWER', true)

const posts = computed(() => store.state.post.posts)

onMounted(() => {
  if(!posts.value.length) {
    store.dispatch('post/getPosts');
  }
})
const deleteItem = (item) => {
 Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
    store.dispatch('post/destroy', item.id)
  })

}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Prio Weekly</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{ name: 'PostCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Prio Weekly</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Prio Weekly" />
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, ind) in posts" :key="post.id">
              <td>{{ ind+1 }}</td>
              <td>
                <q-img v-if="post.asset" :src="post.asset.src" :ratio="9/6" width="70px"></q-img>
              </td>
              <td>{{ post.title }}</td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(post)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'PostEdit', params: { id: post.id }}"></q-btn>
                </div>
              </td>
            </tr>
             <tr v-if="!posts.length">
              <td colspan="4" >
                <div class="text-center">Tidak ada data</div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </q-page>
</template>
