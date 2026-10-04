<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { buscarEnderecoPorCep } from '@/services/api'
import type { Manga, MangaPayload, StatusManga, GeneroManga } from '@/types/manga'

const props = defineProps<{
  modelValue: boolean
  manga: Manga | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'submit', payload: MangaPayload, id: string | null): void
}>()

const generos: GeneroManga[] = ['Ação', 'Aventura', 'Fantasia', 'Romance', 'Terror', 'Sobrenatural', 'Drama', 'Comédia']
const statuses: StatusManga[] = ['Em andamento', 'Completo', 'Hiato', 'Cancelado']

const formRef = ref()
const loadingCep = ref(false)
const cepErro = ref<string | null>(null)

const vazio = (): MangaPayload => ({
  titulo: '',
  autor: '',
  editora: '',
  genero: 'Ação',
  status: 'Em andamento',
  ano: new Date().getFullYear(),
  volumes: 1,
  nota: 5,
  dataAquisicao: new Date().toISOString().slice(0, 10),
  lido: false,
  cepCompra: '',
  localCompra: '',
  sinopse: '',
  capa: 'https://picsum.photos/seed/novo-manga/300/420'
})

const form = reactive<MangaPayload>(vazio())

const isEdit = computed(() => !!props.manga)

const visible = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v)
})

watch(
  () => [props.modelValue, props.manga] as const,
  ([open, m]) => {
    if (!open) return
    cepErro.value = null
    Object.assign(form, m ? { ...m } : vazio())
  },
  { immediate: true }
)

const regras = {
  required: (v: any) => (v !== null && v !== undefined && v !== '') || 'Campo obrigatório',
  min: (n: number) => (v: any) => Number(v) >= n || `Deve ser ≥ ${n}`,
  max: (n: number) => (v: any) => Number(v) <= n || `Deve ser ≤ ${n}`,
  url: (v: string) => /^https?:\/\//.test(v || '') || 'URL inválida',
  cep: (v: string) => /^\d{5}-?\d{3}$/.test(v || '') || 'CEP no formato 00000-000'
}

const consultarCep = async () => {
  cepErro.value = null
  loadingCep.value = true
  try {
    const end = await buscarEnderecoPorCep(form.cepCompra)
    form.localCompra = `${end.logradouro}, ${end.bairro} - ${end.localidade}/${end.uf}`
  } catch (e: any) {
    cepErro.value = e?.message ?? 'Falha ao consultar o CEP.'
    form.localCompra = ''
  } finally {
    loadingCep.value = false
  }
}

const salvar = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  emit('submit', { ...form }, props.manga?.id ?? null)
  visible.value = false
}

const cancelar = () => (visible.value = false)
</script>

<template>
  <v-dialog v-model="visible" max-width="860" persistent scrollable>
    <v-card rounded="lg">
      <v-card-title class="d-flex align-center py-4">
        <v-icon :icon="isEdit ? 'mdi-pencil' : 'mdi-plus-circle'" class="mr-2" />
        {{ isEdit ? 'Editar Mangá' : 'Novo Mangá' }}
      </v-card-title>
      <v-divider />

      <v-form ref="formRef" @submit.prevent="salvar">
        <v-card-text style="max-height: calc(100vh - 220px); overflow-y: auto">
          <v-row>
            <v-col cols="12" md="8">
              <v-text-field v-model="form.titulo" label="Título *" variant="outlined" :rules="[regras.required]"
                prepend-inner-icon="mdi-book" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.autor" label="Autor *" variant="outlined" :rules="[regras.required]"
                prepend-inner-icon="mdi-account-edit" />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="form.editora" label="Editora *" variant="outlined" :rules="[regras.required]" />
            </v-col>
            <v-col cols="12" md="4">
              <v-select v-model="form.genero" :items="generos" label="Gênero *" variant="outlined"
                :rules="[regras.required]" />
            </v-col>
            <v-col cols="12" md="4">
              <v-select v-model="form.status" :items="statuses" label="Status *" variant="outlined"
                :rules="[regras.required]" />
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model.number="form.ano" label="Ano *" type="number" variant="outlined"
                :rules="[regras.required, regras.min(1900), regras.max(2100)]" />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model.number="form.volumes" label="Volumes *" type="number" variant="outlined"
                :rules="[regras.required, regras.min(1)]" />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model.number="form.nota" label="Nota (0-10) *" type="number" step="0.1" variant="outlined"
                :rules="[regras.required, regras.min(0), regras.max(10)]" />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="form.dataAquisicao" label="Data de aquisição *" type="date" variant="outlined"
                :rules="[regras.required]" />
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="form.cepCompra" label="CEP da compra *" variant="outlined"
                :rules="[regras.required, regras.cep]" :loading="loadingCep" :error-messages="cepErro ?? []"
                prepend-inner-icon="mdi-map-marker" append-inner-icon="mdi-magnify" @click:append-inner="consultarCep"
                @blur="form.cepCompra && consultarCep()" />
            </v-col>
            <v-col cols="12" md="8">
              <v-skeleton-loader v-if="loadingCep" type="text" class="mt-2" />
              <v-text-field v-else v-model="form.localCompra" label="Local de compra (auto-preenchido)"
                variant="outlined" readonly prepend-inner-icon="mdi-store" />
            </v-col>
            <v-col cols="12" md="4" class="d-flex align-center">
              <v-switch v-model="form.lido" color="primary" label="Já li esta obra?" hide-details inset />
            </v-col>

            <v-col cols="12">
              <v-text-field v-model="form.capa" label="URL da capa *" variant="outlined"
                :rules="[regras.required, regras.url]" prepend-inner-icon="mdi-image" />
            </v-col>

            <v-col cols="12">
              <v-textarea v-model="form.sinopse" label="Sinopse *" variant="outlined" rows="3" auto-grow
                :rules="[regras.required]" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />
        <v-card-actions class="pa-4">
          <v-btn variant="text" @click="cancelar" prepend-icon="mdi-arrow-left">Cancelar</v-btn>
          <v-spacer />
          <v-btn type="submit" color="primary" variant="flat" prepend-icon="mdi-content-save">
            {{ isEdit ? 'Atualizar' : 'Cadastrar' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>