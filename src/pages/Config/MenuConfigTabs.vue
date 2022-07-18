<template>
   <q-tabs align="left" active-color="primary" active-bg-color="green-1" content-class="bg-grey-2" dark>
      <q-route-tab label="Branch Setting" :to="{ name: 'BranchConfig'}"></q-route-tab>
      <q-route-tab label="Paygate Setting" :to="{ name: 'PaygateConfig'}"></q-route-tab>
    </q-tabs>
</template>