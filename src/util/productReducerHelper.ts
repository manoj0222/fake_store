import ProductType from "../interfaces/ProductType";

export const paginateProducts = (
  products: ProductType[],
  page: number,
  itemsPerPage: number
) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.slice(start, end);
};
