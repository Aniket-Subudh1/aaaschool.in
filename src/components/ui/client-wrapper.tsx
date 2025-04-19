"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
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
      {isLoading ? (
        <Loader />
      ) : (
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      )}
    </>
  );
};
