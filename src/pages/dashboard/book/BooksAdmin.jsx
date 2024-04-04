import React, { useState } from "react";
import BookCardAdmin from "../../../components/cards/BookCardAdmin";

const BooksAdmin = () => {
  const [books, setBooks] = useState([
    { _id: 1 },
    { _id: 2 },
    { _id: 3 },
    { _id: 4 },
    { _id: 5 },
  ]);
  const [genre, setGenre] = useState("");
  return (
    <div className="flex flex-col justify-start items-start gap-5">
      <select
        onChange={(e) => setGenre(e.target.value)}
        className="select select-bordered focus:outline-none rounded-full !px-3 w-6/12 md:w-2/12 shadow"
      >
        <option selected>All</option>
        <option value="action">Action</option>
        <option value="thriller">Thriller</option>
      </select>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 md:gap-8">
        {books?.length
          ? books.map((book, i) => <BookCardAdmin key={i} book={book} />)
          : "No Data found"}
      </div>
    </div>
  );
};

export default BooksAdmin;
