export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M50 10C42.5 20 35 25 25 25C25 35 30 42.5 40 50C30 57.5 25 65 25 75C35 75 42.5 80 50 90C57.5 80 65 75 75 75C75 65 70 57.5 60 50C70 42.5 75 35 75 25C65 25 57.5 20 50 10Z"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M50 30C46.5 35 43 37.5 38 37.5C38 42.5 40.5 46 45 50C40.5 54 38 57.5 38 62.5C43 62.5 46.5 65 50 70C53.5 65 57 62.5 62 62.5C62 57.5 59.5 54 55 50C59.5 46 62 42.5 62 37.5C57 37.5 53.5 35 50 30Z"
        fill="white"
      />
    </svg>
  )
}
