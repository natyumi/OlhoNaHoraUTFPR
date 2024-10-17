interface IInput{
  title?: string
  placeholder?: string
  type?: string
  width?: string
  value: string | number
  onChange: (e: any) => void
}

export default function Input({
  title,
  placeholder="",
  type = "text",
  width = "w-full",
  onChange,
  value
} : IInput) {
  return(
    <div className={`${width}`}>
      {title && (
        <p className="text-sm font-medium text-secondary mb-2">{title}</p>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`input input-sm w-full ${width} input-bordered border-gray-200`}
        onChange={onChange}
        value={value}
        tabIndex={0}
      />
    </div>
  )
}