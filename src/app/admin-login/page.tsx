"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, User, AlertCircle } from "lucide-react";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Log response status for debugging
      console.log('Login response status:', response.status);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Log token for debugging (only the first few characters)
      console.log('Token received:', data.token ? data.token.substring(0, 10) + '...' : 'None');

      // Save token in cookie with specific attributes
      Cookies.set("admin-token", data.token, { 
        expires: 1, // Expires in 1 day
        path: '/',
        sameSite: 'Lax' 
      });
      
      // Verify cookie was set
      const savedToken = Cookies.get('admin-token');
      console.log('Cookie set successfully:', !!savedToken);

      // Redirect to admin dashboard
      router.push("/admin");
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f3e9]">
      <div className="absolute inset-0 bg-cultural-pattern opacity-5"></div>
      
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg relative z-10 border border-[#d4b483]/30">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#8b1a1a]/10 rounded-full blur-sm"></div>
            <Image
              src="/aaa.png"
              alt="Aryavart Ancient Academy Logo"
              width={100}
              height={100}
              className="relative z-10"
            />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-[#8b1a1a]">Admin Login</h2>
          <p className="text-[#5a3e36] mt-1">Please sign in to access the admin dashboard</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#5a3e36] mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-[#8b1a1a]/50" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-[#d4b483]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white text-[#5a3e36]"
                placeholder="Enter your username"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#5a3e36] mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#8b1a1a]/50" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 border border-[#d4b483]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b1a1a]/50 bg-white text-[#5a3e36]"
                placeholder="Enter your password"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8b1a1a] text-white py-3 px-4 rounded-lg hover:bg-[#8b1a1a]/90 transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-[#5a3e36]">
          <p>For security reasons, only authorized personnel are allowed to access this area.</p>
        </div>
      </div>
    </div>
  );
}