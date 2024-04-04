import React from "react";
import { RiStarSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import book from "../../assets/book.jpg";

const BorrowCard = ({ borrow }) => {
  const { _id } = borrow ?? {};

  return (
    <div className="flex gap-4 justify-start items-start">
      <img src={book} className="w-[120px]" alt="" />
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <Link
            to={`/books/${_id}`}
            className="text-sm md:text-base font-semibold link"
          >
            Test Book <span>(Author)</span>
          </Link>
        </div>
        <div>
          <p className="text-sm md:text-base text-gray-500">
            {/* {bio?.length > 40 ? `${bio.slice(0, 40)}...` : bio} */}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit...
          </p>
          <div>
            <h2>
              status:{" "}
              <span className="text-sm md:text-base font-semibold">
                Pending
              </span>
            </h2>
            <h2>
              Borrowed at:{" "}
              <span className="text-sm md:text-base font-semibold">
                3rd May
              </span>
            </h2>
            <h2>
              Returned at:{" "}
              <span className="text-sm md:text-base font-semibold">
                10th May
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowCard;
