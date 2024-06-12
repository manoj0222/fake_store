import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import useFetch from "../hooks/useFecth.ts";
import {getProducts, selectProducts} from "./features/product/productSlice.ts";
import ProductType from "../interfaces/ProductType.ts";
import Pagination from "./features/pagination/Pagination.tsx";
import { Link, useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const naviagte = useNavigate()
  useFetch(getProducts, []);
  const { products, isLoading, error } = useSelector(selectProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Render error state if an error occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link  key={product.id}  to={`/products/${product.id}`} className="group onhover:shadow-slate-400 cursor-pointer ">
              <div className="aspect-h-1 aspect-w-1 w-full 
              overflow-hidden  bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 border">
                <img
                  src={product.image}
                  alt={"product"}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="border p-2">
              <h3 className="mt-4 text-sm text-gray-700 text-start">
                {product.title}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900 text-start">
                $:{product.price}
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
