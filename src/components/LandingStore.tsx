"use client";

import * as React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Navbar from "./layout/navbar/Navbar";
import { ProductCard } from "./product/ProductCard";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { ExtendedProduct } from "@/types/types";
import { useIntersection } from "@mantine/hooks";
import axios from "axios";
import { Icons } from "./Icons";

interface LandingProps {
  initialProducts: ExtendedProduct[];
  categories?: string;
}

const LandingPage: React.FC<LandingProps> = ({
  initialProducts,
  categories,
}) => {
  const lastPageRef = React.useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPageRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/products/?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!categories ? `${categories}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedProduct[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialProducts], pageParams: [1] },
    }
  );

  React.useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const products = data?.pages.flatMap((page) => page) ?? initialProducts;

  // console.log(products)

  const renderProducts = () => {
    return products?.map((product) => {
      const { id, name, image, price, slug } = product || {};
      const imageUrl = Array.isArray(image) && image.length > 0 ? image[0] : "";
      return (
        <ProductCard
          key={id}
          image={imageUrl}
          price={price}
          name={name}
          slug={slug}
        />
      );
    });
  };

  return (
    <>
      <main>
        <div className="pt-24 md:pt-32 flex items-center justify-center ">
          <div className="flex-row md:flex md:items-center md:justify-between">
            <img
              src="https://www.ofpj.org/medias/assets/arrow_down.png"
              alt="Arrow"
              className="md:mr-4 md:mb-14 hidden lg:block"
            />
            <div className="md:flex-col">
              <div>
                <p className="text-2xl text-left md:text-4xl md:leading-relaxed md:text-left md:opacity-1 md:font-normal font-normal">
                  Luxville store initiative to start, support and promote
                  products to grow the economy and introduce brands that are no
                  less interesting and well-known to the new generation.
                </p>
              </div>
              <div>
                <p className="mt-5 md:max-w-4xl text-sm md:text-md font-normal">
                  We are displaying a number of products that currently have a
                  lot of product stock and we will definitely continue to update
                  about new items in our store. stay tuned.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center mt-[70px] md:mt-0 md:ml-4 font-light">
              <span className="md:text-7xl text-6xl">|</span>
              <div className="flex-col">
                <span className="md:text-5xl flex items-center justify-center text-4xl ">
                  Luxville
                </span>
                <span>Store</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="py-28">
        <div className="font-light flex flex-row gap-4">
          <span>PRODUCT</span>
          <span>|</span>
          <span>SALE</span>
        </div>
        <div className="relative py-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-400" />
          </div>
        </div>

        <div>
          {isLoading && !products ? (
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
              <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
            </div>
          ) : (
            <div className="grid grid-rows-1 gap-y-20 gap-x-8 w-full md:grid-cols-3">
              {renderProducts()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
