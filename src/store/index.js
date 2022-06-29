import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import createPersistedState from "vuex-persistedstate";

const dataState = createPersistedState({
  key: '_state-data_branch',
  paths: ['user'],
})

import user from './user'
import setting from './site-setting'
import lead from './lead';
import post from './post';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    state: {
      errors: null,
      loading: false,
      drawer: true
    },
    mutations: {
      SET_ERROR: (state, payload) => {
        state.errors = payload
      },
      CLEAR_ERROR: (state) => {
        state.errors = null
      },
      SET_LOADING: (state, status) => {
        state.loading = status
      },
      SET_DRAWER: (state, val) => {
        state.drawer = val
      },
      TOGGLE_DRAWER: (state) => {
        state.drawer = !state.drawer
      }
    },
    modules: {
      user,
      setting,
      lead,
      post
    },
    plugins: [dataState],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
