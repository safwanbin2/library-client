import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import { toast } from "sonner";
import LoadingScreen from "../../../components/LoadingScreen";
import config from "../../../config";

const Register = () => {
  const {
    isLoading,
    setIsLoading,
    logInWithGoogle,
    createUserWithEmail,
    update,
  } = useContext(AuthContext);
  // const [consent, setConsent] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    createUserWithEmail(data.email, data.password)
      .then((result) => {
        const user = result.user;
        if (user.uid) {
          update(`${data.firstName} ${data.lastName}`);
          let newUser = {
            email: user?.email || data?.email,
            firstName: data?.firstName,
            lastName: data?.lastName,
          };

          fetch(`${config.base_url}/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              setIsLoading(false);
              toast.success(`Logged in`);
              return navigate("/");
            });
        }
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        if (err.message) {
          return toast.error(err.message);
        }
        toast.error("Error creating account");
      });
  };

  const handleLogInWithGoogle = () => {
    logInWithGoogle()
      .then((result) => {
        const user = result.user;
        if (user.uid) {
          setIsLoading(true);
          let newUser = {
            email: user?.email,
            firstName: user?.displayName,
            lastName: null,
            photo: user?.photoURL,
          };

          fetch(`${config.base_url}/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              setIsLoading(false);
              toast.success(`Logged in`);
              return navigate("/");
            });

          setIsLoading(false);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        if (err.message) {
          return toast.error(err.message);
        }
        toast.error("Error Occured");
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full min-h-screen pt-6 flex justify-center items-center">
      <div className="w-11/12 md:w-6/12 mx-auto p-4 md:p-8 border  rounded-lg shadow-lg my-20">
        <h2 className="text-xl font-medium text-gray-600 mb-2">
          Create your Account!
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
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
                className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
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
                type="text"
                placeholder="last name"
                className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
              />
              {errors.lastName && (
                <label className="label text-red-400 text-xs ps-0">
                  <span className="">{errors.lastName.message}</span>
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mb-2">
            <div className="form-control">
              <label className="label ps-0">
                <span className="">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Provide an email",
                })}
                type="email"
                placeholder="email"
                className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
              />
              {errors.email && (
                <label className="label text-red-400 text-xs ps-0">
                  <span className="">{errors.email.message}</span>
                </label>
              )}
            </div>

            {/* <div className="form-control">
              <label className="label ps-0">
                <span className="">Gender</span>
              </label>
              <select
                {...register("gender", {
                  required: "gender required",
                })}
                className="border rounded-full focus:outline-none p-2  w-full bg-transparent"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <label className="label text-red-400 text-xs ps-0">
                  <span className="">{errors.gender.message}</span>
                </label>
              )}
            </div> */}
          </div>
          <div className="grid grid-cols-1 gap-2 mb-2">
            <div className="form-control">
              <label className="label ps-0">
                <span className="">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Password must be at least six character long",
                  minLength: 6,
                })}
                type="password"
                placeholder="password"
                className="border rounded-lg focus:outline-none p-2  w-full bg-transparent"
              />
              {errors.password && errors.password.type === "required" && (
                <label className="label text-red-400 text-xs ps-0">
                  <span className="">Password is required</span>
                </label>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <label className="label text-red-400 text-xs ps-0">
                  <span className="">
                    Password is must be avobe 6 character
                  </span>
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center mt-6 mb-2 gap-4">
            <button
              className="px-10 py-2 bg-primary text-white rounded-lg shadow hover:shadow-lg"
              type="submit"
            >
              Create Account
            </button>
            <button
              onClick={() => handleLogInWithGoogle()}
              className="px-10 py-2 bg-white text-primary  rounded-lg hover:shadow-lg flex justify-center items-center shadow border"
            >
              <FcGoogle className="text-2xl" />
              <p>oogle</p>
            </button>
          </div>
          <p className="text-sm">
            Already have account?{" "}
            <Link
              className="font-semibold tracking-wider text-grey"
              to="/login"
            >
              Login
            </Link>{" "}
            here
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
