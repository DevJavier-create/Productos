import { api } from "./axios";
interface Products {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}
export interface Product {
  nombre: string;
  precio: number;
  stock: number;
}

interface ApiResponse {
  mensaje: string;
  id?: number;
}
export const GetProducts = async (): Promise<Products[]> => {
  const { data } = await api.get("/productos");
  return data;
};

export const GetProductById = async (id: number): Promise<Products> => {
  const { data } = await api.get(`productos/${id}`);
  return data;
};

export const PostProduct = async (producto: Product): Promise<Product> => {
  const { data } = await api.post("/productos", producto);
  return data;
};

export const PutProduct = async (
  id: number,
  producto: Product,
): Promise<ApiResponse> => {
  const { data } = await api.put(`productos/${id}`, producto);
  return data;
};

export const DeleteProduct = async (id: number): Promise<ApiResponse> => {
  const { data } = await api.delete(`/productos/${id}`);
  return data;
};
