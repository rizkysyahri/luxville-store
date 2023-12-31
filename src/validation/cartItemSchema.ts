import { z } from "zod";

export const cartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  sizes: z.string(),
});

export const cartSchema = z.array(cartItemSchema);
