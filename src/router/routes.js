
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'Account', name: 'Account', component: () => import('pages/Account.vue') },
      { path: 'Dashboard', name: 'Dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'posts', name: 'PostIndex', component: () => import('pages/Post/Index.vue') },
      { path: 'posts/add', name: 'PostCreate', component: () => import('pages/Post/Create.vue') },
      { path: 'posts/edit/:id', name: 'PostEdit', component: () => import('pages/Post/Edit.vue') },
      { path: 'lead-status', name: 'LeadStatus', component: () => import('pages/Lead/LeadStatus.vue')},
      { path: 'leads', name: 'LeadIndex', component: () => import('pages/Lead/LeadIndex.vue')},
      { path: 'lead/edit/:id', name: 'LeadEdit', component: () => import('pages/Lead/LeadEdit.vue')},
      { path: 'events', name: 'EventIndex', component: () => import('pages/Event/Index.vue') },
      { path: 'events/add', name: 'EventCreate', component: () => import('pages/Event/Create.vue') },
      { path: 'events/edit/:id', name: 'EventEdit', component: () => import('pages/Event/Edit.vue') },
      { path: 'parts', name: 'PartIndex', component: () => import('pages/Part/PartIndex.vue')},
      { path: 'parts/edit/:id', name: 'PartEdit', component: () => import('pages/Part/PartEdit.vue')},
      { path: 'parts/new', name: 'PartCreate', component: () => import('pages/Part/PartCreate.vue')},
      { path: 'Vehicles', name: 'Vehicles', component: () => import('pages/Vehicle/Index.vue') },
      { path: 'Vehicle/add', name: 'VehicleCreate', component: () => import('pages/Vehicle/Create.vue') },
      { path: 'Vehicle/edit/:id', name: 'VehicleEdit', component: () => import('pages/Vehicle/Edit.vue') },
      { path: 'orders', name: 'OrderIndex', component: () => import('pages/Order/OrderIndex.vue')},
      { path: 'orders/create', name: 'OrderCreate', component: () => import('pages/Order/OrderForm.vue')},
      { path: 'orders/edit/:id', name: 'OrderEdit', component: () => import('pages/Order/OrderForm.vue')},
      { path: 'banners/add', name: 'BannerCreate', component: () => import('pages/Banner/Create.vue') },
      { path: 'banners/edit/:id', name: 'BannerEdit', component: () => import('pages/Banner/Edit.vue') },
      { path: 'banners', name: 'BannerIndex', component: () => import('pages/Banner/Index.vue') },
      { path: 'layanan/new', name: 'LayananCreate', component: () => import('src/pages/Layanan/LayananForm.vue')},
      { path: 'layanan/edit/:id', name: 'LayananEdit', component: () => import('pages/Layanan/LayananEdit.vue')},
      { path: 'layanan', name: 'LayananIndex', component: () => import('pages/Layanan/LayananIndex.vue')},
      { path: 'paygate-config', name: 'PaygateConfig', component: () => import('pages/Config/PaygateConfig.vue')},
    ]
  },
  {
    path: '/auth',
    meta: { requiresGuest: true },
    component: () => import('layouts/FormLayout.vue'),
    children: [
      { path: 'login', name: 'Login', component: () => import('pages/Auth/Login.vue') },
      { path: 'register', name: 'Register', component: () => import('pages/Auth/Register.vue') },
      { path: 'forgot-password', name: 'ForgotPassword', component: () => import('pages/Auth/ForgotPassword.vue') },
      { path: 'reset-password', name: 'ResetPassword', component: () => import('pages/Auth/ResetPassword.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
