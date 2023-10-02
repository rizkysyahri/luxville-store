import { FullProductClient } from "@/types/types";
import Image from "next/image";
import * as React from "react";
import Navbar from "../layout/navbar/Navbar";
import Link from "next/link";
import StoreSizes from "./StoreSizes";

interface StoreSectionProps {
  product: FullProductClient;
  // name: string;
  // image: string[];
  // title: string;
  // price: number;
  // description: string;
}

const StoreSection: React.FC<StoreSectionProps> = ({
  // name,
  // image,
  // title,
  // price,
  // description,
  product,
}) => {
  const { name, image, title, price, description } = product;

  return (
    <>
      <Navbar />
      <div className="container px-10 p-5">
        <div className="font-light flex flex-row gap-4 tracking-wide">
          <Link href="/">STORE</Link>
          <span>|</span>
          <span className="text-md items-center">{title}</span>
        </div>
        <div className="flex items-center justify-between">
          <Image
            src={image[0] !== undefined ? image[0] : ""}
            priority={true}
            alt={name}
            className="h-auto w-auto pt-14"
            width={600}
            height={600}
          />
          <div className="flex flex-col top-0 bottom-0">
            <h1 className="font-medium text-4xl">{title}</h1>
            <h2 className="py-6 text-lg font-semibold">
              Rp {price.toLocaleString("id-ID")}
            </h2>
            <h3 className="font-light text-sm">{description}</h3>

            <StoreSizes product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreSection;
