import { ExtendedProduct, FullProductClient } from "@/types/types";

export const messageProductClient = (
  product: ExtendedProduct
): FullProductClient => ({
  ...product,

  sizes: product.sizes.map((size) => size.toString()),
});
