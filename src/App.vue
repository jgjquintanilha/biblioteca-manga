<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMangas } from '@/composables/useMangas'

const { carregar } = useMangas()
const drawer = ref(true)

const menu = [
  { title: 'Início', icon: 'mdi-home', to: '/' },
  { title: 'Gerenciar (CRUD)', icon: 'mdi-table-edit', to: '/crud' },
  { title: 'Consulta', icon: 'mdi-magnify-scan', to: '/consulta' }
]

onMounted(() => carregar(false))
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :permanent="$vuetify.display.mdAndUp" temporary>
      <v-list nav>
        <v-list-item
          v-for="m in menu" :key="m.to"
          :to="m.to" :prepend-icon="m.icon" :title="m.title" exact
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-app-bar-title>
        <v-icon icon="mdi-book-open-page-variant" class="mr-2" />
        Biblioteca de Mangás
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="py-6">
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="text-center d-flex justify-center">
      <span>FACET-SNP-310 · Avaliação 2 · Vue 3 + Vuetify 3 + localStorage</span>
    </v-footer>
  </v-app>
</template>