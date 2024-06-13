import { useMemo } from "react";
import ProductType from "../interfaces/ProductType";

const useMemorizedCategories = (products:ProductType[]) => {

  const categories = (prdts:ProductType[]):string[] => {
    let category = [];
    for (let i = 0; i < prdts.length; i++) {
      if (category.indexOf(prdts[i].category) === -1) {
        category.push(prdts[i].category);
      }
    }
    return category;
  };

  const memorizedCategory = useMemo(()=>categories(products),[products]);
  return memorizedCategory;
};

export default useMemorizedCategories;
