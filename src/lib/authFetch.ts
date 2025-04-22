import Cookies from 'js-cookie';

export async function authFetch(url: string, options: RequestInit = {}) {
  const token = Cookies.get('admin-token');
  console.log('Auth token available:', !!token);

  const headers = new Headers(options.headers || {});

  const isPostOrPut = options.method === 'POST' || options.method === 'PUT';
  const bodyIsFormData =
    typeof FormData !== 'undefined' && options.body instanceof FormData;

  if (isPostOrPut && !headers.has('Content-Type') && !bodyIsFormData) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    console.log('Authorization header set:', `Bearer ${token.substring(0, 10)}...`);
  }

  const updatedOptions = {
    ...options,
    headers,
  };

  console.log(`${options.method || 'GET'} request to ${url}`);

  try {
    const response = await fetch(url, updatedOptions);
    console.log(`Response status: ${response.status} ${response.statusText}`);

    if (response.status === 401) {
      console.error('Unauthorized request. Token might be invalid or expired.');
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
