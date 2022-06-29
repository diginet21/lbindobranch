<template>
  <q-layout view="lhr lpR lFf" class="bg-blue-5">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      menus: [
        { path: '/dashboard', label: 'Dashboard', icon: 'home_work', desc: 'Halaman dashboard'},
        { path: '/project', label: 'Project', icon: 'assessment', desc: 'Kelola project'},
        { path: '/billing', label: 'Billing', icon: 'payments', desc: 'kelola Billing & Tagihan'},
        { path: '/account', label: 'AKun', icon: 'person', desc: 'kelola akun'},
      ]
    }
  }
})
</script>
