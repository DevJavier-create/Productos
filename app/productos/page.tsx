"use client";
import { useEffect, useState } from "react";

interface Productos {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

export default function Productos() {
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [productos, setProductos] = useState<Productos[]>([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [mensaje, setMensaje] = useState("");
  async function cargarProductos() {
    const response = await fetch("/api/productos");
    const data = await response.json();
    setProductos(data);
  }

  useEffect(() => {
    //preguntar a la ia si es correcto hacer esto, ya que no se puede usar async en useEffect
    (async () => {
      await cargarProductos();
    })();
  }, []);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const producto = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };
    let response;
    if (editandoId === null) {
      response = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
    } else {
      response = await fetch(`/api/productos/${editandoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
    }
    const nuevoProducto = await response.json();
    if (!response.ok) {
      console.error("Error al agregar producto:", nuevoProducto);
      return;
    }
    setMensaje("producto creado correctamente");
    setNombre("");
    setPrecio("");
    setStock("");
    setEditandoId(null);
    await cargarProductos();
  }
  const eliminarProducto = async (id: number) => {
    const response = await fetch(`/api/productos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Error al eliminar producto");
      return;
    }
    setMensaje("producto eliminado correctamente");
    await cargarProductos();
  };
  const editarProducto = async (producto: Productos) => {
    setEditandoId(producto.id);
    setNombre(producto.nombre);
    setPrecio(producto.precio.toString());
    setStock(producto.stock.toString());
  };

  return (
    <div className="container mx-auto p-4 border border-gray-500">
      <div className="">
        <div className="border border-gray-200 p-4 rounded-md">
          <h1 className="text-lg font-bold">Agregar producto</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="nombre">Nombre:</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                value={nombre}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNombre(e.target.value)
                }
                type="text"
                id="nombre"
                name="nombre"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="precio">Precio:</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                value={precio}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrecio(e.target.value)
                }
                type="text"
                id="precio"
                name="precio"
                required
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="stock">Stock:</label>
              <input
                className="border border-gray-300 p-2 rounded-md"
                value={stock}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStock(e.target.value)
                }
                type="text"
                id="stock"
                name="stock"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                {editandoId === null
                  ? "Agregar producto"
                  : "Actualizar producto"}
              </button>
            </div>
            {mensaje && <p>{mensaje}</p>}
          </form>
        </div>
        <div>
          <h1 className="text-lg font-bold text-center">Lista de productos</h1>
          <div className="flex flex-wrap gap-4 mt-4">
            {productos.map((producto) => (
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
