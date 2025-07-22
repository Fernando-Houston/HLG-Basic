import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  as?: 'input' | 'textarea' | 'select';
  children?: ReactNode;
  rows?: number;
  className?: string;
}

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  as = 'input',
  children,
  rows = 4,
  className = ''
}: FormFieldProps) {
  const baseClassName = `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition-all ${
    error 
      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-green-600'
  } ${className}`;

  const Component = as;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {as === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          {children}
        </select>
      ) : as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={baseClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClassName}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-red-600 flex items-center" role="alert">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}