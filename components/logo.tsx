import Image from "next/image";

export default function Logo({ className, size = "default" }: { className?: string; size?: "default" | "large" }) {
  const sizeClasses = size === "large" ? "h-24 w-24" : "h-10 w-10";
  const dimensions = size === "large" ? 96 : 40;

  return (
    <Image 
      src="/images/logo.png" 
      alt="Neues Leben" 
      width={dimensions}
      height={dimensions}
      className={`${sizeClasses} ${className || ''} object-contain`}
      draggable={false}
      priority
      unoptimized
    />
  );
}
