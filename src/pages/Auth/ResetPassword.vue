
<script>
import { reactive, computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { BaseApi } from 'boot/axios'
export default {

  setup() {
    
    const store = useStore()

    const route = useRoute()

    const router = useRouter()

    const form = reactive({
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
    })

    const tokenIsValid = ref(false)

    const loading = computed(() => store.state.loading)
    const errors = computed(() => store.state.errors)
    
    const submit = () => {

      store.commit('CLEAR_ERROR')

      if(tokenIsValid.value) {
        BaseApi().post('BaseApi/resetPassword', form).then(response => {
          if(response.status == 200) {
            Notify.create({
              type: 'positive',
              message: 'Behasil mereset password, silahkan login dengan password baru anda'
            })
            router.push({name: 'Login'})
          }
        })
      } else {

        BaseApi().post('auth/validateToken', form).then(response => {
          if(response.status == 200) {
           if(response.data.success) {
             tokenIsValid.value = true
             const data = response.data.results
             form.token = data.token
             form.email = data.email
           }
          }
        })
      }
    };

    return {
      form,
      submit,
      loading,
      errors,
      isPwd: ref(true),
      tokenIsValid,
    }
  }
}

</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="card-md q-pa-md">
      <q-card-section>
        <div class="card-title">
          <h2>Reset Password</h2>
          <div class="desc">
            <div v-if="!tokenIsValid">Silahkan masukkan token anda</div>
            <div v-if="tokenIsValid">Silahkan ganti password anda</div>
            <div v-if="errors && errors.token" class="text-red-7">{{ errors && errors.token[0] }}</div>
          </div>
        </div>
        <q-form @submit.prevent="submit">
            <div>

              <q-input v-if="!tokenIsValid" filled v-model="form.token" label="Token" required >
              </q-input>
              <template v-if="tokenIsValid">
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
              </template>
              <div class="q-py-md">
                <q-btn :loading="loading" label="Reset Password" type="submit" color="primary" class="full-width" unelevated></q-btn>
                <div class="q-mt-md">
                  <router-link to="/auth/login">Back to Login</router-link>
                </div>
              </div>
            </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>