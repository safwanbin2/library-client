/* eslint-disable react/prop-types */

import { RiStarSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link
      to={`/books/${book?._id}`}
      className="md:space-y-2 w-[250px] md:w-[200px] hover:shadow-md hover:bg-gray-50"
    >
      <img
        src={book?.image}
        className="rounded-t-xl w-full h-52 md:h-44 lg:h-64"
        alt=""
      />
      <div className="p-2 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-sm md:text-base font-semibold">
            {book?.title.slice(0, 50)}
          </h2>
          <div className="flex items-center">
            <RiStarSLine className="text-xl text-yellow-500" />
            <span className="text-sm font-semibold">5</span>
          </div>
        </div>
        {/* <p className="text-sm md:text-base text-gray-500">
          {book?.description.slice(0, 100)}...
        </p> */}
      </div>
    </Link>
  );
};

export default BookCard;
