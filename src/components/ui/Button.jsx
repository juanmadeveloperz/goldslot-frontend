export default function Button({ 
  children, 
  onClick, 
  type = 'button',
  className = '',
  disabled = false,
  ...props 
}) {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const defaultStyles = 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${defaultStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}