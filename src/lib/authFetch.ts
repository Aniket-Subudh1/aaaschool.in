// src/lib/authFetch.ts

import Cookies from 'js-cookie';

/**
 * Fetch utility that automatically adds authentication token for admin API requests
 * @param url The URL to fetch
 * @param options Fetch options
 * @returns Fetch response
 */
export async function authFetch(url: string, options: RequestInit = {}) {
  // Get the admin token from cookies
  const token = Cookies.get('admin-token');
  
  // Debug: Log token availability (remove in production)
  console.log('Auth token available:', !!token);
  
  // Prepare headers
  const headers = new Headers(options.headers || {});
  
  // Add content-type if not present and method is POST or PUT
  if ((options.method === 'POST' || options.method === 'PUT') && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  // Add authorization header if token exists
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    // Debug: Log the auth header (remove in production)
    console.log('Authorization header set:', `Bearer ${token.substring(0, 10)}...`);
  }
  
  // Create new options with updated headers
  const updatedOptions = {
    ...options,
    headers
  };
  
  // Log the request (remove in production)
  console.log(`${options.method || 'GET'} request to ${url}`);
  
  try {
    const response = await fetch(url, updatedOptions);
    
    // Log response status (remove in production)
    console.log(`Response status: ${response.status} ${response.statusText}`);
    
    // If unauthorized, log it for debugging
    if (response.status === 401) {
      console.error('Unauthorized request. Token might be invalid or expired.');
    }
    
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}