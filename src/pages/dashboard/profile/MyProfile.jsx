import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

import { toast } from "sonner";
import UploadImage from "../../../components/dashboard/profile/UploadImage";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";

import LoadingScreen from "../../../components/LoadingScreen";

const MyProfile = () => {
  const { userRefetch, setUserRefetch, userDB } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdate = async (data) => {
    setLoading(true);
    const name = data.firstName + " " + data.lastName;
    const result = await axios.patch(`/users/update/${userDB?._id}`, { name });

    if (result?.data?.statusCode === 200) {
      setLoading(false);
      setUserRefetch(!userRefetch);
      toast.success("Updated!");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col justify-start items-center gap-5">
      <UploadImage />

      <h1>{userDB?.name}</h1>

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
                required: "Can not be empty",
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

        <button disabled={loading} className="p-btn rounded-full !py-2 !px-4">
          {loading ? "Saving.." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
