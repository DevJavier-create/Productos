import { pool } from "@/lib/db";
import { NextRequest } from "next/server";
import { ResultSetHeader } from "mysql2";
import { productSchema } from "@/types/products";
export async function GET() {
  const [rows] = await pool.query("SELECT * FROM productos");
  return Response.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const result_ = productSchema.safeParse(body);
  if (!result_.success) {
    return Response.json(
      {
        mensaje: "datos invalidos",
        errores: result_.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }
  const { nombre, precio, stock } = result_.data;
  const [result] = await pool.query(
    "INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
    [nombre, precio, stock],
  );
  return Response.json(
    {
      mensaje: "Producto creado correctamente",
      //duda preguntar a ia
      id: (result as ResultSetHeader).insertId,
    },
    { status: 201 },
  );
}
