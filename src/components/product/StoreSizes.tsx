"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { FullProductClient } from "@/types/types";
import { DEFAULT_SIZES } from "@/constants";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCartContext } from "@/providers/CartContextProviders";
import { useToast } from "../ui/use-toast";

interface StoreSizesProps {
  product: FullProductClient;
  // id: string;
  // name: string;
  // image: string;
  // sizes: string[];
  // quantity: number;
}

const StoreSizes: React.FC<StoreSizesProps> = ({
  // id,
  // name,
  // image,
  // sizes,
  // quantity,
  product,
}) => {
  const { id, name, image, sizes, quantity } = product;

  const { toast } = useToast();
  const [size, setSize] = React.useState<string | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);
  const { cartItems, setCartItems } = useCartContext();

  const soldOut = quantity === 0;

  const handleAddToCart = () => {
    if (!size || soldOut) return;
    setIsLoading(true);
    setCartItems([
      ...cartItems,
      {
        id,
        name,
        image,
        size,
      },
    ]);
    setSize(undefined);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        description: "Successfully added to cart",
      });
    }, 200);
  };

  // console.log(handleAddToCart)

  return (
    <div className="pt-10">
      <div className="font-medium">SIZE:</div>

      <Select>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="SELECT SIZE" className="text-black" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="font-medium">SELECT SIZE</SelectLabel>

            {DEFAULT_SIZES.map((currSize, idx) => {
              currSize = currSize.toString();
              return (
                <SelectItem
                  onClick={() =>
                    (!soldOut || sizes.includes(currSize)) && setSize(currSize)
                  }
                  key={id + idx}
                  value={currSize}
                  // className={cn(
                  //   "cursor-pointer hover:text-zinc-800 ease-in duration-75",
                  //   size === currSize &&
                  //     "bg-zinc-700 text-white hover:text-hover",
                  //   (soldOut || !sizes.includes(currSize)) &&
                  //     "cursor-not-allowed bg-zinc-300 text-zinc-500 hover:border-zinc-300 hover:text-zinc-500"
                  // )}
                >
                  {currSize}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="py-10">
        <span className="font-medium">QUANTITY:</span>
        <Input type="number" min={1} className="w-[100px]" />
      </div>
      <div>
        <Button
          className="w-[300px]"
          onClick={() => handleAddToCart()}
          // localLoaderOnClick={false}
          // isLoading={isLoading}
          // disabled={!size}
        >
          ADD TO CART
        </Button>
      </div>
    </div>
  );
};

export default StoreSizes;
