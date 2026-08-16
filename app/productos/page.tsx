"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UseProducts } from "@/hooks/use-products";
import { UseCreateProduct } from "@/hooks/use-create-product";
import { UseDeleteProduct } from "@/hooks/use-delete-product";
import { UseUpdateProducts } from "@/hooks/use-update-products";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/types/products";
interface Productos {
  id?: number;
  nombre: string;
  precio: number;
  stock: number;
}

export default function Productos() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Productos>({
    resolver: zodResolver(productSchema),
  });
  const { data: productos, isLoading, error } = UseProducts();
  const deleteProduct = UseDeleteProduct();
  const updateProduct = UseUpdateProducts();
  const createProduct = UseCreateProduct();

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const onSubmit = async (data: Productos) => {
    if (editandoId === null) {
      await createProduct.mutateAsync(data);
    } else {
      await updateProduct.mutateAsync({
        id: editandoId,
        producto: data,
      });
      reset();
    }
    reset({ nombre: "", precio: 0, stock: 0 });
    setEditandoId(null);
  };

  const editarProducto = (producto: Productos & { id: number }) => {
    setEditandoId(producto.id);
    reset({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    });
  };

  const eliminarProducto = async (id: number) => {
    await deleteProduct.mutateAsync(id);
  };
  if (isLoading) return <p>Cargando...</p>;
  if (error)
    return (
      <p className="text-red-500 font-bold">
        Ha ocurrido un error...Pro fravor espere
      </p>
    );
  return (
    <div className="container mx-auto p-4 border border-gray-500">
      <div className="">
        <div className="border border-gray-200 p-4 rounded-md">
          <h1 className="text-lg font-bold">Agregar producto</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 my-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  type="text"
                  id="nombre"
                  {...register("nombre")}
                />
                {errors.nombre && (
                  <p className="text-red-500">{errors.nombre.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="precio">Precio:</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  type="number"
                  id="precio"
                  {...register("precio", { valueAsNumber: true })}
                />
                {errors.precio && (
                  <p className="text-red-500">{errors.precio.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="stock">Stock:</label>
                <input
                  className="border border-gray-300 p-2 rounded-md"
                  type="number"
                  id="stock"
                  {...register("stock", { valueAsNumber: true })}
                />
                {errors.stock && (
                  <p className="text-red-500">{errors.stock.message}</p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
                disabled={createProduct.isPending || updateProduct.isPending}
              >
                {editandoId === null
                  ? "Agregar producto"
                  : "Actualizar producto"}
              </button>
            </div>
          </form>
        </div>
        <div>
          <h1 className="text-lg font-bold text-center">Lista de productos</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            {(productos ?? []).map((producto) => (
              <div
                className="border flex-1  border-gray-300 p-4 rounded-md"
                key={producto.id}
              >
                <h2>Producto:{producto.nombre}</h2>
                <p>Precio: ${producto.precio}</p>
                <p>Stock: {producto.stock}</p>
                <div className="flex gap-5">
                  <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="bg-red-500 text-white p-2 rounded-md"
                  >
                    Eliminar
                  </button>
                  <button
                    onClick={() => editarProducto(producto)}
                    className="bg-blue-500 text-white p-2 rounded-md"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
