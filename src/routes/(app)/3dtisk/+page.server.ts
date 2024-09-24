import prisma from "$/lib/prisma";

export const load = async () => {
  try {
    const CategoryList = await prisma.category.findMany({
      where: {
        CategoryFor: "3dprint",
      },
      select: {
        CategoryName: true,
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
