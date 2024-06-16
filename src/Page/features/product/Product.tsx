import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers/store";
import { getProductById, onsucess } from "./productSlice";
import { StarIcon } from "@heroicons/react/20/solid";
import { PiTagFill } from "react-icons/pi";
import { AppDispatch } from "../../../reducers/store";
import { BiTagAlt } from "react-icons/bi";
import { addToCart } from "../cart/cartSlice";
import CartType from "../../../interfaces/CartType";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const classNames = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

const ProductDetails: React.FC = () => {
  // Extract productId from the URL parameters
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Memoize the classNames function
  const memoizedClassNames = useMemo(() => classNames, []);

  // Extract product details from the Redux store
  const { isSelectedProduct, isLoading, error } = useSelector(
    (state: RootState) => state.product
  );

  // Fetch the product details when the component mounts or the productId changes
  useEffect(() => {
    if (productId) {
      dispatch(getProductById(Number(productId)));
    }
  }, [dispatch, productId]);

  const handleAddToCart = (
    id: number,
    title: string,
    quantity: number = 1,
    price: number,
    image: string
  ): void => {
    let product: CartType = {
      id,
      title,
      quantity,
      price,
      image,
    };
    dispatch(addToCart(product));
    setIsAddingToCart(true);
    dispatch(onsucess());
  };


  // Render loading state
  if (isLoading || isSelectedProduct == null) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render product details
  return (
    <div className="bg-white m-6 flex justify-center cursor-pointer hover:shadow-lg">
      <div className="border-2 
      flex 
      lg:flex-row flex-nowrap
      md:flex-col scrollable-smooth
      sm:flex-col flex-wrap h-full
      bg-black-200 gap-4 p-2">
        <div className="
        lg:w-1/2 h-full 
        md:w-1/2 h-full self-center
        sm:w-1/2 h-1/2">
          <img
            src={isSelectedProduct.image}
            alt="productimage"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="p-2 w-full">
          <h1 className="text-start text-xl font-bold tracking-tight text-gray-900 mb:4 
          sm:text-3xl">
            {isSelectedProduct.title}
          </h1>
          <div className="text-start flex flex-col ">
            <h3 className="text-start font-semibold mt-4 md:text-3xl lg:text-xl sm:text-4xl">
              Description
            </h3>
            <div className="space-y-6 w-full ">
              <p className="text-base text-gray-900 md:text-xl lg:text-l sm:text-3xl">
                {isSelectedProduct.description}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-l sm:text-2xl text-start">Reviews</h3>
            <div className="flex items-center">
              <div className="mt-1">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <StarIcon
                      key={rating}
                      className={memoizedClassNames(
                        (isSelectedProduct?.rating?.rate ?? 0) > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    ))}
                  </div>
                  <p className="ml-3 text-indigo-500/60">
                    {isSelectedProduct?.rating?.count??0} Reviews
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-xl text-start font-semibold">
                Price Information
              </h2>
              <section className="flex items-center">
                <p className="text-4xl text-start tracking-tight text-gray-900">
                  ${isSelectedProduct.price}
                </p>
                <PiTagFill className="text-2xl ml-4" />
              </section>
            </div>
            <div className="mt-6">
              <p className="text-start text-xl font-semibold">Category</p>
              <p className="flex align-items ">
                <BiTagAlt className="text-2xl" />
                {isSelectedProduct.category?.toUpperCase()}
              </p>
            </div>
            <button
              type="submit"
              className="mt-10 flex w-full items-center justify-center 
                rounded-md border border-transparent bg-indigo-600 
                px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                handleAddToCart(
                  isSelectedProduct.id,
                  isSelectedProduct.title,
                  1,
                  Number(isSelectedProduct.price),
                  isSelectedProduct.image
                );
              }}
            >
              {isAddingToCart ? "Increase the Quantity" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ProductDetails;
