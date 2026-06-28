export default function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}