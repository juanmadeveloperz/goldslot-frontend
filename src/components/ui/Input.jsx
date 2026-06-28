export default function Input({ 
  placeholder, 
  value, 
  onChange,
  type = 'text',
  className = '',
  ...props 
}) {
  const baseStyles = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';
  
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
}