import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import config from "../../config";

const Hero = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { setFilterObject } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleExplore = (e) => {
    e.preventDefault();
    if (!searchText) {
      return toast.info("Write something");
    }
    setFilterObject((prev) => ({ ...prev, searchTerm: searchText }));
    navigate("/books");
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
    <div className="min-h-screen hero">
      <div className="w-11/12 mx-auto flex justify-center items-center flex-col min-h-screen pt-28 pb-20 text-gray-100 gap-5">
        <h1 className="text-5xl">Welcome to University Library</h1>
        <h1 className="text-5xl">Your all-in-one library</h1>
        <p>Register now for unlimited access to books and resources</p>
        <form
          onSubmit={handleExplore}
          className="flex ps-2 gap-2 rounded-full border bg-base-100 shadow relative w-full md:w-auto"
        >
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className=" outline-none bg-transparent rounded-full px-3 py-4 w-full text-gray-600"
            type="search"
            placeholder="Search for books"
          />
          <button
            type="submit"
            className="rounded-full flex justify-center items-center bg-primary px-5 md:px-10 hover:shadow-lg"
          >
            {/* <img src={searchBtn} alt="" /> */}
            <p className="text-base md:text-xl text-white">Search</p>
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

export default Hero;
