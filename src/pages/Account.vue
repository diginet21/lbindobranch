<script>
import { computed, ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {

    const store = useStore()
    const user = computed(() => store.state.user.account)
    const errors = computed(() => store.state.errors)

    const form = reactive({
      name: '',
      email:'',
      phone: '',
      password: '',
      password_confirmation: '',
    })

    if(user.value) {
      form.name = user.value.name
      form.email = user.value.email
      form.phone = user.value.phone
    }

    const loading = ref(false)
    const isChangePassword = ref(false)

    const submit = () => {
      store.dispatch('user/update', form)
    }

    const changePassword = () => {
      form.password = ''
      form.password_confirmation = ''
      isChangePassword .value= !isChangePassword.value
    }

    return { 
      form, 
      submit, 
      loading,
      changePassword,
      isChangePassword,
      isPwd: ref(true),
      errors,
    }
  },
}
</script>

<template>
  <q-page padding>
    <div class="q-py-sm">
      <div class="title">User Account</div>
      <q-breadcrumbs class="text-grey" active-color="secondary">
        <q-breadcrumbs-el label="Dashboard"/>
        <q-breadcrumbs-el label="Account" />
      </q-breadcrumbs>
    </div>
    <div class="card-box card-lg">
      <q-form @submit.prevent="submit">
        <div class="q-pt-sm">
          <q-input filled v-model="form.name" label="Name" required
            :error="errors && errors.name ? true : false"
            >
             <template v-slot:error>
              {{ errors.name[0] }}
            </template>
          </q-input>
          <q-input filled v-model="form.email" label="Email" required
            :error="errors && errors.email ? true : false"
            >
             <template v-slot:error>
              {{ errors.email[0] }}
            </template>
          </q-input>
          <q-input filled v-model="form.phone" label="Phone" required
            :error="errors && errors.phone ? true : false"
            >
             <template v-slot:error>
              {{ errors.phone[0] }}
            </template>
          </q-input>
          <template v-if="isChangePassword">
          <q-input class="q-mb-md" filled :type="isPwd ? 'password' :'text'" label="Password" v-model="form.password" >
            <template v-slot:append>
              <q-icon class="cursor-pointer" @click="isPwd = !isPwd" :name="isPwd? 'visibility' : 'visibility_off'"></q-icon>
            </template>
          </q-input>
          <q-input filled :type="isPwd ? 'password' :'text'" label="Konfirmasi Password" v-model="form.password_confirmation">
            <template v-slot:append>
              <q-icon class="cursor-pointer" @click="isPwd = !isPwd" :name="isPwd? 'visibility' : 'visibility_off'"></q-icon>
            </template>
          </q-input>
          <div class="text-red q-pa-sm text-xs" v-if="errors && errors.password">{{ errors.password[0] }}</div>
          </template>
          <div class="q-mt-md flex justify-between q-gutter-x-sm">
            <div>
              <q-btn type="button" :label="isChangePassword ?'Cancel Change Password' :'Change Password'" color="primary" flat padding="xs" no-caps @click.prevent="changePassword"></q-btn>
            </div>
            <div>
              <q-btn :loading="loading" type="submit" label="Update" color="primary" unelevated></q-btn>
            </div>
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
