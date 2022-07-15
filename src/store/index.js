import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import { BaseApi, Api  } from 'boot/axios';

import createPersistedState from "vuex-persistedstate";

const dataState = createPersistedState({
  key: '_state-data_branch',
  paths: ['user', 'branch', 'config', 'site_setting'],
})

import user from './user'
import lead from './lead';
import post from './post';
import event from './event'
import part from './part'
import vehicle from './vehicle'
import order from './order'
import banner from './banner'
import layanan from './layanan'
import config from './config'

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
      drawer: true,
      site_setting: null,
      branch: null
    },
    actions: {
      getSite: ({ commit }) => {
        BaseApi().get('sites-setting').then((response) => {
          if(response.status == 200) {
            commit('SET_SETTING', response.data.results)
          }
         })
      },
     getCurrentBranch({ commit }) {
        Api().get('getCurrentBranch').then(response => {
          if(response.status == 200) {
            console.log(response.data.results);
            commit('SET_BRANCH', response.data.results)
          }
        })
      }
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
      },
      SET_SETTING: ( state, payload ) => {
        state.site_setting = payload
      },
      SET_BRANCH: ( state, payload) => {
        state.branch = payload
      }
    },
    modules: {
      user,
      lead,
      post,
      event,
      part,
      vehicle,
      order,
      banner,
      layanan,
      config
    },
    plugins: [dataState],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
