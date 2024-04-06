import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { toast } from "sonner";
import axios from "axios";
const CreateReview = ({ book, refetch }) => {
  const { _id } = book ?? {};
  const { userDB } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreatePost = async (data) => {
    const review = {
      name: userDB?.name,
      image: userDB?.image,
      rating,
      comment: data?.feedback,
    };

    if (!data?.feedback) {
      return toast.error("Give Feedback");
    }
    setLoading(true);
    try {
      const res = await axios.patch(`/books/review/${_id}`, review);

      setLoading(false);

      if (res?.data?.statusCode === 200) {
        refetch();
        reset();
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleCreatePost)}>
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
        {loading ? "Reviewing..." : "Review"}
      </button>
    </form>
  );
};

export default CreateReview;
