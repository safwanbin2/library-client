/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import LoadingScreen from "../../../components/LoadingScreen";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import axios from "axios";

const Login = () => {
  const { isLoading, setUserRefetch, userRefetch, logInWithGoogle } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const res = await logInWithGoogle();

    if (res._tokenResponse.email) {
      const payload = {
        name: res._tokenResponse.fullName,
        email: res._tokenResponse.email,
        image: res._tokenResponse.photoUrl,
        role: "user",
      };

      try {
        const promise = await axios.post(`/users/create-google-user`, payload);
        if (promise.status === 200) {
          localStorage.setItem("accessToken", promise.data.data);
          setUserRefetch(!userRefetch);
          setTimeout(() => {
            toast.success(`Logged in`, {
              id: "login",
              duration: 2000,
              position: "top-right",
            });
            navigate("/");
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        return toast.error(error.response.data.message || `Log in failed`, {
          id: "login",
          duration: 2000,
          position: "top-right",
        });
      }
    }
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const promise = await axios.post(`/users/signin`, values);
      if (promise.status === 200) {
        localStorage.setItem("accessToken", promise.data.data);
        setUserRefetch(!userRefetch);
        setTimeout(() => {
          toast.success(`Logged in`, {
            id: "login",
            duration: 2000,
            position: "top-right",
          });
          navigate("/");
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error(error.response.data.message || `Log in failed`, {
        id: "login",
        duration: 2000,
        position: "top-right",
      });
    }
  };

  // const handleLogInWithGoogle = () => {
  //   logInWithGoogle()
  //     .then((result) => {
  //       const user = result.user;
  //       if (user.uid) {
  //         setIsLoading(true);
  //         let newUser = {
  //           email: user?.email,
  //           firstName: user?.displayName,
  //           lastName: null,
  //           photo: user?.photoURL,
  //         };

  //         fetch(`${config.base_url}/users`, {
  //           method: "POST",
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //           body: JSON.stringify(newUser),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => {
  //             setIsLoading(false);
  //             toast.success(`Logged in`);
  //             return navigate("/");
  //           });

  //         setIsLoading(false);
  //         toast.success(`Logged in`);
  //         navigate("/");
  //         console.log(user);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setIsLoading(false);
  //       if (err.message) {
  //         return toast.error(err.message);
  //       }
  //       toast.error("Error Occured");
  //     });
  // };

  // const handleLogin = (data) => {
  //   logInWithEmail(data?.email, data?.password)
  //     .then((result) => {
  //       const user = result.user;
  //       toast.success(`Logged in`);
  //       return navigate("/");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setIsLoading(false);
  //       if (err.message) {
  //         return toast.error(err.message);
  //       }
  //       toast.error("Failed to log In, Try again");
  //     });
  // };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full min-h-screen pt-6 flex justify-center items-center">
      <div className="w-11/12 md:w-5/12 mx-auto p-4 md:p-8 border  rounded-lg shadow-lg my-20">
        <h2 className="text-xl font-medium text-gray-600 mb-2">
          Login to your Account!
        </h2>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-2">
          <div className="grid grid-cols-1 gap-2 mb-2">
            <div className="form-control mb-2">
              <label className="label ps-0">
                <span className="">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Provide an email",
                })}
                type="email"
                placeholder="email"
                className="border rounded-lg focus:outline-none p-2 w-full bg-transparent"
              />
              {errors.email && (
                <label className="label text-red-400 text-xs ps-0">
                  <span className="">{errors.email.message}</span>
                </label>
              )}
            </div>
            <div className="form-control mb-2">
              <label className="label ps-0">
                <span className="">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Password must be at least six character long",
                })}
                type="password"
                placeholder="password"
                className="border focus:outline-none rounded-lg p-2 w-full bg-transparent"
              />
              {errors.password && (
                <label className="label text-red-400 text-xs ps-0">
                  <span className="">Provide Password</span>
                </label>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center mt-2 gap-4">
              <button
                disabled={loading}
                className="px-10 py-2 bg-primary text-white rounded-lg hover:shadow-lg shadow"
                type="submit"
              >
                {loading ? "Processing.." : "Login"}
              </button>
              {/* <div className="divider bg-primary"></div> */}
              <button
                disabled={loading}
                onClick={handleGoogleSignIn}
                className="px-10 py-2 bg-white text-primary  rounded-lg hover:shadow-lg flex justify-center items-center shadow border"
              >
                <FcGoogle className="text-2xl" />
                <p>{loading ? "Processing.." : "Continue with google"}</p>
              </button>
            </div>
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                className="font-semibold tracking-wider text-grey"
                to="/register"
              >
                Register
              </Link>{" "}
              here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
