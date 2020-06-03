import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/popup',
    component: () => import('layouts/PopupLayout.vue'),
    children: [{ path: '', component: () => import('pages/popup/Index.vue') }]
  },
  {
    path: '',
    component: () => import('layouts/NotifierLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/notifier/Login.vue')
      },
      {
        path: 'post',
        component: () => import('pages/notifier/Post.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
