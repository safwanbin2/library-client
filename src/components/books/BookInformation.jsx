import React, { useContext, useEffect, useState } from "react";
import { RiStarSLine } from "react-icons/ri";
import "react-photo-view/dist/react-photo-view.css";
import CreateReview from "./CreateReview";
import { useQuery } from "@tanstack/react-query";
import config from "../../config";
import LoadingScreen from "../LoadingScreen";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import UserReview from "../review/UserReveiw";
import { PhotoProvider, PhotoView } from "react-photo-view";
import bookPhoto from "../../assets/book.jpg";
import { Link } from "react-router-dom";
import BorrowModal from "./BorrowModal";

const BookInformation = ({ book, refetch }) => {
  const { _id } = book ?? {};
  const [reviews, setReviews] = useState([{ _id: 1 }, { _id: 2 }, { _id: 3 }]);
  const [isLoading, setLoading] = useState(false);
  const [refetchReviews, setRefetchReviews] = useState(false);
  const { user, userDB } = useContext(AuthContext);
  const [bookId, setBookId] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`${config.base_url}/books/reviews/${_id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setReviews(data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }, [_id, refetchReviews]);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <>
      <div className="space-y-16">
        <div className="grid grid-cols-7 items-start space-y-2 gap-10">
          <div className="col-span-2">
            <PhotoProvider>
              <PhotoView src={bookPhoto}>
                <img
                  className="cursor-pointer shadow-2xl w-full"
                  src={bookPhoto}
                  alt=""
                />
              </PhotoView>
            </PhotoProvider>
          </div>
          <div className="col-span-5 space-y-8 text-gray-600">
            <div>
              <h2 className="font-bold text-2xl">Test Title</h2>
              <h3>
                By <span className="font-bold text-lg">David guest</span>
              </h3>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
              ipsum atque totam rerum tempora sunt laudantium aspernatur nostrum
              vel porro facilis temporibus animi voluptates recusandae labore,
              quos officia eos sit est earum alias. Maxime dolores vitae
              deserunt cumque molestias officia, quo amet itaque fugiat
              architecto ipsam dignissimos eaque accusantium sapiente rerum
              ullam quod rem soluta consequuntur omnis expedita doloribus atque.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque,
              officia?
            </p>
            <div className="divider"></div>
            <div className="w-4/12">
              <div className="flex justify-between">
                <h4 className="font-semibold">Genre</h4>
                <p className="">Adventure</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Release Date</h4>
                <p className="">May 2014</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Language</h4>
                <p className="">English</p>
              </div>
              <div className="flex justify-between">
                <h4 className="font-semibold">Pages</h4>
                <p className="">240</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          {/* <button onClick={() => setBookId(_id)} className="">
            Borrow Book
          </button> */}
          <label
            onClick={() => setBookId(_id)}
            htmlFor="my_modal_6"
            className="btn p-btn rounded-full"
          >
            Borrow Book
          </label>
        </div>
        <div>
          <CreateReview
            refetch={refetch}
            setRefetchReviews={setRefetchReviews}
            book={book}
          />
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl font-medium">Reviews:</h2>

          <div className="space-y-10">
            {reviews?.length
              ? reviews.map((review, i) => (
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
