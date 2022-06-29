
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/Account', name: 'Account', component: () => import('pages/Account.vue') },
      { path: '/Dashboard', name: 'Dashboard', component: () => import('pages/Dashboard.vue') },
      { path: '/posts', name: 'PostIndex', component: () => import('pages/Post/Index.vue') },
      { path: '/posts/add', name: 'PostCreate', component: () => import('pages/Post/Create.vue') },
      { path: '/posts/edit/:id', name: 'PostEdit', component: () => import('pages/Post/Edit.vue') },
      { path: '/lead-status', name: 'LeadStatus', component: () => import('pages/Lead/LeadStatus.vue')},
      { path: '/leads', name: 'LeadIndex', component: () => import('pages/Lead/LeadIndex.vue')},
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
