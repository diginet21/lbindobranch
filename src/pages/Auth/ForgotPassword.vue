
<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { BaseApi } from 'boot/axios'
import Cookies from 'js-cookie'

export default {

  setup() {
    
    const store = useStore()

    const form = reactive({
        email: '',
    });
    const loading = computed(() => store.state.loading)
    const errors = computed(() => store.state.errors)
    
     const submit = () => {
      store.commit('CLEAR_ERROR')
      BaseApi().post('auth/requestPasswordToken', form).then(response => {
        if(response.status == 200) {
          Cookies.set('__isreqpwd', 1)
          router.push({ name: 'ResetPassword'})
        }
      })
    };

    return {
      form,
      submit,
      loading,
      errors,
    }
  }
}

</script>

<template>
  <q-page class="flex flex-center">
    <q-card class="card-md q-pa-md">
      <q-card-section>
        <div class="card-title">
          <h2>Forgot Password</h2>
          <div class="desc">
            <div v-if="errors && errors.message" class="text-red q-mb-md">{{ errors.message[0] }}</div>
            <div else>Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</div>
          </div>
        </div>
        <q-form @submit.prevent="submit">
            <div>
              <q-input filled v-model="form.email" label="Email" required
              :error="errors && errors.email ? true : false"
              >
              <template v-slot:error>
                {{ errors.email[0] }}
              </template>
            </q-input>
              <div class="q-py-md">
                <q-btn :loading="loading" label=" Email Password Reset Link" type="submit" color="primary" class="full-width" unelevated></q-btn>
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