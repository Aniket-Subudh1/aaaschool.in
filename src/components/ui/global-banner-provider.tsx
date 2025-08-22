"use client";

import { useState, useEffect } from "react";
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

  useEffect(() => {
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

    fetchBanners();
  }, []);

  const handleCloseBannerPopup = () => {
    setShowBannerPopup(false);
  };

  return (
    <>
      {children}
      
      {/* Global Banner Popup - Shows on every page load */}
      {!isLoading && showBannerPopup && banners.length > 0 && (
        <BannerPopup 
          banners={banners} 
          onClose={handleCloseBannerPopup} 
        />
      )}
    </>
  );
}