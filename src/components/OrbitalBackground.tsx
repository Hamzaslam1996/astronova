export function OrbitalBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a10] to-[#101820]" />
      
      {/* Rotating orbital lines */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="animate-[spin_60s_linear_infinite] origin-center">
          <ellipse
            cx="50%"
            cy="50%"
            rx="40%"
            ry="20%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
          />
          <ellipse
            cx="50%"
            cy="50%"
            rx="30%"
            ry="15%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
            transform="rotate(60 50% 50%)"
          />
          <ellipse
            cx="50%"
            cy="50%"
            rx="35%"
            ry="18%"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary"
            transform="rotate(120 50% 50%)"
          />
        </g>
      </svg>
    </div>
  );
}
