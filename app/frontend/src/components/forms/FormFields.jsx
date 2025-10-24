import React from 'react';
import { useFormContext } from 'react-hook-form';
import { clsx } from 'clsx';

export default function FormField({ 
  name, 
  label, 
  type = 'text',
  placeholder,
  required = false,
  ...props 
}) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={clsx(
          'w-full rounded-lg border px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent',
          error 
            ? 'border-rose-300 bg-rose-50' 
            : 'border-slate-300 bg-white'
        )}
        {...register(name)}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-rose-600 flex items-center gap-1">
          <span>⚠️</span>
          {error.message}
        </p>
      )}
    </div>
  );
}