<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

// store.commit('SET_DRAWER', true)

const posts = computed(() => store.state.post.posts)
const categories = computed(() => store.state.post.post_categories)

onMounted(() => {
  if(!posts.value.length) {
    store.dispatch('post/getPosts');
  }
  if(!categories.value.length) {
    store.dispatch('post/getPostCategories');
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
              <th>Approved</th>
              <th align="right">Action</th>
            </tr>
          </thead>
          <tbody v-if="posts.ready">
            <tr v-for="(post, ind) in posts.data" :key="post.id">
              <td>{{ ind+1 }}</td>
              <td>
                <q-img v-if="post.asset" :src="post.asset.src" :ratio="9/6" width="70px"></q-img>
              </td>
              <td>{{ post.title }}</td> 
              <td>{{ post.is_active? 'Yes' : 'No' }}</td> 
              <td align="right">
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(post)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'PostEdit', params: { id: post.id }}"></q-btn>
                </div>
              </td>
            </tr>
             <tr v-if="!posts.available">
              <td colspan="5" >
                <div class="text-center q-pa-xs">No data found</div></td>
            </tr>
          </tbody>
        </table>
        <div class="text-center q-py-md" v-if="!posts.ready">
          <q-spinner-facebook size="2em"></q-spinner-facebook>
        </div>
      </div>
    </div>
  </q-page>
</template>
