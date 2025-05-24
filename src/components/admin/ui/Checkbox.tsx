import React from 'react'

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  error?: string
}

export default function Checkbox({ 
  label, 
  description, 
  error, 
  className = '', 
  ...props 
}: CheckboxProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            {...props}
            className={`
              h-4 w-4 rounded border-gray-300 text-blue-600 
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
              disabled:cursor-not-allowed disabled:opacity-50
              ${error ? 'border-red-300' : 'border-gray-300'}
              ${className}
            `.trim()}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor={props.id} className="font-medium text-gray-900 cursor-pointer">
            {label}
          </label>
          {description && (
            <p className="text-gray-500">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center ml-7">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
} 