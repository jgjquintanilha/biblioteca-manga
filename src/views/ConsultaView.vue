<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useMangas } from '@/composables/useMangas'
import type { GeneroManga, Manga, StatusManga } from '@/types/manga'

const { mangas, carregar } = useMangas()
onMounted(() => carregar(false))

const generos: GeneroManga[] = ['Ação','Aventura','Fantasia','Romance','Terror','Sobrenatural','Drama','Comédia']
const statuses: StatusManga[] = ['Em andamento','Completo','Hiato','Cancelado']
const lidoOpcoes = [
  { title: 'Todos', value: 'todos' },
  { title: 'Já lidos', value: 'sim' },
  { title: 'Não lidos', value: 'nao' }
]

const filtros = reactive({
  busca: '',
  genero: null as GeneroManga | null,
  status: null as StatusManga | null,
  anoDe: null as number | null,
  anoAte: null as number | null,
  dataDe: '' as string,
  dataAte: '' as string,
  lido: 'todos' as 'todos' | 'sim' | 'nao'
})

const resultado = computed(() => {
  const q = filtros.busca.trim().toLowerCase()
  return mangas.value.filter((m) => {
    // 1) Busca textual em vários campos
    const matchQ =
      !q ||
      m.titulo.toLowerCase().includes(q) ||
      m.autor.toLowerCase().includes(q) ||
      m.editora.toLowerCase().includes(q) ||
      m.sinopse.toLowerCase().includes(q) ||
      m.genero.toLowerCase().includes(q)

    // 2) Filtro por seleção (gênero)
    const matchGenero = !filtros.genero || m.genero === filtros.genero

    // 3) Filtro por seleção (status)
    const matchStatus = !filtros.status || m.status === filtros.status

    // 4) Intervalo numérico (ano)
    const matchAnoDe = filtros.anoDe == null || m.ano >= filtros.anoDe
    const matchAnoAte = filtros.anoAte == null || m.ano <= filtros.anoAte

    // 5) Intervalo de datas (aquisição)
    const matchDataDe = !filtros.dataDe || m.dataAquisicao >= filtros.dataDe
    const matchDataAte = !filtros.dataAte || m.dataAquisicao <= filtros.dataAte

    // 6) Filtro booleano (lido)
    const matchLido =
      filtros.lido === 'todos' ||
      (filtros.lido === 'sim' && m.lido) ||
      (filtros.lido === 'nao' && !m.lido)

    return (
      matchQ && matchGenero && matchStatus &&
      matchAnoDe && matchAnoAte && matchDataDe && matchDataAte && matchLido
    )
  })
})

const detalhe = ref<Manga | null>(null)
const abrirDetalhe = (_: Event, { item }: { item: Manga }) => {
  detalhe.value = item
}

const limparFiltros = () => {
  filtros.busca = ''
  filtros.genero = null
  filtros.status = null
  filtros.anoDe = null
  filtros.anoAte = null
  filtros.dataDe = ''
  filtros.dataAte = ''
  filtros.lido = 'todos'
}
</script>

