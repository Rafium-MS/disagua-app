import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { lojaSchema } from '@/services/schemas'
import RHFText from '@/components/form/RHFText'
import RHFSelect from '@/components/form/RHFSelect'
import { lojasRepo, marcasRepo } from '@/services/repo'
import { ColumnDef } from '@tanstack/react-table'
import DataTable from '@/components/data-table/DataTable'
import { useState } from 'react'

export default function Lojas() {
  const marcas = marcasRepo.all()
  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(lojaSchema) })
  const [tick, setTick] = useState(0)
  const force = () => setTick((t) => t + 1)

  const onSubmit = (data: any) => {
    lojasRepo.add(data)
    reset()
    force()
  }

  const data = lojasRepo.all()

  const columns: ColumnDef<any>[] = [
    { accessorKey: 'loja', header: 'Loja' },
    { accessorKey: 'municipio', header: 'Município' },
    { accessorKey: 'uf', header: 'UF' },
    {
      header: 'Marca',
      cell: ({ row }) => marcas.find((m: any) => m.id === row.original.marcaId)?.nome || '—'
    },
    {
      header: 'Ações',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 border rounded"
            onClick={() => {
              lojasRepo.remove(row.original.id)
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
      <h1 className="text-2xl font-semibold">Lojas</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
        <RHFSelect
          name="marcaId"
          control={control}
          label="Marca"
          options={marcas.map((m: any) => ({ value: m.id, label: m.nome }))}
          placeholder="Selecione..."
        />
        <RHFText name="loja" control={control} label="Loja" />
        <RHFText name="municipio" control={control} label="Município" />
        <RHFText name="uf" control={control} label="UF" />
        <div className="col-span-3">
          <button className="px-3 py-2 border rounded" type="submit">
            Adicionar
          </button>
        </div>
      </form>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
