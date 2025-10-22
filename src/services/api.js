// API base URL - adjust if your backend runs on a different port
const API_BASE_URL = 'https://qualifications-decided-maximum-ice.trycloudflare.com';

class ApiService {
  // Search products
  async searchProducts(query, limit = 20, alpha = 0.6) {
    const params = new URLSearchParams({
      q: query,
      limit: limit.toString(),
      alpha: alpha.toString()
    });
    
    const response = await fetch(`${API_BASE_URL}/search?${params}`);
    if (!response.ok) {
      throw new Error('Search failed');
    }
    return response.json();
  }

  // Get product details by SKU
  async getProduct(sku) {
    const encodedSku = encodeURIComponent(sku);
    const response = await fetch(`${API_BASE_URL}/products/${encodedSku}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  }

  // Create a new quote
  async createQuote(customerRef, lines) {
    const response = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerRef,
        lines
      })
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.detail || 'Quote creation failed');
    }
    return data;
  }

  // Get quote by ID
  async getQuote(quoteId) {
    const response = await fetch(`${API_BASE_URL}/quotes/${quoteId}`);
    if (!response.ok) {
      throw new Error('Quote not found');
    }
    return response.json();
  }

  // Get API info
  async getApiInfo() {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.json();
  }
}

export default new ApiService();