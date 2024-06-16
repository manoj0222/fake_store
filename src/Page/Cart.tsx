import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllCartProducts,
  increaseQuantity,
  decreaseQuantity,
  removeItem
} from "./features/cart/cartSlice";
import useFetch from "../hooks/useFecth";
import { AppDispatch, RootState } from "../reducers/store";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Cart() {
 const navigate = useNavigate()

  useFetch(fetchAllCartProducts,[]);
  
  const { cartproducts, isLoading, error, total } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleIncreaseQtyClick = (productId: number) => {
    dispatch(increaseQuantity(Number(productId)));
  };

  const handleDecreaseQtyClick = (productId: number) => {
    dispatch(decreaseQuantity(Number(productId)));
  };

  const handleRemoveItemClick = (productId: number) => {
    dispatch(removeItem(Number(productId)));
  };

  const handleonClickShopping =()=>{
    navigate("/products")
  }

  const memoizedhandleonClickShopping = useCallback(handleonClickShopping,[]);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="lg:w-1/2 sm:w-full p-2 mt-3">
        <div className="border-4">
          <div className="py-1 flex sm:flex-col">
            <div className="border">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartproducts.map((product) => (
                    <li key={product.id} className="flex py-6 sm:flex-col flex-wrap lg:flex-row">
                      <div className="lg:w-1/3 sm:w-full rounded-md border border-gray-200 sm:flex-1">
                        <img
                          src={product.image}
                          alt={"productImage"}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="p-2 flex flex-1 flex-col">
                        <div>
                          <h3 className="text-start font-semibold text:l mt-10">
                            {product.title}
                          </h3>
                          <p className="text-start font-semibold text:l mt-4">
                            ${product.price}
                          </p>
                          <p className="text-gray-500 mt-4 text-start">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                        <section className="flex gap-2 items-center justify-between px-3 m-2 mt-4">
                          <button
                            className="hover:cursor-pointer hover:bg-indigo-100 px-2 font-large text-4xl text-indigo-600 rounded flex items-center justify-center"
                            onClick={() => handleDecreaseQtyClick(product.id)}
                          >
                            -
                          </button>
                          <button
                            className="hover:cursor-pointer hover:bg-indigo-100 text-indigo-600 text-4xl px-2 rounded flex items-center justify-center"
                            onClick={() => handleIncreaseQtyClick(product.id)}
                          >
                            +
                          </button>
                        </section>
                        <div className="flex justify-center mt-4">
                          <button
                            type="button"
                            className="font-medium text-red-300 bg-red-200 w-full rounded-l hover:text-red-600 p-2"
                            onClick={() => handleRemoveItemClick(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-1 py-1 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </a>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={memoizedhandleonClickShopping}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div> 
      <ToastContainer autoClose={2000}/>
    </div>
  );
}