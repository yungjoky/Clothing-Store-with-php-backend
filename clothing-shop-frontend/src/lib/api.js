const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchProducts = async (category = null) => {
  const url = category && category !== 'all' 
    ? `${API_URL}/products?category=${encodeURIComponent(category)}` 
    : `${API_URL}/products`;
  
  console.log('Fetching products from:', url); 
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") === -1) {
      const text = await response.text();
      console.error("Received non-JSON response:", text);
      throw new Error("API returned non-JSON response");
    }
    
    const data = await response.json();
    console.log('API response:', data);
    
    if (data.data) return data.data;
    if (Array.isArray(data)) return data;
    
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data || data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};