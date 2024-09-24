import prisma from "$/lib/prisma.js";

export const load = async ({ params }) => {
  const ProductId = params.productid;

  const ProductList = await prisma.products.findMany({
    where: {
      CategoryId: parseInt(ProductId),
    },
  });
  console.log("🚀 ~ load ~ ProductList:", ProductList);
  return {
    productList: ProductList,
  };
};
