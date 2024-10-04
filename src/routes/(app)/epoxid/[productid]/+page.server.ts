import prisma from '$/lib/prisma.js';

export const load = async ({ params }) => {
    const ProductId = params.productid;

    if (!ProductId) {
        throw new Error('Product ID is missing');
    }

    try {
        const ProductList = await prisma.products.findMany({
            where: {
                CategoryId: parseInt(ProductId),
            },
        });

        const Name = await prisma.category.findFirst({
            where: {
                CategoryId: parseInt(ProductId),
            },
            select: {
                CategoryName: true,
                CategoryFor: true,
            },
        });

        if (!Name) {
            throw new Error('Category not found');
        }

        return {
            productList: ProductList,
            name: Name,
        };
    } catch (error) {
        console.error('Error loading products:', error);
        throw new Error('Failed to load products');
    }
};
