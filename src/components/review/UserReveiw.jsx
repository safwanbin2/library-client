import React from "react";
import { Link } from "react-router-dom";
import unknown from "../../assets/unknown.jpg";

const UserReview = ({ review }) => {
  const { _id } = review ?? {};

  const showStars = (amount) => {
    let arr = [];
    for (let i = 1; i <= parseInt(amount); i++) {
      arr.push(
        <svg
          className="w-5 h-5 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
    return arr;
  };

  return (
    <figure className="max-w-screen-md">
      <div className="flex items-center mb-2 text-yellow-300">
        {/* {showStars(rating).map((star) => star)} */}
        {showStars(5).map((star) => star)}
      </div>
      <blockquote>
        {/* <p className="text-lg font-medium text-gray-200">{feedback}</p> */}
        <p className="text-lg font-medium text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
          commodi aliquid temporibus voluptate itaque maxime dolores
          consequatur, ab doloremque! Laborum.
        </p>
      </blockquote>
      <figcaption className="flex items-center mt-2 space-x-3 rtl:space-x-reverse">
        <img
          className="size-8 rounded-full"
          // src={reviewerPhoto ? reviewerPhoto : unknown}
          alt="profile picture"
        />
        <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
          <p className="pe-3 font-medium">Test person</p>
        </div>
      </figcaption>
    </figure>
  );
};

export default UserReview;
