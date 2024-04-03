import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";

const AddBook = () => {
  const { user, userDB, setRefetchUserDB } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex flex-col justify-start items-center gap-5">
      <form className="mt-2 w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label ps-0">
              <span className="">First Name</span>
            </label>
            <input
              {...register("firstName", {
                required: "Can not be empty",
              })}
              type="text"
              placeholder="first name"
              className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.firstName && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">{errors.firstName.message}</span>
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Last Name</span>
            </label>
            <input
              {...register("lastName", {
                // required: "Can not be empty",
              })}
              defaultValue={userDB?.lastName}
              type="text"
              placeholder="last name"
              className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.lastName && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">{errors.lastName.message}</span>
              </label>
            )}
          </div>
        </div>
        <button className="p-btn rounded-full !py-2 !px-4">Save Changes</button>
      </form>
    </div>
  );
};

export default AddBook;
