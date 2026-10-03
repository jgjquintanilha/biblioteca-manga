export type StatusManga = 'Em andamento' | 'Completo' | 'Hiato' | 'Cancelado'
export type GeneroManga =
  | 'Ação' | 'Aventura' | 'Fantasia' | 'Romance'
  | 'Terror' | 'Sobrenatural' | 'Drama' | 'Comédia'

export interface Manga {
  id: string
  titulo: string          
  autor: string           
  editora: string         
  genero: GeneroManga     
  status: StatusManga     
  ano: number             
  volumes: number         
  nota: number            
  dataAquisicao: string   
  lido: boolean           
  cepCompra: string       
  localCompra: string     
  sinopse: string         
  capa: string            
  createdAt: string
  updatedAt: string
}

export type MangaPayload = Omit<Manga, 'id' | 'createdAt' | 'updatedAt'>