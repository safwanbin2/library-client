import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import axios from "axios";

const FilterForm = () => {
  const { filterObject, setFilterObject } = useContext(AuthContext);
  const [searchText, setSearchText] = useState(filterObject?.searchTerm || "");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsSelected, setSuggestionsSelected] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterObject((prev) => ({ ...prev, searchTerm: searchText }));
  };

  useEffect(() => {
    if (!searchText) {
      setFilterObject((prev) => ({ ...prev, searchTerm: searchText }));
    }
  }, [searchText]);

  useEffect(() => {
    if (searchText.trim() !== "" && !suggestionsSelected) {
      const getData = async () => {
        const response = await axios.get(
          `/books?searchTerm=${searchText}&limit=10`
        );

        setSuggestions(response.data.data.data);
      };

      getData();
    } else {
      setSuggestions([]);
    }
  }, [searchText, suggestionsSelected]);

  const handleSuggestions = (title) => {
    setSuggestionsSelected(!suggestionsSelected);
    setSearchText(title);
    setSuggestions([]);
  };

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
            onChange={(e) => {
              setSearchText(e.target.value);
              setSuggestionsSelected(false);
            }}
            className=" outline-none bg-transparent rounded-full px-3 py-3 w-full"
            type="text"
            placeholder="Search for books"
            value={searchText}
          />
          <button
            type="submit"
            className="rounded-full flex justify-center items-center bg-primary px-5 hover:shadow-lg"
          >
            {/* <img src={searchBtn} alt="" /> */}
            <p className="text-base text-white">Search</p>
          </button>
          {suggestions?.length ? (
            <div className="absolute  w-[500px] top-[105%] rounded-md shadow-md left-5 bg-base-200 p-2 flex flex-col space-y-[8px]">
              {suggestions?.length
                ? suggestions.map((suggestion, i) => (
                    <button
                      className="bg-base-100 text-gray-600 rounded p-1 ps-2 text-start"
                      key={i}
                      onClick={() => handleSuggestions(`${suggestion?.title}`)}
                    >
                      {suggestion?.title.slice(0, 50)}
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
