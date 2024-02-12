interface ApiServiceProps {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: object | string;
    includeToken?: boolean; // Optional parameter to include the token in the request
  }
  
  const apiService = async ({ url, method, body, includeToken = true }: ApiServiceProps) => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
  
      if (includeToken) {
        const token = localStorage.getItem('token');
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }
  
      const response = await fetch(url, {
        method,
        headers,
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        let errorMessage = 'Request failed';
        if (responseData && responseData.message) {
          errorMessage = responseData.message;
        }
        throw new Error(errorMessage);
      }
  
      return responseData;
    } catch (error: any) {
      console.error('API request failed:', error);
      throw new Error(error.message || 'Internal Server Error');
    }
  };
  
  export default apiService;
  
  
  
  