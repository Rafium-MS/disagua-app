import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { marcaSchema } from '@/services/schemas'
import RHFText from '@/components/form/RHFText'
import { marcasRepo } from '@/services/repo'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/components/data-table/DataTable'
import { useState } from 'react'

export default function Marcas() {
  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(marcaSchema) })
  const [tick, setTick] = useState(0)
  const force = () => setTick((t) => t + 1)
  const onSubmit = (data: any) => {
    marcasRepo.add(data)
    reset()
    force()
  }
  const data = marcasRepo.all()
  const columns: ColumnDef<any>[] = [
    { accessorKey: 'nome', header: 'Marca' },
    {
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 border rounded"
            onClick={() => {
              marcasRepo.remove(row.original.id)
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
      <h1 className="text-2xl font-semibold">Marcas</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <RHFText name="nome" control={control} label="Nome da marca" />
        <div className="col-span-2">
          <button className="px-3 py-2 border rounded" type="submit">
            Adicionar
          </button>
        </div>
      </form>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
