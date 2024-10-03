import prisma from '$/lib/prisma';

export const POST = async ({ request }) => {
    const { idlist } = await request.json();
    let price: number = 0;
    for (const id of idlist) {
        const PriceDB = await prisma.products.findFirst({
            where: {
                ProductId: id.id,
            },
            select: {
                ProductPrice: true,
            },
        });
        price += (PriceDB!.ProductPrice * id.quantity);
    }

    return new Response(JSON.stringify({ Price: price }));
};
