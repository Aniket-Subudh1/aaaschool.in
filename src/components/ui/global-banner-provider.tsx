"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BannerPopup from "@/components/ui/banner-popup";

interface Banner {
  _id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  order: number;
}

interface GlobalBannerProviderProps {
  children: React.ReactNode;
}

export default function GlobalBannerProvider({ children }: GlobalBannerProviderProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showBannerPopup, setShowBannerPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
 
    const isPageRefresh = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return navigation.type === 'reload';
      }
      
      try {
        const hasNavigated = sessionStorage.getItem('has-navigated');
        return !hasNavigated;
      } catch {
        return true; 
      }
    };

    if (isInitialLoad && isPageRefresh()) {
      fetchBanners();
    } else {
      setIsLoading(false);
    }

    setIsInitialLoad(false);

    try {
      sessionStorage.setItem('has-navigated', 'true');
    } catch {
    }
  }, [isInitialLoad]);

  useEffect(() => {
    const handlePopState = () => {
      setShowBannerPopup(false);
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        sessionStorage.removeItem('has-navigated');
      } catch {
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/banners?active=true');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setBanners(data);
          setShowBannerPopup(true);
        }
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseBannerPopup = () => {
    setShowBannerPopup(false);
  };

  return (
    <>
      {children}
      
      {!isLoading && showBannerPopup && banners.length > 0 && (
        <BannerPopup 
          banners={banners} 
          onClose={handleCloseBannerPopup} 
        />
      )}
    </>
  );
}