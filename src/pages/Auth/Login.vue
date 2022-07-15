
<script>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()

    const form = reactive({
      email: null,
      password: null,
      device_name: 'BRANCH'
    })

    const errors = computed(() => store.state.errors)
    const loading = computed(() => store.state.loading)

    function submit() {
      store.dispatch('user/login', form)
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
          <h2>Login</h2>
          <div class="desc">Silahkan login untuk akses aplikasi</div>
        <div class="text-red text-xs q-pt-xs" v-if="errors"> {{ errors.email[0] }}</div>
        </div>
        <q-form @submit.prevent="submit" class="">
            <div class="q-gutter-y-md">
              <q-input 
              filled v-model="form.email" label="Email" required type="email">
              </q-input>
              <q-input :type="isPwd ? 'password' :'text'" filled v-model="form.password" label="Password" required>
                <template v-slot:append>
                  <q-icon class="cursor-pointer" @click="isPwd = !isPwd" :name="isPwd? 'visibility' : 'visibility_off'"></q-icon>
                </template>
              </q-input>
              <div class="q-py-md">
                <q-btn :loading="loading" label="Login" type="submit" color="primary" class="full-width" unelevated></q-btn>
                <div class="q-my-md"> <router-link to="/auth/forgot-password">Lupa Password?</router-link></div>
                <!-- <div>
                  Belum punya akun?
                  <router-link to="/auth/register">Daftar Disini</router-link>
                </div> -->
              </div>
            </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>