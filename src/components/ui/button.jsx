export function Button({ 
  className, 
  variant = 'default', 
  size = 'default',
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    default: 'bg-white text-black hover:bg-gray-200',
    outline: 'border border-gray-600 text-white hover:bg-gray-900',
    ghost: 'text-white hover:bg-gray-900',
  }
  
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
      {...props}
    />
  )
}
