export type ID = string

export interface Marca {
  id: ID
  nome: string
}

export interface Loja {
  id: ID
  marcaId: ID
  loja: string
  municipio: string
  uf: string
}

export interface Parceiro {
  id: ID
  parceiro: string
  distribuidora?: string
  cidade: string
  estado: string
  cnpj_cpf: string
  telefone: string
  email?: string
}

export interface Connection {
  id: ID
  parceiroId: ID
  lojaId: ID
  criadoEm: string
}
