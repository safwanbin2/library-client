/* eslint-disable react/prop-types */
import BookCard from "../cards/BookCard";

const BooksList = ({ books }) => {
  return (
    <>
      <div className="flex justify-start flex-wrap gap-6">
        {books?.length
          ? books.map((book, i) => <BookCard key={i} book={book} />)
          : "No Data found"}
      </div>
    </>
  );
};

export default BooksList;
