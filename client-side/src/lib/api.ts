import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  // ...other fields
};

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error) && error.response?.data?.message) {
    return error.response.data.message;
  }
  return fallback;
}

export async function getAllProducts() {
  try {
    const res = await api.get<Product[]>("/products");
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch products"));
  }
}

export async function getProductById(id: string) {
  try {
    const res = await api.get<Product>(`/products/${id}`);
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch product"));
  }
}

export async function createOrder(orderData: object) {
  try {
    const res = await api.post("/orders", orderData);
    return res.data;
  } catch (error: unknown) {
    console.error("Error creating order:", error);
    throw new Error(getErrorMessage(error, "Failed to create order"));
  }
}

export async function getUserOrders(userId: string) {
  try {
    const res = await api.get(`/orders?user=${userId}`);
    return res.data;
  } catch (error: unknown) {
    console.error("Error fetching user orders:", error);
    throw new Error(getErrorMessage(error, "Failed to fetch user orders"));
  }
}

export default api; 