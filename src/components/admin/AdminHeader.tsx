"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function AdminHeader() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  
  const handleLogout = () => {
    Cookies.remove('admin-token');
    router.push('/admin/login');
  };
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <button 
              type="button" 
              className="md:hidden mr-4 text-[#5a3e36] hover:text-[#8b1a1a]"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <div className="flex items-center">
              <div className="relative mr-2">
                <Image
                  src="/aaa.png"
                  alt="Aryavart Ancient Academy Logo"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#8b1a1a]">AAA Admin</h1>
              </div>
            </div>
          </div>
          
          {/* Right side navigation */}
          <div className="flex items-center">
            <button 
              type="button" 
              className="p-2 mr-3 text-[#5a3e36] hover:text-[#8b1a1a] rounded-full hover:bg-gray-100"
            >
              <Bell size={20} />
            </button>
            
            <div className="relative">
              <button 
                type="button" 
                className="flex items-center text-[#5a3e36] hover:text-[#8b1a1a] focus:outline-none"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="h-8 w-8 rounded-full bg-[#8b1a1a] text-white flex items-center justify-center">
                  <User size={18} />
                </div>
                <span className="ml-2 hidden md:block">Admin</span>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50 overflow-hidden">
                  <button
                    type="button"
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}