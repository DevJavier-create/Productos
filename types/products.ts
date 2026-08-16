import { z } from "zod";

export const productSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .min(3, "el nombre debe tener almenos 3 caracteres"),
  precio: z
    .number({ error: "el precio es obligatorio" })
    .positive("El presio debe ser positivo"),
  stock: z
    .number({ error: "El stock es obligatorio" })
    .positive("El stock debe ser positivo"),
});

export type product = z.infer<typeof productSchema>;
