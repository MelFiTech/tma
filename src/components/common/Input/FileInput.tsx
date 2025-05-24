'use client'

import { forwardRef, useState, useCallback } from 'react'

interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
  onFileChange?: (file: File | null) => void
  previewUrl?: string | null
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, className = '', onFileChange, ...props }, ref) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setSelectedFile(file)
        onFileChange?.(file)
      }
    }, [onFileChange])

    const handleDelete = useCallback(() => {
      setSelectedFile(null)
      onFileChange?.(null)
      // Reset the input value so the same file can be selected again
      if (ref && 'current' in ref && ref.current) {
        ref.current.value = ''
      }
    }, [onFileChange, ref])

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="flex items-center gap-2">
          <input
            ref={ref}
            type="file"
            onChange={handleChange}
            accept="image/*"
            className={`
              block w-full rounded-md border border-gray-300 shadow-sm h-[64px] p-3
              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100
              ${error ? 'border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
          {selectedFile && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 text-red-600 hover:text-red-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">
            Selected file: {selectedFile.name}
          </p>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

FileInput.displayName = 'FileInput'