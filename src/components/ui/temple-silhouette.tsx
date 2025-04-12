"use client";

import { useEffect, useState } from "react";

export default function TempleSilhouette() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none"></div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none">
      <svg
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <rect x="0" y="180" width="1200" height="20" fill="#8b1a1a" />

        <rect x="200" y="160" width="800" height="20" fill="#8b1a1a" />
        <rect x="250" y="140" width="700" height="20" fill="#8b1a1a" />

        <rect x="300" y="60" width="600" height="80" fill="#8b1a1a" />

        <path
          d="M600,0 Q750,60 750,60 L450,60 Q450,60 600,0 Z"
          fill="#8b1a1a"
        />

        <path
          d="M400,40 Q450,60 450,60 L350,60 Q350,60 400,40 Z"
          fill="#8b1a1a"
        />
        <path
          d="M800,40 Q850,60 850,60 L750,60 Q750,60 800,40 Z"
          fill="#8b1a1a"
        />

        <rect x="350" y="60" width="20" height="80" fill="#f8f3e9" />
        <rect x="450" y="60" width="20" height="80" fill="#f8f3e9" />
        <rect x="550" y="60" width="20" height="80" fill="#f8f3e9" />
        <rect x="650" y="60" width="20" height="80" fill="#f8f3e9" />
        <rect x="750" y="60" width="20" height="80" fill="#f8f3e9" />
        <rect x="850" y="60" width="20" height="80" fill="#f8f3e9" />
      </svg>
    </div>
  );
}
