import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function NotFound() {
  return (
    <div className="min-h-screen flex -mt-24 flex-col items-center justify-center bg-[#f5f0e1] text-[#800020]">
      <div className="mb-8">
        <Image
          width={256}
          height={256}
          src="https://aaaschool.s3.ap-south-1.amazonaws.com/aaa.png" 
          alt="Aryavart Ancient Academy Logo" 
          className="w-64 h-auto"
        />
      </div>
      
      {/* Error Message */}
      <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
      <p className="text-xl mb-6">The page you are looking for doesn&apos;t exist or has been moved.</p>
      
      <div className="w-48 h-1 bg-[#800020] mb-6"></div>
      
      {/* Return Button */}
      <Link 
        href="/"
        className="px-6 py-3 bg-[#800020] text-[#f5f0e1] rounded-md hover:bg-[#5e0018] transition-colors duration-300"
      >
        Return to Homepage
      </Link>
      
      {/* Footer */}
      <div className="mt-16 text-sm">
        <p>© {new Date().getFullYear()} Aryavart Ancient Academy</p>
      </div>
    </div>
  );
}