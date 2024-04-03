import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import UploadImage from "../../../components/dashboard/profile/UploadImage";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import config from "../../../config";
import LoadingScreen from "../../../components/LoadingScreen";

const MyProfile = () => {
  const { user, userDB, setRefetchUserDB } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdate = (data) => {
    // setLoading(true);
    // fetch(`${config.base_url}/users?email=${user?.email}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data?.success) {
    //       toast.success("Updated Successfully");
    //       setLoading(false);
    //       setRefetchUserDB((prev) => !prev);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("Something went wrong");
    //     setLoading(false);
    //     console.log(err);
    //   });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col justify-start items-center gap-5">
      <UploadImage />

      {/* <div className="flex items-center">
        <svg
          className="w-4 h-4 text-yellow-300 me-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
        <p className="ms-2 text-sm font-bold">{userDB?.averageRating}</p>
        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
        <Link
          to={`/dashboard/my-rating`}
          href="#"
          className="text-sm font-medium  underline hover:no-underline "
        >
          {userDB?.reviewer} reviews
        </Link>
      </div> */}

      <form
        onSubmit={handleSubmit(handleUpdate)}
        className="mt-2 w-full space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control">
            <label className="label ps-0">
              <span className="">First Name</span>
            </label>
            <input
              {...register("firstName", {
                required: "Can not be empty",
              })}
              defaultValue={userDB?.firstName}
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
        {/* <div className="grid grid-cols-1 gap-2">
          <div className="form-control">
            <label className="label ps-0">
              <span className="">Bio</span>
            </label>
            <textarea
              {...register("bio", {
                // required: "At bio",
                minLength: 6,
              })}
              type="text"
              placeholder="Bio"
              rows="4"
              defaultValue={userDB?.bio}
              className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
            />
            {errors.bio && errors.bio.type === "required" && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">bio is required</span>
              </label>
            )}
            {errors.bio && errors.bio.type === "minLength" && (
              <label className="label text-red-400 text-xs ps-0">
                <span className="">bio is must be avobe 6 character</span>
              </label>
            )}
          </div>
        </div> */}
        <button className="p-btn rounded-full !py-2 !px-4">Save Changes</button>
      </form>
    </div>
  );
};

export default MyProfile;
