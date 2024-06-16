import React, { Suspense, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchAllCartProducts,increaseQuantity,decreaseQuantity, removeItem,} from "./features/cart/cartSlice";
import useFetch from "../hooks/useFecth";
import { AppDispatch, RootState } from "../reducers/store";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { saveFeedback } from "./features/feeback/feedbackSlice";
import CartIsEmpty from "../components/CartIsEmpty";
import CartState from "../interfaces/CartState";

const LazyUserFeedBackModal = React.lazy(() => import("./features/Modals/UserfeedbackModal"));

export default function Cart() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [feedbacktext, setfeedback] = useState<string>("");

  useFetch(fetchAllCartProducts, []);
  const { cartproducts, isLoading, error, total } = useSelector(
    (state: RootState) => state.cart as CartState 
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

  const memoizedhandleonClickShopping = useCallback(() => {
    navigate("/products");
  }, []);

  const handleCheckout = () => {
    setOpen(true);
    setShowModal((pre) => !pre);
  };

  const handleuserFeedback = () => {
    dispatch(saveFeedback({ description: feedbacktext, experience: 0 }));
    setOpen(false);
    memoizedhandleonClickShopping();
  };

  const handelfeedbackText = (value:string) => {
    setfeedback(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return cartproducts.length > 0 ? (
    <div className="flex justify-center items-center">
      <div className="lg:w-1/2 sm:w-full p-2 mt-3">
        <div className="border">
          <div className="flex sm:flex-col">
            <div className="border">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartproducts.map((product) => (
                    <li
                      key={product.id}
                      className="flex py-6 sm:flex-col flex-wrap lg:flex-row"
                    >
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
            <p className="mt-3 text-sm text-gray-500 text-start">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6 flex justify-end ">
              <button
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
            <div className="m-3 flex justify-center text-center text-sm text-gray-500">
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
      <ToastContainer autoClose={1800} />
      {showModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyUserFeedBackModal
            open={open}
            setOpen={handleuserFeedback}
            setText={handelfeedbackText}
          />
        </Suspense>
      )}
    </div>
  ) : (
    <section className="flex items-center justify-center">
      <CartIsEmpty message={"Cart is Empty added something"}/>
    </section>
  );
}
