import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { toast } from "sonner";
import config from "../../config";
import LoadingScreen from "../LoadingScreen";

const CreateReview = ({ book, setRefetchReviews, refetch }) => {
  const { _id } = book ?? {};
  const { userDB, user } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreatePost = (data) => {
    // const review = {
    //   reviewerId: userDB?._id,
    //   reviewerEmail: userDB?.email,
    //   reviewerPhoto: userDB?.photo || user?.photoURL,
    //   reviewerName: `${userDB?.firstName ? userDB?.firstName : ""} ${
    //     userDB?.lastName ? userDB?.lastName : ""
    //   }`,
    //   receiverId: _id,
    //   receiverEmail: email,
    //   rating,
    //   feedback: data?.feedback,
    // };
    // if (!rating) {
    //   return toast.error("Give Star");
    // }
    // if (!data?.feedback) {
    //   return toast.error("Give Feedback");
    // }
    // setLoading(true);
    // fetch(`${config.base_url}/reviews`, {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(review),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setLoading(false);
    //     if (data?.success) {
    //       setRefetchReviews((prev) => !prev);
    //       refetch();
    //       return toast.success(data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     toast.error(err.message || "Something went wrong!");
    //   });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <form onSubmit={handleSubmit(handleCreatePost)}>
      {/* <label className="label text-red-400 text-xs ps-0">
        <span className="">Choose Stars</span>
      </label> */}
      <div
        className={`${
          errors.comment ? "border-red-400" : "border-gray-200"
        } w-full mb-4 border rounded-lg`}
      >
        <div className="flex items-center justify-between px-3 border-b ">
          <div className="flex items-center divide-gray-200 sm:divide-x ">
            <div className="rating">
              <input
                onClick={(e) => setRating(Number(e.target.value))}
                type="radio"
                id="star5"
                name="rating"
                value="5"
                defaultChecked
              />
              <label htmlFor="star5"></label>
              <input
                onClick={(e) => setRating(Number(e.target.value))}
                type="radio"
                id="star4"
                name="rating"
                value="4"
              />
              <label htmlFor="star4"></label>
              <input
                onClick={(e) => setRating(Number(e.target.value))}
                type="radio"
                id="star3"
                name="rating"
                value="3"
              />
              <label htmlFor="star3"></label>
              <input
                onClick={(e) => setRating(Number(e.target.value))}
                type="radio"
                id="star2"
                name="rating"
                value="2"
              />
              <label htmlFor="star2"></label>
              <input
                onClick={(e) => setRating(Number(e.target.value))}
                type="radio"
                id="star1"
                name="rating"
                value="1"
              />
              <label htmlFor="star1"></label>
            </div>
          </div>
        </div>
        <div className="px-4 py-2 rounded-b-lg">
          <label htmlFor="editor" className="sr-only">
            Publish post
          </label>
          <textarea
            {...register("feedback", {
              required: "Adding a feedback is required",
            })}
            id="editor"
            rows="4"
            className="block w-full px-0 focus:outline-none text-sm border-transparent focus:border-transparent bg-transparent"
            placeholder="Provide a feedback"
          ></textarea>
        </div>
      </div>
      <button type="submit" className="p-btn rounded-full">
        Review
      </button>
    </form>
  );
};

export default CreateReview;
