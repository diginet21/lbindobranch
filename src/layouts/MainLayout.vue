<template>
  <q-layout view="lHh LpR lFf" class="bg-grey-1">
     <q-header class="box-shadow bg-white text-dark"  reveal>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="leftDrawerOpen? 'menu_open' :'menu'"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <img :src="sites.logo_src" v-if="sites && sites.logo" height="40">
          <span v-else>Lautan Berlian</span>
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn-dropdown dropdown round flat icon="account_circle">
          <q-list>
            <q-item clickable v-close-popup @click="$router.push({name: 'Account'})">
              <q-item-section avatar>
                <q-icon name="manage_accounts"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Setting Akun</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout">
              <q-item-section avatar>
                <q-icon name="logout"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label>Keluar</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      v-model="leftDrawerOpen"
      show-if-above
      :width="280"
      :breakpoint="800"
      :dark="drawerIsDark" 
      >
        <q-scroll-area style="height: 100%;">
          <!-- <q-img class="relative" src="~assets/lautan-berlian.jpg" :ratio="9/6">
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img src="~assets/boy-avatar.png">
              </q-avatar>
              <div class="text-weight-bold">admin</div>
              <div>admin@example.com</div>
            </div>
          </q-img> -->
          <!-- <q-list class="text-center bg-white" separator>
            <q-item>
              <img :src="sites.logo_src" v-if="sites && sites.logo" style="width:90%;">
              <span v-else>Lautan Berlian</span>
            </q-item>
          </q-list> -->
           <!-- <q-separator spaced /> -->
          <q-list :dark="drawerIsDark" class="q-pb-xl">
            <q-item class="q-pl-none">
              <q-item-section>
                <q-item-label header>Navigation</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle v-model="drawerIsDark" left-label label="Dark" size="sm" color="blue"></q-toggle>
              </q-item-section>
            </q-item>
            <template v-for="menu in expansionMenu" :key="menu.label">
            <q-item v-if="!menu.childs" clickable :to="{ name: menu.pathName }" exact>
              <q-item-section avatar>
                  <q-icon :name="menu.icon"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ menu.label }}</q-item-label>
                  <q-item-label caption>{{ menu.desc }}</q-item-label>
                </q-item-section>
                <q-item-section v-if="menu.count && menu.count > 0" side top>
                  <q-badge color="amber">New {{ menu.count }}</q-badge>
                </q-item-section>
            </q-item>
            <q-expansion-item  
              v-else
              :dark="drawerIsDark"
              class="main-menu" 
              :group="menu.group"
              :label="menu.label"
              :caption="menu.desc"
              :icon="menu.icon"
              expand-separator
              >
              <q-list separator dark>
                <q-item clickable v-ripple v-for="(menuItem, idx) in menu.childs" :key="idx" :to="{ name: menuItem.pathName }" class="q-px-lg q-py-sm"> 
                  <q-item-section side>
                    <q-icon name="radio_button_unchecked" size="18px"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ menuItem.label }}</q-item-label>
                  </q-item-section>
                   <q-item-section side v-if="menuItem.count">
                    <q-badge v-if="menuItem.count.value > 0" color="amber-9"> {{ menuItem.count }}</q-badge>
                  </q-item-section>
                </q-item>
              </q-list>
              </q-expansion-item>
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  setup () {

    const store = useStore()
    const sites = computed(() => store.state.site_setting)
    const leadCount = computed(() => store.state.lead.new_lead_count)

    const leftDrawerOpen = computed({
      get: () => store.state.drawer,
      set: (val) => store.commit('SET_DRAWER', val)
    })

    const isDark = ref(true)

    const branch = computed(() => store.state.branch)

    const drawerIsDark = computed({
      get() {
        return isDark.value
      },
      set(val) {
        isDark.value = val
        localStorage.setItem('drawer_isdark', val)
      }
    })

    const logout = () => {
      store.dispatch('user/logout')
    }
    if(!sites.value) {
      store.dispatch('getSite')
    }

    onMounted(() => {
      if(localStorage.getItem('drawer_isdark')) {
        isDark.value = localStorage.getItem('drawer_isdark') == 'true' ? true : false
      }
      store.dispatch('lead/getNewLeadCount')

      // if(!branch.value) {
      //   store.dispatch('getCurrentBranch')
      // }
    })

    return {
      drawerIsDark,
      sites,
      logout,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      isLogin: computed(() => store.state.user.isLogin),

      expansionMenu : [
        { pathName: 'Dashboard', label: 'Dashboard', icon: 'other_houses', desc: 'Dashboard'},
        { label: 'Vehicles', group: 'menu', icon: 'directions_car', desc: 'Manage Vehicle', pathName: 'Vehicles' },
        { label: 'Spareparts', group: 'menu', icon: 'space_dashboard', desc: 'Manage Sparepart',  pathName: 'PartIndex'},
        { label: 'Services', icon: 'settings_applications', desc: 'Manage Services', pathName: 'LayananIndex'},
        { label: 'Prio Weekly', group: 'menu', icon: 'wysiwyg', desc: 'Manage Prioweekly', pathName: 'PostIndex', },
        { label: 'Banner', icon: 'view_carousel', desc: 'Manage Banner', pathName: 'BannerIndex'},
        
        { label: 'Events', icon: 'event', desc: 'Manage Events', pathName: 'EventIndex'},
        { label: 'Leads', icon: 'leaderboard', desc: 'Manage Leads', pathName: 'LeadIndex', count: leadCount},
        { label: 'Orders', icon: 'event', desc: 'Manage Orders', pathName: 'OrderIndex'},
        { label: 'Settings', icon: 'settings', desc: 'Branch Settings', pathName: 'PaygateConfig'},

      ],
      menu2: [
        { path: '/auth/register', label: 'Register', icon: 'logout', desc: 'Register'},
        { path: '/auth/login', label: 'Login', icon: 'login', desc: 'Login'},
      ]
    }
  }
})
</script>
