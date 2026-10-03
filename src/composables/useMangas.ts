import { ref, computed } from 'vue'
import { mangaStorage } from '@/services/storage'
import { gerarSeedMangas } from '@/services/seed'
import type { Manga, MangaPayload } from '@/types/manga'

const mangas = ref<Manga[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
let seedAplicado = false

export function useMangas() {
  const carregar = async () => {
    loading.value = true
    error.value = null
    try {
      let lista = mangaStorage.list()

      // Popula com o catálogo inicial apenas na primeira execução
      if (lista.length === 0 && !seedAplicado) {
        seedAplicado = true
        const seed = gerarSeedMangas()
        mangaStorage.bulkInsert(seed)
        lista = mangaStorage.list()
      }

      mangas.value = lista
    } catch (e: any) {
      error.value = e?.message ?? 'Erro ao carregar mangás'
    } finally {
      loading.value = false
    }
  }

  const buscarPorId = (id: string) => mangas.value.find((m) => m.id === id)

  const criar = (payload: MangaPayload) => {
    const novo = mangaStorage.create(payload)
    mangas.value = mangaStorage.list()
    return novo
  }

  const atualizar = (id: string, payload: MangaPayload) => {
    const atualizado = mangaStorage.update(id, payload)
    mangas.value = mangaStorage.list()
    return atualizado
  }

  const remover = (id: string) => {
    const ok = mangaStorage.remove(id)
    if (ok) mangas.value = mangaStorage.list()
    return ok
  }

  const estatisticas = computed(() => ({
    total: mangas.value.length,
    media: mangas.value.length
      ? Number((mangas.value.reduce((s, m) => s + m.nota, 0) / mangas.value.length).toFixed(2))
      : 0,
    volumes: mangas.value.reduce((s, m) => s + m.volumes, 0)
  }))

  return { mangas, loading, error, carregar, buscarPorId, criar, atualizar, remover, estatisticas }
}