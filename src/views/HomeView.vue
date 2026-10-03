<script setup lang="ts">
import { useMangas } from '@/composables/useMangas'
const { estatisticas } = useMangas()
</script>

<template>
  <div>
    <h1 class="text-h4 mb-2">Bem-vindo à Biblioteca de Mangás</h1>
    <p class="text-medium-emphasis mb-6">
      Aplicação de exemplo com CRUD, página de consulta com filtros combinados e persistência em <code>localStorage</code>.
    </p>

    <v-row class="mb-6">
      <v-col cols="12" md="4">
        <v-card color="primary" variant="tonal" rounded="lg">
          <v-card-text>
            <div class="text-caption">Total de Mangás</div>
            <div class="text-h4 font-weight-bold">{{ estatisticas.total }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="secondary" variant="tonal" rounded="lg">
          <v-card-text>
            <div class="text-caption">Nota Média</div>
            <div class="text-h4 font-weight-bold">{{ estatisticas.media }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="success" variant="tonal" rounded="lg">
          <v-card-text>
            <div class="text-caption">Volumes na Coleção</div>
            <div class="text-h4 font-weight-bold">{{ estatisticas.volumes }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="2">
          <v-card-item>
            <v-card-title>Gerenciar mangás</v-card-title>
            <v-card-subtitle>Cadastrar, editar e excluir registros.</v-card-subtitle>
          </v-card-item>
          <v-card-actions>
            <v-btn color="primary" to="/crud" prepend-icon="mdi-table-edit">Abrir CRUD</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card rounded="lg" elevation="2">
          <v-card-item>
            <v-card-title>Consultar acervo</v-card-title>
            <v-card-subtitle>Busca textual + filtros por seleção, ano, data e booleano.</v-card-subtitle>
          </v-card-item>
          <v-card-actions>
            <v-btn color="secondary" to="/consulta" prepend-icon="mdi-magnify-scan">Ir para consulta</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>