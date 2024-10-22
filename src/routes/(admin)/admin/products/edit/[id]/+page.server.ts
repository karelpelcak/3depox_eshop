import prisma from "$/lib/prisma";

export const load = async ({ params }) => {
  const ProductById = await prisma.products.findFirst({
    where: {
      ProductId: parseInt(params.id),
    },
    select: {
      ProductId: true,
      ProductName: true,
      ProductPrice: true,
      ProductQuantity: true,
    },
  });
  const EditProject = {
    ProductPrice: ProductById?.ProductPrice,
    ProductQuantity: ProductById?.ProductQuantity,
  };
  return {
    product: EditProject,
    productName: ProductById?.ProductName,
    productId: ProductById?.ProductId,
  };
};
