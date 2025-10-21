import { Controller, Control } from 'react-hook-form'

export default function RHFText({
  name,
  control,
  label,
  type = 'text',
  placeholder
}: {
  name: string
  control: Control<any>
  label: string
  type?: string
  placeholder?: string
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-1">
          <label className="text-sm font-medium">{label}</label>
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-md border px-3 py-2 ${
              fieldState.error ? 'border-red-500' : 'border-zinc-300'
            }`}
          />
          {fieldState.error && <p className="text-xs text-red-600">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
