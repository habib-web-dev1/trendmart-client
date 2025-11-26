export const fetchProducts = async () => {
  const absoluteUrl = "http://localhost:5000/products";

  console.log("Guaranteed fetch from:", absoluteUrl);

  try {
    const response = await fetch(absoluteUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch products from backend:", error);
    return [];
  }
};
export const fetchProductById = async (id) => {
  const absoluteUrl = `http://localhost:5000/products/${id}`;

  console.log("Fetching single product from:", absoluteUrl);

  try {
    const response = await fetch(absoluteUrl);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    return null;
  }
};
