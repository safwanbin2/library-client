/* eslint-disable react/prop-types */
import { useState } from "react";
import { RiStarSLine } from "react-icons/ri";
import "react-photo-view/dist/react-photo-view.css";
import CreateReview from "./CreateReview";

import UserReview from "../review/UserReveiw";
import { PhotoProvider, PhotoView } from "react-photo-view";

import BorrowModal from "./BorrowModal";

const BookInformation = ({ book, refetch }) => {
  const [bookId, setBookId] = useState(null);

  return (
    <>
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-7 items-start space-y-2 gap-5 md:gap-10">
          <div className="md:col-span-2">
            <PhotoProvider>
              <PhotoView src={book?.image}>
                <img
                  className="cursor-pointer shadow-2xl w-full"
                  src={book?.image}
                  alt=""
                />
              </PhotoView>
            </PhotoProvider>
          </div>
          <div className="md:col-span-5 space-y-8 text-gray-600">
            <div>
              <h2 className="font-bold text-2xl">{book?.title}</h2>
              <h3>
                By <span className="font-bold text-lg">{book?.author}</span>
              </h3>
            </div>
            <p>{book?.description}</p>
            <div className="divider"></div>
            <div className="w-4/12">
              <div className="flex justify-between">
                <h4 className="font-semibold">Genre</h4>
                <p className="">{book?.genre}</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Release Date</h4>
                <p className="">{book?.releaseDate}</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Language</h4>
                <p className="">{book?.language}</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Pages</h4>
                <p className="">{book?.pageCount}</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Rating</h4>
                <div className="flex items-center">
                  <RiStarSLine className="text-xl text-yellow-500" />
                  <span className="">{book?.rating || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          {/* <button onClick={() => setBookId(_id)} className="">
            Borrow Book
          </button> */}
          <label
            onClick={() => setBookId(book?._id)}
            htmlFor="my_modal_6"
            className="btn p-btn rounded-full"
          >
            Borrow Book
          </label>
        </div>
        <div>
          <CreateReview refetch={refetch} book={book} />
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl font-medium">Reviews:</h2>

          <div className="space-y-10">
            {book?.reviews?.length
              ? book?.reviews.map((review, i) => (
                  <UserReview key={i} review={review} />
                ))
              : "No reviews yet."}
          </div>
        </div>
      </div>
      {bookId ? <BorrowModal bookId={bookId} /> : ""}
    </>
  );
};

export default BookInformation;
