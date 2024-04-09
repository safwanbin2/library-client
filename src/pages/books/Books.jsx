import { useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import FilterForm from "../../components/books/FilterForm";
import BooksList from "../../components/books/BooksList";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const Books = () => {
  const { filterObject } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: books, isLoading } = useQuery({
    queryKey: [
      "books",
      currentPage,
      filterObject.searchTerm,
      filterObject.genre,
      currentPage,
    ],
    queryFn: async () => {
      const queryParams = {
        page: currentPage,
      };

      if (filterObject.searchTerm) {
        queryParams.searchTerm = filterObject.searchTerm;
      }
      if (filterObject.genre) {
        queryParams.genre = filterObject.genre;
      }

      const queryString = new URLSearchParams(queryParams).toString();

      const res = await axios.get(`/books?${queryString}&limit=14`);

      return res.data.data;
    },
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-24 mb-10 min-h-screen w-11/12 mx-auto space-y-5">
      <FilterForm />
      <div className="min-h-[70vh]">
        {isLoading ? <p>Loading...</p> : <BooksList books={books?.data} />}
      </div>

      <div className="text-center">
        <div className="join">
          {books?.meta.total > 0 && (
            <div className="flex justify-center mt-4">
              {Array.from(
                { length: Math.ceil(books?.meta.total / 10) },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 mx-2 border rounded ${
                    currentPage === page ? "bg-blue-500 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;

{
  /* <button
            className="join-item px-3 py-2 bg-base-200"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            «
          </button>

          <button className={`join-item px-3 py-2 bg-base-300`}>
            {currentPage}
          </button>

          <button
            className="join-item px-3 py-2 bg-base-200"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            »
          </button> */
}
