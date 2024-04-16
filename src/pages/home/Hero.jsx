import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

const Hero = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsSelected, setSuggestionsSelected] = useState(false);
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

  useEffect(() => {
    if (searchText.trim() !== "" && !suggestionsSelected) {
      const getData = async () => {
        const response = await axios.get(`/books?title=${searchText}&limit=10`);

        setSuggestions(response.data.data.data);
      };

      getData();
    } else {
      setSuggestions([]);
    }
  }, [searchText, suggestionsSelected]);

  const handleSuggestions = (title) => {
    setSuggestionsSelected(!suggestionsSelected);
    setFilterObject((prev) => ({ ...prev, searchTerm: title }));
    navigate("/books");
    setSuggestions([]);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.trim()) {
      setSearchText(input);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="min-h-screen hero">
      <div className="w-11/12 mx-auto flex justify-center items-center flex-col min-h-screen pt-28 pb-20 text-gray-100 gap-5">
        <h1 className="text-4xl md:text-6xl font-semibold">
          Welcome to <span className="text-primary">University Library</span>
        </h1>
        <h1 className="text-4xl md:text-6xl font-semibold">
          Your all-in-one library
        </h1>
        <p>Register now for unlimited access to books and resources</p>
        <form
          onSubmit={handleExplore}
          className="flex ps-2 gap-2 rounded-full border bg-base-100 shadow relative w-full md:w-auto"
        >
          <input
            onChange={handleChange}
            className=" outline-none bg-transparent rounded-full px-3 py-4 w-full text-gray-600"
            type="text"
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
            <div className="absolute  w-[400px] top-[105%] rounded-md shadow-md left-0 bg-base-200 p-2 flex flex-col space-y-[8px]">
              {suggestions?.length
                ? suggestions.map((suggestion, i) => (
                    <button
                      className="bg-base-100 text-gray-600 rounded p-0.5 ps-2 text-start text-xs"
                      key={i}
                      onClick={() => handleSuggestions(`${suggestion?.title}`)}
                    >
                      {suggestion?.title.slice(0, 40)}...
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
