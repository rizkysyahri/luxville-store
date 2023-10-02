import * as React from "react";
import Image from "next/image";
import { toRupiah } from "@/lib/format";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  image: string;
  price: number;
  name: string;
  slug: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  price,
  name,
  slug,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/store/${slug}`);
      }}
      className="cursor-pointer"
    >
      <div className="p-2 flex items-center justify-center">
        <div className="mt-20 flex flex-col items-center justify-center h-32">
          <div>
            <Image
              src={image}
              alt={name}
              className="h-auto w-auto"
              width={200}
              height={200}
            />
            <p className="text-lg font-medium tracking-wide">{name}</p>
            <p className="text-normal">{toRupiah(price)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
