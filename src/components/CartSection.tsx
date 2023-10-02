import { FC } from "react";
import Navbar from "./layout/navbar/Navbar";
import { CartItem } from "@/types/types";
import Image from "next/image";

interface CartSectionProps {
  image: string;
  name: string;
}

const CartSection: FC<CartSectionProps> = ({ image, name }) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-6xl w-full py-10 sm:px-0 px-2">
        <h1 className="text-3xl font-semibold">Shopping Cart</h1>
        <div className="flex w-full items-stretch gap-5 ">
          <Image src={image} alt={name} width={150} height={150} />
        </div>
      </div>
    </>
  );
};

export default CartSection;
