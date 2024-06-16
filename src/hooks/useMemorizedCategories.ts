import ProductType from "../interfaces/ProductType";
import { useMemo } from "react";

/**
 * Custom hook that memoizes and returns unique categories from a list of products.
 * @param products Array of ProductType objects containing products with categories.
 * @returns Array of unique category strings derived from the provided products.
 */
const useMemorizedCategories = (products: ProductType[]) => {
  /**
   * Function to extract unique categories from products array.
   * @param products Array of ProductType objects containing products with categories.
   * @returns Array of unique category strings.
   */
  const categories = (products: ProductType[]): string[] => {
    let category: string[] = [];
    for (let i = 0; i < products.length; i++) {
      const currentCategory = products[i].category as string | undefined;
      if (
        currentCategory &&
        currentCategory.trim() !== "" &&
        category.indexOf(currentCategory) === -1
      ) {
        category.push(currentCategory);
      }
    }
    return category;
  };

  // Memoize the categories function with useMemo to optimize performance
  const memorizedCategory = useMemo(() => categories(products), [products]);

  return memorizedCategory;
};

export default useMemorizedCategories;
