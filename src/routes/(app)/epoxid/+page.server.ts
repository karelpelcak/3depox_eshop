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
    return {
      categoryList: CategoryList,
    };
  } catch (error) {
    console.error("Error fetching category list:", error);
    return {
      categoryList: [],
      error: "Failed to load categories.",
    };
  }
};
