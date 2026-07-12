export function AuraLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="aura-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7BA6FF" />
          <stop offset="0.5" stopColor="#4C6EF5" />
          <stop offset="1" stopColor="#22307A" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="10" fill="url(#aura-g)" />
      <path d="M12 26 L20 12 L28 26 M15 22 H25" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="30" cy="10" r="2.2" fill="#F5D06A" />
    </svg>
  );
}