<template>
  <div>
    <h2 class="text-h5 mb-1">Consulta de Mangás</h2>
    <p class="text-medium-emphasis mb-4">
      Visualize todos os registros cadastrados e combine filtros para localizar obras específicas.
    </p>

    <!-- Barra de filtros -->
    <v-card class="mb-4" rounded="lg" elevation="2">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="filtros.busca"
              label="Busca geral (título, autor, editora, sinopse...)"
              prepend-inner-icon="mdi-magnify"
              variant="outlined" density="comfortable" hide-details clearable
            />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="filtros.genero" :items="generos" label="Gênero"
              variant="outlined" density="comfortable" hide-details clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="filtros.status" :items="statuses" label="Status"
              variant="outlined" density="comfortable" hide-details clearable />
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field v-model.number="filtros.anoDe" label="Ano de" type="number"
              variant="outlined" density="comfortable" hide-details />
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model.number="filtros.anoAte" label="Ano até" type="number"
              variant="outlined" density="comfortable" hide-details />
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="filtros.dataDe" label="Aquisição de" type="date"
              variant="outlined" density="comfortable" hide-details />
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field v-model="filtros.dataAte" label="Aquisição até" type="date"
              variant="outlined" density="comfortable" hide-details />
          </v-col>

          <v-col cols="12" md="6">
            <v-select v-model="filtros.lido" :items="lidoOpcoes" label="Situação de leitura"
              variant="outlined" density="comfortable" hide-details />
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-center justify-end">
            <v-btn variant="tonal" color="secondary" prepend-icon="mdi-filter-off" @click="limparFiltros">
              Limpar filtros
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Contador de resultados -->
    <v-alert type="info" variant="tonal" density="comfortable" class="mb-4">
      <strong>{{ resultado.length }}</strong> registro(s) encontrado(s)
      <span v-if="resultado.length !== mangas.length"> de {{ mangas.length }} no total</span>.
    </v-alert>

    <!-- Sem resultados -->
    <v-empty-state
      v-if="resultado.length === 0"
      icon="mdi-filter-remove-outline"
      title="Nenhum mangá atende aos filtros"
      text="Tente ajustar ou limpar os filtros aplicados."
    >
      <template #actions>
        <v-btn color="primary" @click="limparFiltros" prepend-icon="mdi-filter-off">Limpar filtros</v-btn>
      </template>
    </v-empty-state>

    <!-- Resultado -->
        <v-data-table
      v-else
      :headers="[
        { title: 'Capa', key: 'capa', sortable: false },
        { title: 'Título', key: 'titulo' },
        { title: 'Autor', key: 'autor' },
        { title: 'Editora', key: 'editora' },
        { title: 'Gênero', key: 'genero' },
        { title: 'Status', key: 'status' },
        { title: 'Ano', key: 'ano' },
        { title: 'Vol.', key: 'volumes' },
        { title: 'Nota', key: 'nota' },
        { title: 'Aquisição', key: 'dataAquisicao' },
        { title: 'CEP', key: 'cepCompra' },
        { title: 'Local', key: 'localCompra' },
        { title: 'Sinopse', key: 'sinopse' },
        { title: 'Lido', key: 'lido' }
      ]"
      :items="resultado"
      item-value="id"
      density="comfortable"
      :items-per-page="10"
            hover
      @click:row="abrirDetalhe"
    >
      <template #item.capa="{ item }">
        <v-img :src="item.capa" width="40" height="56" cover class="rounded my-1" />
      </template>
      <template #item.dataAquisicao="{ item }">
        {{ new Date(item.dataAquisicao + 'T00:00:00').toLocaleDateString('pt-BR') }}
      </template>
      <template #item.nota="{ item }">{{ Number(item.nota).toFixed(1) }}</template>
      <template #item.sinopse="{ item }">
        <div class="text-truncate" style="max-width: 220px" :title="item.sinopse">
          {{ item.sinopse }}
        </div>
      </template>
      <template #item.lido="{ item }">
        <v-chip :color="item.lido ? 'success' : 'grey'" size="small" variant="tonal">
          {{ item.lido ? 'Sim' : 'Não' }}
        </v-chip>
      </template>
    </v-data-table>
        <v-dialog :model-value="!!detalhe" max-width="640" @update:model-value="detalhe = null">
      <v-card v-if="detalhe" rounded="lg">
        <v-card-title class="d-flex align-center">
          <span class="text-wrap">{{ detalhe.titulo }}</span>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" @click="detalhe = null" />
        </v-card-title>
        <v-divider />
        <v-card-text style="max-height: 70vh; overflow-y: auto">
          <v-row>
            <v-col cols="12" sm="4">
              <v-img :src="detalhe.capa" aspect-ratio="0.71" cover class="rounded" />
            </v-col>
            <v-col cols="12" sm="8">
              <div><strong>Autor:</strong> {{ detalhe.autor }}</div>
              <div><strong>Editora:</strong> {{ detalhe.editora }}</div>
              <div><strong>Gênero:</strong> {{ detalhe.genero }}</div>
              <div><strong>Status:</strong> {{ detalhe.status }}</div>
              <div><strong>Ano:</strong> {{ detalhe.ano }} · <strong>Vol.:</strong> {{ detalhe.volumes }}</div>
              <div><strong>Nota:</strong> {{ Number(detalhe.nota).toFixed(1) }}</div>
              <div>
                <strong>Aquisição:</strong>
                {{ new Date(detalhe.dataAquisicao + 'T00:00:00').toLocaleDateString('pt-BR') }}
              </div>
              <div><strong>CEP:</strong> {{ detalhe.cepCompra }}</div>
              <div><strong>Local:</strong> {{ detalhe.localCompra }}</div>
              <div><strong>Lido:</strong> {{ detalhe.lido ? 'Sim' : 'Não' }}</div>
            </v-col>
            <v-col cols="12">
              <strong>Sinopse</strong>
              <p class="mt-1">{{ detalhe.sinopse }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>