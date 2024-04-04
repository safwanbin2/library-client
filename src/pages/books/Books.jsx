import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import config from "../../config";
import LoadingScreen from "../../components/LoadingScreen";
import FilterForm from "../../components/books/FilterForm";
import BooksList from "../../components/books/BooksList";

const Books = () => {
  const { filterObject } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [books, setBooks] = useState([
    { _id: 1 },
    { _id: 2 },
    { _id: 3 },
    { _id: 4 },
    { _id: 5 },
  ]);

  // const { data: persons, isLoading } = useQuery({
  //   queryKey: [filterObject, filterObject?.searchTerm, currentPage],
  //   queryFn: async () => {
  //     const res = await fetch(
  //       `${config.base_url}/books?searchTerm=${
  //         filterObject?.searchTerm || ""
  //       }&page=${currentPage}`
  //     );
  //     const data = await res.json();
  //     setTotalPages(Math.ceil(data.total / data.limit));
  //     return data.data;
  //   },
  // });

  useEffect(() => {
    setCurrentPage(1); // Reset current page when search term changes
  }, [filterObject?.searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <div className="mt-24 mb-10 min-h-screen w-11/12 mx-auto space-y-5">
      <FilterForm />
      <div className="min-h-[70vh]">
        <BooksList books={books} />
      </div>

      <div className="text-center">
        <div className="join">
          <button
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default Books;
