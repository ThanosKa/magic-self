import React from "react";

export const Logo = ({ className = "w-12 h-12" }: { className?: string }) => (
    <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect x="20" y="30" width="50" height="45" rx="6" stroke="currentColor" strokeWidth="3" transform="rotate(-10 50 50)" opacity="0.4" />
        <rect x="25" y="30" width="50" height="45" rx="6" stroke="currentColor" strokeWidth="3" transform="rotate(-5 50 50)" opacity="0.7" />
        <rect x="30" y="30" width="50" height="45" rx="6" stroke="currentColor" strokeWidth="3" fill="none" />

        <line x1="40" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="40" y1="65" x2="60" y2="65" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
);
