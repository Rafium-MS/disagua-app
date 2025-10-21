import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { parceiroSchema } from '@/services/schemas'
import RHFText from '@/components/form/RHFText'
import { parceirosRepo } from '@/services/repo'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/components/data-table/DataTable'
import { useState } from 'react'

export default function Contatos() {
  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(parceiroSchema) })
  const [tick, setTick] = useState(0)
  const force = () => setTick((t) => t + 1)
  const onSubmit = (data: any) => {
    parceirosRepo.add(data)
    reset()
    force()
  }

  const data = parceirosRepo.all()
  const columns: ColumnDef<any>[] = [
    { accessorKey: 'parceiro', header: 'Parceiro' },
    { accessorKey: 'distribuidora', header: 'Distribuidora' },
    { accessorKey: 'cidade', header: 'Cidade' },
    { accessorKey: 'estado', header: 'UF' },
    { accessorKey: 'telefone', header: 'Telefone' },
    { accessorKey: 'email', header: 'E-mail' },
    {
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 border rounded"
            onClick={() => {
              parceirosRepo.remove(row.original.id)
              force()
            }}
          >
            Excluir
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Contatos (Parceiros)</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <RHFText name="parceiro" control={control} label="Parceiro" />
        <RHFText name="distribuidora" control={control} label="Distribuidora" />
        <RHFText name="cidade" control={control} label="Cidade" />
        <RHFText name="estado" control={control} label="UF" />
        <RHFText name="cnpj_cpf" control={control} label="CNPJ/CPF" />
        <RHFText name="telefone" control={control} label="Telefone" />
        <RHFText name="email" control={control} label="E-mail" type="email" />
        <div className="col-span-2 flex gap-2">
          <button className="px-3 py-2 border rounded" type="submit">
            Salvar
          </button>
          <button className="px-3 py-2 border rounded" type="button" onClick={() => reset()}>
            Limpar
          </button>
        </div>
      </form>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
