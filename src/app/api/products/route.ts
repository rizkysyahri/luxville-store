import prisma from "@/lib/prisma";
import z from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const { categories, limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
        categories: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        categories: url.searchParams.get("categories"),
      });

    let whereClause = {};

    if (categories?.length) {
      whereClause = {
        category: {
          in: categories,
        },
      };
    }

    const findProducts = await prisma.product.findMany({
      where:{
        deleted: false
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      include: {
        category: true,
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(findProducts));
  } catch (error) {
    return new Response("could not fetch product", { status: 500 });
  }
}
