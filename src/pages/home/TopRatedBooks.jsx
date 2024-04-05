import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import BookCard from "../../components/cards/BookCard";
import { Link } from "react-router-dom";

const TopRatedBooks = () => {
  // const { data: books, isLoading } = useQuery({
  //   queryKey: [],
  //   queryFn: async () => {
  //     const res = await fetch(`${config.base_url}/users`);
  //     const data = await res.json();
  //     return data.data;
  //   },
  // });

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }
  const [books, setBooks] = useState([
    { _id: 1, title: "TAle" },
    { _id: 2, title: "Bale" },
    { _id: 3, title: "Cale" },
  ]);
  return (
    <div className="my-16 space-y-10">
      <div className="text-center">
        <p>Books that are mostly rated</p>
        <h1 className="text-5xl font-medium">Top Rated</h1>
      </div>
      <div className="w-11/12 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
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
