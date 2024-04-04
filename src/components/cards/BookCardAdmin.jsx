import React from "react";
import { RiStarSLine } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";

const BookCardAdmin = ({ book }) => {
  const { _id } = book ?? {};

  return (
    <div className="md:space-y-2">
      <img
        // src={photo ? photo : unknown}
        className="rounded-t-xl w-full h-36 md:h-44 lg:h-56"
        alt=""
      />
      <div className="p-2 space-y-2">
        <div className="flex justify-between items-start">
          <Link
            to={`/books/${_id}`}
            className="text-sm md:text-base font-semibold link"
          >
            Test Book
          </Link>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="">
              <CiMenuKebab className="text-xl" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded w-52"
            >
              <li>
                <Link className="">Edit</Link>
              </li>
              <li>
                <button className="">Delete</button>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm md:text-base text-gray-500">
          {/* {bio?.length > 40 ? `${bio.slice(0, 40)}...` : bio} */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
          dolorem
        </p>
      </div>
    </div>
  );
};

export default BookCardAdmin;
