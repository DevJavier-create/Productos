import { pool } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
  return Response.json(rows);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  const { nombre, precio, stock } = body;
  await pool.query(
    "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?",
    [nombre, precio, stock, id],
  );
  return Response.json({ mensaje: "Producto actualizado correctamente" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    return Response.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    return Response.json(
      {
        error: "Error al eliminar producto",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
