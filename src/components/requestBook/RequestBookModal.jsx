import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const RequestBookModal = () => {
  const { userDB } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRequest = async (data) => {
    setLoading(true);
    try {
      data.user = userDB?._id;
      const promise = await axios.post(`/book-request`, data);
      if (promise.status === 200) {
        toast.success(`Book requested!`, {
          id: "book",
          duration: 2000,
          position: "top-right",
        });
        reset();

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error(
        error.response.data.message || `Failed to request book`,
        {
          id: "book",
          duration: 2000,
          position: "top-right",
        }
      );
    }
  };

  return (
    <>
      <input type="checkbox" id="request_book_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Share Book Info</h3>
          <form
            onSubmit={handleSubmit(handleRequest)}
            className="mt-2 w-full space-y-4"
          >
            <div className="grid grid-cols-1 gap-2">
              <div className="form-control">
                <input
                  {...register("title", {
                    required: "Provide TItle",
                    minLength: 4,
                  })}
                  type="text"
                  placeholder="Title"
                  className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
                />
                {errors.title && errors.title.type === "required" && (
                  <label className="label text-red-400 text-xs ps-0">
                    <span className="">Title is required</span>
                  </label>
                )}
                {errors.title && errors.title.type === "minLength" && (
                  <label className="label text-red-400 text-xs ps-0">
                    <span className="">Title mus be above 4 characters</span>
                  </label>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="form-control">
                <input
                  {...register("author", {
                    required: "Provide Author",
                    minLength: 4,
                  })}
                  type="text"
                  placeholder="Author"
                  className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
                />
                {errors.author && errors.author.type === "required" && (
                  <label className="label text-red-400 text-xs ps-0">
                    <span className="">Author is required</span>
                  </label>
                )}
                {errors.author && errors.author.type === "minLength" && (
                  <label className="label text-red-400 text-xs ps-0">
                    <span className="">Author mus be above 4 characters</span>
                  </label>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="form-control">
                <textarea
                  {...register("description", {
                    required: "Provide description",
                    minLength: 10,
                  })}
                  type="text"
                  placeholder="Description"
                  rows="4"
                  className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
                />
                {errors.description &&
                  errors.description.type === "required" && (
                    <label className="label text-red-400 text-xs ps-0">
                      <span className="">Description is required</span>
                    </label>
                  )}
                {errors.description &&
                  errors.description.type === "minLength" && (
                    <label className="label text-red-400 text-xs ps-0">
                      <span className="">
                        Description is must be avobe 10 character
                      </span>
                    </label>
                  )}
              </div>
            </div>
            <div className="modal-action">
              <label
                htmlFor="request_book_modal"
                className="p-btn !bg-error rounded-full cursor-pointer"
              >
                Cancel
              </label>
              <button
                disabled={loading}
                type="submit"
                className="p-btn rounded-full"
              >
                {loading ? "Processing..." : "Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestBookModal;
