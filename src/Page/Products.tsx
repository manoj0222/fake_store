import React, { useState, Suspense, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts,selectProducts, filterProducts,} from "./features/product/productSlice.ts";
import { Link } from "react-router-dom";
import { IoFilterSharp } from "react-icons/io5";
import useFetch from "../hooks/useFecth.ts";
import useMemorizedCategories from "../hooks/useMemorizedCategories.ts";
import "../styles/product.css";

// Lazy load components
const Pagination = React.lazy(() => import("./features/pagination/Pagination.tsx"));
const Search = React.lazy(() => import("./features/search/Search.tsx"));
const SlideOver = React.lazy(() => import("./features/Modals/SlideOver.tsx"));

const Products: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [sortFilter, setSortFilter] = useState<boolean>(false);
  const dispatch = useDispatch();
  useFetch(getProducts, []);
  const { products, isLoading, error, allProducts } =
    useSelector(selectProducts);

  const memorizedCategory = useMemorizedCategories(allProducts);

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(filterProducts({ searchText: query, category: category }));
    },
    [dispatch, category]
  );

  const handleCategory = useCallback(
    (query: string) => {
      setCategory(query);
      dispatch(filterProducts({ searchText: "", category: query }));
    },
    [dispatch]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white">
      <section className="flex justify-center items-center w-full mt-4">
        <Suspense fallback={<div>Loading Search...</div>}>
          <Search
            onSearch={handleSearch}
            products={products}
            categories={memorizedCategory}
            handleCategory={handleCategory}
          />
        </Suspense>
      </section>
      <section
        className="flex lg:ml-12 lg:justify-start sm:ml-4 justify-center md:ml-6 gap-2 mt-2 cursor-pointer border items-center"
        onClick={() => {
          setSortFilter(!sortFilter);
        }}
      >
        <IoFilterSharp className="lg:text-3xl md:text-3xl sm:text-xl" />
        <p className="lg:text-2xl md:text-3xl sm:text-9xl">Filter</p>
        <Suspense fallback={<div>Loading Filter...</div>}>
          <SlideOver open={sortFilter} setOpen={setSortFilter} />
        </Suspense>
      </section>
      <div className="px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group"
            >
              <div className="w-full overflow-hidden bg-gray-200 border imagecontainer">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto object-cover object-center group-hover:opacity-75"
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
      <Suspense fallback={<div>Loading Pagination...</div>}>
        <Pagination />
      </Suspense>
    </div>
  );
};

export default Products;
