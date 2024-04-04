import React from "react";
import { useForm } from "react-hook-form";

const RequestBookModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRequest = (data) => {
    console.log(data);
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
                <textarea
                  {...register("details", {
                    required: "Provide Details",
                    minLength: 10,
                  })}
                  type="text"
                  placeholder="Details"
                  rows="4"
                  className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
                />
                {errors.details && errors.details.type === "required" && (
                  <label className="label text-red-400 text-xs ps-0">
                    <span className="">bio is required</span>
                  </label>
                )}
                {errors.details && errors.details.type === "minLength" && (
                  <label className="label text-red-400 text-xs ps-0">
                    <span className="">bio is must be avobe 10 character</span>
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
              <button type="submit" className="p-btn rounded-full">
                Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestBookModal;
