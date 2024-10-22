import prisma from "$/lib/prisma";

export const load = async () => {
  const products = await prisma.products.findMany({
    select: {
      ProductId: true,
      ProductName: true,
      ProductImage1Url: true,
      ProductPrice: true,
      ProductQuantity: true,
    },
  });
  return {
    ProductList: products,
  };
};
