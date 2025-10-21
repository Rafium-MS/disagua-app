import { Control, Controller } from 'react-hook-form'

interface Option {
  value: string
  label: string
}

export default function RHFSelect({
  name,
  control,
  label,
  options,
  placeholder
}: {
  name: string
  control: Control<any>
  label: string
  options: Option[]
  placeholder?: string
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          <label className="text-sm font-medium">{label}</label>
          <select
            {...field}
            className={`w-full rounded-md border px-3 py-2 ${
              fieldState.error ? 'border-red-500' : 'border-zinc-300'
            }`}
          >
            <option value="">{placeholder ?? 'Selecione...'}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
