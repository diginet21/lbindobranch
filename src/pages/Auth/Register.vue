
<script>

import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    const form = reactive({
      name: '',
      email: '',
      password: '',
      phone: '',
      password_confirmation: '',
      device_name: 'WEB'
    })

    const errors = computed(() => store.state.errors)
    const loading = computed(() => store.state.loading)

    function submit() {
      store.dispatch('user/register', form)
    }

    return { 
      form, 
      submit, 
      loading,
      isPwd: ref(true),
      errors
    }
  },
}
</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="card-md q-pa-md">
      <q-card-section>
        <div class="card-title">
          <h2>Register</h2>
        </div>
        <q-form @submit.prevent="submit">
          <div class="q-gutter-y-xs">
            <q-input filled v-model="form.name" label="Name" required
            :error="errors && errors.name ? true : false"
            >
            <template v-slot:error>
              {{ errors.name[0] }}
            </template>
          </q-input>
          <q-input 
            filled v-model="form.email" label="Email" required type="email"
            :error="errors && errors.email ? true : false"
            >
            <template v-slot:error>
              {{ errors.email[0] }}
            </template>
            </q-input>
          <q-input 
            filled v-model="form.phone" label="Ponsel" required 
            :error="errors && errors.phone ? true : false"
            >
            <template v-slot:error>
              {{ errors.phone[0] }}
            </template>
            </q-input>
            <q-input :type="isPwd ? 'password' :'text'" filled v-model="form.password" label="Password" required :error="errors && errors.password ? true : false">

              <template v-slot:append>
                <q-icon class="cursor-pointer" @click="isPwd = !isPwd" :name="isPwd? 'visibility' : 'visibility_off'"></q-icon>
              </template>
              <template v-slot:error>
              {{ errors.password[0] }}
              </template>
            </q-input>
            <q-input :type="isPwd ? 'password' :'text'" filled v-model="form.password_confirmation" label="Konfirmasi Password" required>
              <template v-slot:append>
                <q-icon class="cursor-pointer" @click="isPwd = !isPwd" :name="isPwd? 'visibility' : 'visibility_off'"></q-icon>
              </template>
            </q-input>
            <div class="q-py-md">
              <q-btn :loading="loading" label="Daftar" type="submit" color="primary" class="full-width" unelevated></q-btn>
              <div class="q-mt-md">
                Sudah punya akun?
                <router-link to="/auth/login">Login</router-link>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>