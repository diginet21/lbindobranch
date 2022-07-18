
<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  store.dispatch('lead/getNewLeadCount')

  const branch = computed(() => store.state.branch)

  const branchLink = computed({
    get() {
      let main_url = branch.value.main_url
      if(branch.value) {
        main_url += `?branch=${branch.value.slug}`
      }
  
      return main_url;
    },
    set(val) {
      console.log(val);
    }
  })
</script>
<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="title">Dashboard</div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Account" />
      </q-breadcrumbs>
    </div>
    <div>
      <q-card>
        <q-card-section>
          <div class="card-heading text-md q-mb-md">Branch Link</div>
          <q-input readonly v-model="branchLink" outlined>
            <template v-slot:prepend>
              <q-btn icon="content_copy" flat dense></q-btn>
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
