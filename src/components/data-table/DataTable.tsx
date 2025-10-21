import { useMemo, useState } from 'react'
import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'

export default function DataTable<T>({ data, columns }: { data: T[]; columns: ColumnDef<T, any>[] }) {
  const [page, setPage] = useState(0)
  const pageSize = 10
  const pageCount = Math.ceil(data.length / pageSize) || 1
  const paged = useMemo(() => data.slice(page * pageSize, (page + 1) * pageSize), [data, page])

  const table = useReactTable({ data: paged, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th key={h.id} className="px-3 py-2 text-left">
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((r) => (
              <tr key={r.id} className="border-t">
                {r.getVisibleCells().map((c) => (
                  <td key={c.id} className="px-3 py-2">
                    {flexRender(c.column.columnDef.cell, c.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <button disabled={page === 0} onClick={() => setPage(0)} className="px-2 py-1 border rounded">
          ⏮
        </button>
        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="px-2 py-1 border rounded">
          ◀
        </button>
        <span>
          página {page + 1} de {pageCount}
        </span>
        <button
          disabled={page >= pageCount - 1}
          onClick={() => setPage((p) => p + 1)}
          className="px-2 py-1 border rounded"
        >
          ▶
        </button>
        <button
          disabled={page >= pageCount - 1}
          onClick={() => setPage(pageCount - 1)}
          className="px-2 py-1 border rounded"
        >
          ⏭
        </button>
      </div>
    </div>
  )
}
