import * as yup from 'yup'

export const parceiroSchema = yup.object({
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().length(2, 'UF inválida').required('UF é obrigatória'),
  parceiro: yup.string().required('Nome do parceiro é obrigatório'),
  distribuidora: yup.string().optional(),
  cnpj_cpf: yup.string().required('CNPJ/CPF obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  email: yup.string().email('E-mail inválido').optional()
})

export const marcaSchema = yup.object({
  nome: yup.string().required('Nome da marca é obrigatório')
})

export const lojaSchema = yup.object({
  marcaId: yup.string().required('Marca é obrigatória'),
  loja: yup.string().required('Loja é obrigatória'),
  municipio: yup.string().required('Município é obrigatório'),
  uf: yup.string().length(2, 'UF inválida').required('UF é obrigatória')
})
