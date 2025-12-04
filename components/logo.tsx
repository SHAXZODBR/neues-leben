export default function Logo({ className, size = "default" }: { className?: string; size?: "default" | "large" }) {
  const sizeClasses = size === "large" ? "h-24 w-24" : "h-10 w-10"

  return (
    <img 
      src="/images/logo.png" 
      alt="Neues Leben" 
      className={`${sizeClasses} ${className} object-contain`}
      draggable={false}
    />
  )
}
