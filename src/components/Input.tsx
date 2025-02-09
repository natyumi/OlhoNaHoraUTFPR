interface IInput {
  title?: string
  titleColor?: string
  placeholder?: string
  type?: string
  width?: string
  value?: string | number
  onChange: (e: any) => void
  required?: boolean
  inputSize?: string
}

export default function Input({
  title,
  placeholder = '',
  type = 'text',
  width = 'w-full',
  onChange,
  value,
  required,
  inputSize = 'input-sm',
  titleColor = 'text-secondary',
}: IInput) {
  return (
    <div className={`${width}`}>
      {title && (
        <p className={`text-sm font-medium ${titleColor} mb-2`}>
          {title} {required && <span className="text-error">*</span>}
        </p>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`input ${inputSize} w-full ${width} input-bordered border-gray-200`}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
