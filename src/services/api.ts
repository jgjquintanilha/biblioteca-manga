import axios from 'axios'

const viaCep = axios.create({
  baseURL: 'https://viacep.com.br/ws',
  timeout: 8000
})

export interface EnderecoViaCep {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

/** Consulta o CEP na ViaCEP e devolve o endereço normalizado. */
export async function buscarEnderecoPorCep(cep: string): Promise<EnderecoViaCep> {
  const limpo = cep.replace(/\D/g, '')
  if (limpo.length !== 8) throw new Error('CEP deve conter 8 dígitos.')
  const { data } = await viaCep.get<EnderecoViaCep>(`/${limpo}/json/`)
  if (data.erro) throw new Error('CEP não encontrado.')
  return data
}