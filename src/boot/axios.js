import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

import Cookies from 'js-cookie';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const mainApi = axios.create({ 
  baseURL:  process.env.MAIN_API
})
const baseApi = axios.create({ 
  baseURL:  process.env.BASE_API
})

export default boot(({ app, store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = baseApi
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

   // Add a response interceptor
   baseApi.interceptors.response.use(response => {
    return response
  }, error => {
    console.log('from boot');
  
    if (error.response) {

        // Session Expired
        if (401 === error.response.status) {
          console.log('from boot unauthorized');
            store.dispatch('user/exit')

            Notify.create({
              type: 'negative',
              message: 'Sesi anda sudah habis, silahkan login'
            });
          }
  
        // Errors from backend
        if (error.response.status == 422) {
            // errors = error.response.data.message
            store.commit('SET_ERROR', error.response.data.errors)
        }
  
    } else {

      Notify.create({
        type: 'negative',
        message: 'Jaringan sedang bermasalah, silahkan tunggu beberapa saat.'
      });
      
    }
    // Do something with response error       
    return Promise.reject(error)
  })

  mainApi.interceptors.request.use((config) => {

    let branch = store.state.branch
    
    if(branch) {
      // config.params = {...config.params, branch: branch }
      // config.headers = {...config.headers, Branch_Id: branch.id }
      config.headers['Branch-Id'] = branch.id ;
    }
    return config
  
  }, function (error) {
    return Promise.reject(error);
  })

  mainApi.interceptors.response.use(response => {
    return response
  }, error => {
  
    if (error.response) {

        // Session Expired
        if (401 === error.response.status) {
          console.log('from boot unauthorized');
            store.dispatch('user/exit')

            Notify.create({
              type: 'negative',
              message: 'Sesi anda sudah habis, silahkan login'
            });
          }
  
        // Errors from backend
        if (error.response.status == 422) {
            // errors = error.response.data.message
            store.commit('SET_ERROR', error.response.data.errors)
        }
  
    } else {

      Notify.create({
        type: 'negative',
        message: 'Jaringan sedang bermasalah, silahkan tunggu beberapa saat.'
      });
      
    }
    // Do something with response error       
    return Promise.reject(error)
  })
})


var Api = () => {

  const token = Cookies.get('__btoken')

  if(token) {
    mainApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return mainApi
}
var BaseApi = () => {

  const token = Cookies.get('__btoken')

  if(token) {
    baseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  return baseApi
}

export { Api, BaseApi }

