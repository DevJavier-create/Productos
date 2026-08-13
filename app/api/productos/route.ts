import { pool } from "@/lib/db";
import { NextRequest } from "next/server";
import { ResultSetHeader } from "mysql2";

export async function GET() {
  const [rows] = await pool.query("SELECT * FROM productos");
  return Response.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nombre, precio, stock } = body;
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
