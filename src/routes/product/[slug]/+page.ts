import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(
    `/api/products/productbyid?ProductId=${params.slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (response.ok) {
    return {
      product: data.Products[0],
    };
  } else {
    throw new Error(data.error);
  }
};
