import React from "react";
import { RiStarSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import bookPhoto from "../../assets/book.jpg";

const BookCard = ({ book }) => {
  const { _id } = book ?? {};

  return (
    <Link to={`/books/${_id}`} className="md:space-y-2">
      <img
        src={bookPhoto}
        className="rounded-t-xl w-full h-36 md:h-44 lg:h-64"
        alt=""
      />
      <div className="p-2 space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-sm md:text-base font-semibold">Test Book</h2>
          <div className="flex items-center">
            <RiStarSLine className="text-xl text-yellow-500" />
            <span className="text-sm font-semibold">
              {/* {(isNaN(Number(totalRating) / Number(reviewer))
                ? 0
                : Number(totalRating) / Number(reviewer) > 5
                ? 5
                : parseFloat(Number(totalRating) / Number(reviewer)).toFixed(
                    1
                  )) || 0} */}
              5
            </span>
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-500">
          {/* {bio?.length > 40 ? `${bio.slice(0, 40)}...` : bio} */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
          dolorem
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
