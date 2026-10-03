import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
    { path: '/crud', name: 'crud', component: () => import('@/views/MangaCrudView.vue') },
    { path: '/consulta', name: 'consulta', component: () => import('@/views/ConsultaView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})