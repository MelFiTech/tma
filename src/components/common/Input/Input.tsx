'use client'

import { forwardRef } from 'react'

interface Option {
  value: string
  label: string
}

interface BaseProps {
  label?: string
  error?: string
  className?: string
}

interface InputProps extends BaseProps, React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'input'
}

interface SelectProps extends BaseProps, React.SelectHTMLAttributes<HTMLSelectElement> {
  variant: 'select'
  options: Option[]
}

export const Input = forwardRef<HTMLInputElement | HTMLSelectElement, InputProps | SelectProps>(
  ({ label, error, className = '', variant = 'input', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        {variant === 'select' ? (
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            className={`
              block w-full rounded-md border border-gray-300 shadow-sm h-[44px] px-3
              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...(props as SelectProps)}
          >
            <option value="">Select a category</option>
            {(props as SelectProps).options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            className={`
              block w-full rounded-md border border-gray-300 shadow-sm h-[44px] px-3
              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...(props as InputProps)}
          />
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'