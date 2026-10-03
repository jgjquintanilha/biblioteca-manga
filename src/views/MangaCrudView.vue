<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMangas } from '@/composables/useMangas'
import MangaFormDialog from '@/components/MangaFormDialog.vue'
import type { Manga, MangaPayload } from '@/types/manga'

const { mangas, carregar, criar, atualizar, remover } = useMangas()

onMounted(() => carregar(false))

const dialog = ref(false)
const editando = ref<Manga | null>(null)

const dialogDelete = ref(false)
const alvoDelete = ref<Manga | null>(null)

const snack = ref(false)
const snackMsg = ref('')
const snackColor = ref<'success' | 'error'>('success')

const total = computed(() => mangas.value.length)

const abrirNovo = () => {
  editando.value = null
  dialog.value = true
}

const abrirEdicao = (m: Manga) => {
  editando.value = m
  dialog.value = true
}

const onSubmit = (payload: MangaPayload, id: string | null) => {
  try {
    if (id) {
      atualizar(id, payload)
      notificar('Mangá atualizado com sucesso!', 'success')
    } else {
      criar(payload)
      notificar('Mangá cadastrado com sucesso!', 'success')
    }
  } catch (e: any) {
    notificar(e?.message ?? 'Erro ao salvar.', 'error')
  }
}

const pedirExclusao = (m: Manga) => {
  alvoDelete.value = m
  dialogDelete.value = true
}

const confirmarExclusao = () => {
  if (!alvoDelete.value) return
  const ok = remover(alvoDelete.value.id)
  notificar(ok ? 'Mangá excluído com sucesso!' : 'Mangá não encontrado.', ok ? 'success' : 'error')
  dialogDelete.value = false
  alvoDelete.value = null
}

const notificar = (msg: string, color: 'success' | 'error') => {
  snackMsg.value = msg
  snackColor.value = color
  snack.value = true
}

const headers = [
  { title: 'Título', key: 'titulo' },
  { title: 'Autor', key: 'autor' },
  { title: 'Gênero', key: 'genero' },
  { title: 'Status', key: 'status' },
  { title: 'Ano', key: 'ano' },
  { title: 'Vol.', key: 'volumes', align: 'end' as const },
  { title: 'Nota', key: 'nota', align: 'end' as const },
  { title: 'Aquisição', key: 'dataAquisicao' },
  { title: 'Lido', key: 'lido', align: 'center' as const },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' as const }
]
</script>

<template>
  <div>
    <v-row class="mb-2" align="center">
      <v-col cols="12" md="8">
        <h2 class="text-h5">Gerenciar Mangás</h2>
        <div class="text-medium-emphasis text-body-2">{{ total }} registro(s) na base</div>
      </v-col>
      <v-col cols="12" md="4" class="text-md-right">
        <v-btn color="primary" prepend-icon="mdi-plus" @click="abrirNovo">Novo Mangá</v-btn>
      </v-col>
    </v-row>

    <v-card rounded="lg" elevation="2">
      <v-data-table
        :headers="headers"
        :items="mangas"
        item-value="id"
        density="comfortable"
        hover
        :items-per-page="10"
      >
        <template #item.dataAquisicao="{ item }">
          {{ new Date(item.dataAquisicao + 'T00:00:00').toLocaleDateString('pt-BR') }}
        </template>

        <template #item.lido="{ item }">
          <v-icon :color="item.lido ? 'success' : 'grey'" :icon="item.lido ? 'mdi-check-circle' : 'mdi-circle-outline'" />
        </template>

        <template #item.nota="{ item }">
          {{ Number(item.nota).toFixed(1) }}
        </template>

        <template #item.actions="{ item }">
          <v-btn icon="mdi-pencil" size="small" variant="text" color="secondary" @click="abrirEdicao(item)" />
          <v-btn icon="mdi-delete" size="small" variant="text" color="error" @click="pedirExclusao(item)" />
        </template>

        <template #no-data>
          <v-empty-state icon="mdi-book-off" title="Nenhum mangá cadastrado"
            text="Clique em Novo Mangá para começar." />
        </template>
      </v-data-table>
    </v-card>

    <!-- Formulário reutilizável -->
    <MangaFormDialog v-model="dialog" :manga="editando" @submit="onSubmit" />

    <!-- Confirmação de exclusão -->
    <v-dialog v-model="dialogDelete" max-width="420">
      <v-card>
        <v-card-title>Remover mangá?</v-card-title>
        <v-card-text>
          Deseja excluir <strong>{{ alvoDelete?.titulo }}</strong>? Esta ação não pode ser desfeita.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialogDelete = false">Cancelar</v-btn>
          <v-btn color="error" variant="flat" @click="confirmarExclusao">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar de feedback -->
    <v-snackbar v-model="snack" :color="snackColor" timeout="3000" location="bottom right">
      {{ snackMsg }}
      <template #actions>
        <v-btn variant="text" @click="snack = false">Fechar</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>