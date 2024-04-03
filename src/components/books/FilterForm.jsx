import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import config from "../../config";

const FilterForm = () => {
  const [searchText, setSearchText] = useState("");
  const [genre, setGenre] = useState("");
  const { filterObject, setFilterObject } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterObject((prev) => ({ ...prev, searchTerm: searchText, genre }));
  };

  // useEffect(() => {
  //   if (searchText) {
  //     fetch(`${config.base_url}/books/search-suggestion?tag=${searchText}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setSuggestions(data?.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [searchText]);

  return (
    <div className="space-y-1">
      <h2 className="font-medium text-gray-600">Filter: </h2>
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center ">
        <select
          onChange={(e) => setGenre(e.target.value)}
          className="select select-bordered focus:outline-none rounded-full !px-3 w-6/12 md:w-2/12 shadow"
        >
          <option disabled selected>
            Genre?
          </option>
          <option value="action">Action</option>
          <option value="thriller">Thriller</option>
        </select>
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 rounded-full border bg-base-100 shadow w-full md:w-6/12 relative"
        >
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className=" outline-none bg-transparent rounded-full px-3 py-3 w-full"
            type="search"
            placeholder="Search for Profile"
            defaultValue={filterObject?.searchTerm}
          />
          <button
            type="submit"
            className="rounded-full flex justify-center items-center bg-primary px-5 hover:shadow-lg"
          >
            {/* <img src={searchBtn} alt="" /> */}
            <p className="text-base text-white">Search</p>
          </button>
          {suggestions?.length ? (
            <div className="absolute w-full top-[105%] bg-base-300 p-2 rounded-lg flex flex-col space-y-[8px]">
              {suggestions?.length
                ? suggestions.map((suggestion, i) => (
                    <button
                      className="bg-base-100 rounded p-1 ps-2 text-start"
                      key={i}
                      onClick={() => setSearchText(`${suggestion?.firstName}`)}
                    >
                      {suggestion?.firstName}
                    </button>
                  ))
                : ""}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};

export default FilterForm;
