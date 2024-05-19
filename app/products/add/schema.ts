import { z } from "zod";

export const productSchema = z.object({
  photo: z.string({
    required_error: "Photo1 is required",
  }),
  title: z.string({
    required_error: "Title1 is required",
  }),
  description: z.string({
    required_error: "Description1 is required",
  }),
  price: z.coerce.number({
    required_error: "Price1 is required",
  }),
});

export type ProductType = z.infer<typeof productSchema>;
