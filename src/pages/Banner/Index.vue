<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Dialog } from 'quasar'

const store = useStore()

const banners = computed(() => store.state.banner.banners)

onMounted(() => {
  if(!banners.value.length) {
    store.dispatch('banner/getBanners');
  }
})

const deleteItem = (item) => {
   Dialog.create({
    title: 'Yakin Akan menghapus data?',
    message: 'Data yang dihapus tidak dapat dikembalikan',
    cancel: true
  }).onOk(() => {
   store.dispatch('banner/destroy', item.id)
  })
}

</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="row items-center q-gutter-x-md">
        <div class="title">Banner</div>
        <q-btn unelevated color="primary" padding="2px 12px" no-caps :to="{ name: 'BannerCreate'}">
          <q-icon name="add"></q-icon>
          <span>New Banner</span>
        </q-btn>
      </div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Banner" />
      </q-breadcrumbs>
    </div>
     <div class="card-column">
      <div class="table-responsive">
        <table class="table striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th align="left">Title</th>
              <th align="left">Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="banners.ready">
            <tr v-for="(banner, ind) in banners.data" :key="banner.id">
              <td>{{ ind+1 }}</td>
              <td align="left">
                <q-img v-if="banner.asset" :src="banner.asset.src" :ratio="9/6" width="70px"></q-img>
              </td>
              <td align="left">{{ banner.title }}</td>
              <td align="left">{{ banner.banner_type }}</td>
              <td>
                <div class="q-gutter-sm">
                  <q-btn round icon="delete" size="sm" color="red" unelevated @click="deleteItem(banner)"></q-btn>
                  <q-btn round icon="edit" size="sm" color="blue" unelevated :to="{ name: 'BannerEdit', params: { id: banner.id }}"></q-btn>
                </div>
              </td>
            </tr>
             <tr v-if="!banners.available">
              <td colspan="6" >
                <div class="text-center q-pa-xs">No data found</div></td>
            </tr>
          </tbody>
        </table>
        <div class="text-center q-py-lg" v-if="!banners.ready">
          <q-spinner-facebook size="2em"></q-spinner-facebook>
        </div>
      </div>
    </div>
  </q-page>
</template>
