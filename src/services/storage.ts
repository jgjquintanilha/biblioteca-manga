import { v4 as uuid } from 'uuid'
import type { Manga, MangaPayload } from '@/types/manga'

const KEY = 'biblioteca:mangas'

class MangaStorage {
  private read(): Manga[] {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? (JSON.parse(raw) as Manga[]) : []
    } catch {
      return []
    }
  }

  private write(list: Manga[]): void {
    localStorage.setItem(KEY, JSON.stringify(list))
  }

  list(): Manga[] {
    return this.read().sort((a, b) => a.titulo.localeCompare(b.titulo))
  }

  find(id: string): Manga | undefined {
    return this.read().find((m) => m.id === id)
  }

  create(payload: MangaPayload): Manga {
    const now = new Date().toISOString()
    const manga: Manga = { id: uuid(), ...payload, createdAt: now, updatedAt: now }
    const list = this.read()
    list.push(manga)
    this.write(list)
    return manga
  }

  update(id: string, payload: MangaPayload): Manga | null {
    const list = this.read()
    const idx = list.findIndex((m) => m.id === id)
    if (idx === -1) return null
    list[idx] = { ...list[idx], ...payload, updatedAt: new Date().toISOString() }
    this.write(list)
    return list[idx]
  }

  remove(id: string): boolean {
    const list = this.read()
    const next = list.filter((m) => m.id !== id)
    if (next.length === list.length) return false
    this.write(next)
    return true
  }

  bulkInsert(items: Manga[]): void {
  const atual = this.read()
  const titulosExistentes = new Set(atual.map((m) => m.titulo.toLowerCase()))
  const novos = items.filter((i) => !titulosExistentes.has(i.titulo.toLowerCase()))
  this.write([...atual, ...novos])
  }
}

export const mangaStorage = new MangaStorage()