/* eslint-disable react/prop-types */
import React from "react";
import BookCard from "../cards/BookCard";

const BooksList = ({ books }) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {books?.length
          ? books.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>
    </>
  );
};

export default BooksList;
