import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import {
  getProducts,
  selectProducts,
  filterProducts,
} from "./features/product/productSlice.ts";
import ProductType from "../interfaces/ProductType.ts";
import Pagination from "./features/pagination/Pagination.tsx";
import { Link, useNavigate } from "react-router-dom";
import Search from "./features/search/Search.tsx";
import useFetch from "../hooks/useFecth.ts";
import "../styles/product.css";
import useMemorizedCategories from "../hooks/useMemorizedCategories.tsx";

const Products: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useFetch(getProducts, []);
  const { products, isLoading, error, allProducts } =
    useSelector(selectProducts);
  const memorizedcategory = useMemorizedCategories(allProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearch = (query: string) => {
    dispatch(filterProducts({ searchText: query, category: category }));
  };

  const handlecatgeory = (query: string) => {
    setCategory(query);
    dispatch(filterProducts({ searchText: "", category: query }));
  };

  return (
    <div className="bg-white">
      <section className="flex justify-center items-center w-full mt-4">
        <Search
          onsearch={handleSearch}
          products={products}
          categories={memorizedcategory}
          handlecatgeory={handlecatgeory}
        />
      </section>
      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group"
            >
              <div
                className="w-full overflow-hidden 
              bg-gray-200 border
               imagecontainer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-f
                   h-auto object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="border p-2">
                <h3 className="mt-4 text-sm text-gray-700 text-start">
                  {product.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900 text-start">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default Products;
