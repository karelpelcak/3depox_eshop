import prisma from "$/lib/prisma";

export const load = async () => {
  try {
    const CategoryList = await prisma.category.findMany({
      where: {
        CategoryFor: "epoxid",
      },
      select: {
        CategoryName: true,
        CategoryId: true,
      },
    });

    let productListArray: any[] = [];

    await Promise.all(
      CategoryList.map(async (item) => {
        const ProductList = await prisma.products.findMany({
          where: {
            CategoryId: item.CategoryId,
          },
          select: {
            ProductId: true,
            ProductName: true,
            ProductDesc: true,
            ProductImage1Url: true,
            ProductPrice: true,
            ProductQuantity: true,
          },
        });
        productListArray.push({
          categoryId: item.CategoryId,
          products: ProductList,
        });
      })
    );
    return {
      categoryList: CategoryList,
      productList: productListArray,
    };
  } catch (error) {
    console.error("Error fetching category list:", error);
    return {
      categoryList: [],
      productList: [],
      error: "Failed to load categories and products.",
    };
  }
};
