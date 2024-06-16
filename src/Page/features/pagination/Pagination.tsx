import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../reducers/store";
import { setPage } from "../product/productSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { page, filteredProducts, itemsPerPage } = useSelector((state: RootState) => state.product);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="px-4 py-2 border rounded-full  flex items-center justify-center"
      >
        {"<"}
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 border rounded-full  flex items-center justify-center ${page === index + 1 ? "bg-gray-200" : ""}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="px-4 py-2 border rounded-full  flex items-center justify-center"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
