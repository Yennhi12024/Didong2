const API_URL = "http://localhost/mobile-backend/public/api/products";

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Trả về danh sách sản phẩm
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Lấy chi tiết một sản phẩm và sản phẩm liên quan
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`http://localhost/mobile-backend/public/api/products/${id}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error; // re-throw error for handling elsewhere if needed
  }
};


export const fetchSearchProducts = async (query) => {
  try {
    const response = await fetch(
      `http://localhost/mobile-backend/public/api/products-search?query=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};