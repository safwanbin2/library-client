import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const FilterForm = () => {
  const [searchText, setSearchText] = useState("");

  const { filterObject, setFilterObject } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterObject((prev) => ({ ...prev, searchTerm: searchText }));
  };

  useEffect(() => {
    if (!searchText) {
      setFilterObject((prev) => ({ ...prev, searchTerm: searchText }));
    }
  }, [searchText]);

  return (
    <div className="space-y-1">
      <h2 className="font-medium text-gray-600">Filter: </h2>
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center ">
        <select
          onChange={(e) =>
            setFilterObject((prev) => ({ ...prev, genre: e.target.value }))
          }
          className="select select-bordered focus:outline-none rounded-full !px-3 w-6/12 md:w-2/12 shadow"
        >
          <option value="" selected>
            All
          </option>
          <option value="Action">Action</option>
          <option value="Thriller">Thriller</option>
          <option value="Historical">Historical</option>
          <option value="Programming">Programming</option>
          <option value="Medical">Medical</option>
          <option value="Comedy">Comedy</option>
        </select>
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 rounded-full border bg-base-100 shadow w-full md:w-6/12 relative"
        >
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className=" outline-none bg-transparent rounded-full px-3 py-3 w-full"
            type="text"
            placeholder="Search for books"
            defaultValue={filterObject?.searchTerm}
          />
          <button
            type="submit"
            className="rounded-full flex justify-center items-center bg-primary px-5 hover:shadow-lg"
          >
            {/* <img src={searchBtn} alt="" /> */}
            <p className="text-base text-white">Search</p>
          </button>
          {/* {suggestions?.length ? (
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
          )} */}
        </form>
      </div>
    </div>
  );
};

export default FilterForm;
