import prisma from "$/lib/prisma";

export const load = async ({ params }) => {
  try {
    const Product = await prisma.products.findFirst({
      where: {
        ProductId: parseInt(params.slug),
      },
    });
    const Category = await prisma.category.findFirst({
      where: {
        CategoryId: Product?.CategoryId,
      },
    });

    return {
      product: Product,
      category: Category,
    };
  } catch (error) {
    console.error("Error fetching category list:", error);
    return {
      error: "Failed to load categories and products.",
    };
  }
};
