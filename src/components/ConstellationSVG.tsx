export function ConstellationSVG() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(242, 100%, 68%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(191, 96%, 59%)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Constellation dots */}
      <circle cx="15%" cy="20%" r="2" fill="url(#constellation-gradient)" />
      <circle cx="25%" cy="15%" r="1.5" fill="url(#constellation-gradient)" />
      <circle cx="35%" cy="25%" r="2" fill="url(#constellation-gradient)" />
      <circle cx="45%" cy="18%" r="1" fill="url(#constellation-gradient)" />
      <circle cx="55%" cy="22%" r="2" fill="url(#constellation-gradient)" />
      <circle cx="65%" cy="16%" r="1.5" fill="url(#constellation-gradient)" />
      <circle cx="75%" cy="20%" r="1" fill="url(#constellation-gradient)" />
      <circle cx="85%" cy="24%" r="2" fill="url(#constellation-gradient)" />
      
      {/* Connecting lines */}
      <line x1="15%" y1="20%" x2="25%" y2="15%" stroke="url(#constellation-gradient)" strokeWidth="0.5" />
      <line x1="25%" y1="15%" x2="35%" y2="25%" stroke="url(#constellation-gradient)" strokeWidth="0.5" />
      <line x1="35%" y1="25%" x2="45%" y2="18%" stroke="url(#constellation-gradient)" strokeWidth="0.5" />
      <line x1="45%" y1="18%" x2="55%" y2="22%" stroke="url(#constellation-gradient)" strokeWidth="0.5" />
      <line x1="55%" y1="22%" x2="65%" y2="16%" stroke="url(#constellation-gradient)" strokeWidth="0.5" />
      <line x1="65%" y1="16%" x2="75%" y2="20%" stroke="url(#constellation-gradient)" strokeWidth="0.5" />
      <line x1="75%" y1="20%" x2="85%" y2="24%" stroke="url(#constellation-gradient)" strokeWidth="0.5" />
      
      {/* Orbital paths */}
      <ellipse
        cx="50%"
        cy="50%"
        rx="35%"
        ry="15%"
        fill="none"
        stroke="url(#constellation-gradient)"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <ellipse
        cx="50%"
        cy="50%"
        rx="28%"
        ry="12%"
        fill="none"
        stroke="url(#constellation-gradient)"
        strokeWidth="0.5"
        opacity="0.3"
        transform="rotate(30 50% 50%)"
      />
    </svg>
  );
}
