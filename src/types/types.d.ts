import { cartItemSchema } from "@/validation/cartItemSchema";
import { Category, OrderItem, Product } from "@prisma/client";

export interface ExtendedProduct extends Product {
  category: Category;
  _count: {
    orderItems: number;
  };
}

export interface FullProductClient extends Omit<ExtendedProduct, "sizes"> {
  sizes: string[];
}

export type CartItem = z.infer<typeof cartItemSchema>;
