import { useContext, useState } from "react";
import BookCardAdmin from "../../../components/cards/BookCardAdmin";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import FilterForm from "../../../components/books/FilterForm";
const BooksAdmin = () => {
  const { userDB } = useContext(AuthContext);
  const { filterObject } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: books,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [
      "books",
      currentPage,
      filterObject.searchTerm,
      filterObject.genre,
      currentPage,
    ],
    queryFn: async () => {
      const queryParams = {
        userId: userDB?._id,
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

  console.log({ books });

  return (
    <div className="mt-24 mb-10 min-h-screen  space-y-5">
      <FilterForm />
      <div className="min-h-[70vh]">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex justify-start flex-wrap gap-6">
            {books?.data.length
              ? books?.data.map((book, i) => (
                  <BookCardAdmin key={i} book={book} refetch={refetch} />
                ))
              : "No Data found"}
          </div>
        )}
      </div>

      <div className="text-center">
        <div className="join">
          {books?.meta?.total > 0 && (
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

export default BooksAdmin;
