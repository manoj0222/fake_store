import React, { useState } from "react";
import ProductType from "../../../interfaces/ProductType";
import "../../../styles/search.css";


type SearchProps = {
  onsearch: (query: string) => void;
  products: ProductType[];
  categories: string[];
  handlecatgeory: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({
  onsearch,
  products,
  categories,
  handlecatgeory,
}) => {
  const [searchContent, setSearchContent] = useState<string>("");

  const handleSearch = (value:string) => {
    setSearchContent(value)
    onsearch(value);
  };

  const handleSelectedCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handlecatgeory(e.target.value);
  };

  return (
    <div className="p-1 rounded-md lg:w-1/2 sm:w-full container">
      <div className="lg:flex searchcontainer">
        <input
          type="text"
          name="price"
          id="price"
          className="w-full 
          rounded-md 
          border
           py-2 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 
           placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          placeholder="Search by name or description"
          value={searchContent}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          id="currency"
          name="currency"
          className="
          lg:w-1/4
          category_container
          rounded-md  
          py-2 pl-1 text-gray-700 border-2 border-gray-300 
          outline-none
          justify-center
          flex
          items-center
          font-bold
          text-blue-300
          bg-gray-100
          sm:text-sm"
          defaultValue=""
          onChange={handleSelectedCategory}
        >
          <option value=""  className="text-center">Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category} className="text-blue-300 p-1 text-center">
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Search;
