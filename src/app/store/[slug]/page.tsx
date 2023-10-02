import StoreSection from "@/components/product/StoreSection";
import { messageProductClient } from "@/helpers/messageProductClient";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

const Page = async ({ params: { slug } }: PageProps) => {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      deleted: false,
    },
    include: {
      category: true,
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });

  if (!product) {
    return notFound()
  };

  // try {
  //   const product = await prisma.product.findFirst({
  //     where: {
  //       slug,
  //       deleted: false,
  //     },
  //     include: {
  //       category: true,
  //       _count: {
  //         select: {
  //           orderItems: true,
  //         },
  //       },
  //     },
  //   });

  //   if (!product) return;
  // } catch (error) {
  //   new Response("slug not found", { status: 500 });
  // }

  return (
    <>
      <StoreSection product={product}  />
    </>
  );
};

export default Page;
