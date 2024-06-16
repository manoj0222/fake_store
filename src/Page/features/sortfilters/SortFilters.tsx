import React from "react";
import { motion } from "framer-motion";
import "../../../styles/sortfilter.css";
import { MdClear } from "react-icons/md";
import { sortByHighToLow,sortByLowToHigh,sortByRating,resetAll } from "../product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../product/productSlice";


const SortFilters: React.FC = () => {
  const dispatch = useDispatch();
  const {sortBypriceHightoLowfilterFlag,sortBypriceLowtoHighFlag,sortByratingFlag} =useSelector(selectProducts);

  const tooglepriceLowToHigh = () => {
    dispatch(sortByLowToHigh())
  };

  const tooglepriceHighToLow = () => {
    dispatch(sortByHighToLow())
  };

  const tooglerating = () => {
    dispatch(sortByRating())
  };

  const handleResetall =()=>{
    dispatch(resetAll())
  }

  return (
    <div>
      <section className="flex justify-between items-center border-b-2 py-4">
        <span className="font-sans font-semibold">Price High to Low</span>
        <div
          className="switch border sm:p-3 lg:p-1"
          data-isOn={sortBypriceHightoLowfilterFlag}
          onClick={tooglepriceHighToLow}
        >
          <motion.div
            className="handle rounded-full w-5 h-5 bg-slate-400"
            layout
            transition={spring}
          />
        </div>
      </section>
      <section className="flex justify-between items-center border-b-2 py-4">
        <span className="font-sans font-semibold">Price Low to High</span>
        <div
          className="switch border sm:p-3 lg:p-1"
          data-isOn={sortBypriceLowtoHighFlag}
          onClick={tooglepriceLowToHigh}
        >
          <motion.div
            className="handle rounded-full w-5 h-5 bg-slate-400"
            layout
            transition={spring}
          />
        </div>
      </section>
      <section className="flex justify-between items-center border-b-2 py-4">
        <span className="font-sans font-semibold">Rating</span>
        <div
          className="switch border sm:p-3 lg:p-1"
          data-isOn={sortByratingFlag}
          onClick={tooglerating}
        >
          <motion.div
            className="handle rounded-full w-5 h-5 bg-slate-400"
            layout
            transition={spring}
          />
        </div>
      </section>
      <section className="flex justify-end items-center py-4 rounded-xl">
        <button className="p-3 hover:bg-gray-200 rounded-full" onClick={handleResetall}>
         <MdClear className="lg:text-2xl sm:text-4xl md:text-3xl" />
        </button>
      </section>
    </div>
  );
};

export default SortFilters;

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
