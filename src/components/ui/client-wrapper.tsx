"use client";

import { useState, useEffect } from "react";
import Loader from "./loader";

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Full-screen loader overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Hide content behind loader until it finishes */}
      <div className={isLoading ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
};
