import { useQuery } from "@tanstack/react-query";
import BookCard from "../../components/cards/BookCard";
import { Link } from "react-router-dom";
import axios from "axios";

const TopRatedBooks = () => {
  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axios.get(`/books`);

      return res.data.data.data;
    },
  });

  return (
    <div className="my-16 space-y-10">
      <div className="text-center">
        <p>Books that are mostly rated</p>
        <h1 className="text-5xl font-medium">Top Rated</h1>
      </div>
      <div className="w-11/12 mx-auto flex justify-center flex-wrap gap-6">
        {books?.length
          ? books.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>
      <div className="text-center">
        <Link to="/books" className="p-btn rounded-full">
          More Books
        </Link>
      </div>
    </div>
  );
};

export default TopRatedBooks;
