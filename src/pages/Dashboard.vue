<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="title">Dashboard</div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Account" />
      </q-breadcrumbs>
    </div>
  </q-page>
</template>

<script setup>
  import { useStore } from 'vuex'

  const store = useStore()

  store.dispatch('lead/getNewLeadCount')
</script>

