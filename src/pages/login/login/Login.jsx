import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import LoadingScreen from "../../../components/LoadingScreen";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import config from "../../../config";

const Login = () => {
  const { isLoading, setIsLoading, logInWithEmail, logInWithGoogle } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

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
          toast.success(`Logged in`);
          navigate("/");
          console.log(user);
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

  const handleLogin = (data) => {
    logInWithEmail(data?.email, data?.password)
      .then((result) => {
        const user = result.user;
        toast.success(`Logged in`);
        return navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        if (err.message) {
          return toast.error(err.message);
        }
        toast.error("Failed to log In, Try again");
      });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full min-h-screen pt-6 flex justify-center items-center">
      <div className="w-11/12 md:w-5/12 mx-auto p-4 md:p-8 border  rounded-lg shadow-lg my-20">
        <h2 className="text-xl font-medium text-gray-600 mb-2">
          Login to your Account!
        </h2>
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
                className="border rounded-full focus:outline-none p-2 w-full bg-transparent"
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
                className="border focus:outline-none rounded-full p-2 w-full bg-transparent"
              />
              {errors.password && (
                <label className="label text-red-400 text-xs ps-0">
                  <span className="">Provide Password</span>
                </label>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center mt-4 gap-4">
              <button
                className="px-10 py-2 bg-primary text-white rounded-3xl hover:shadow-lg"
                type="submit"
              >
                Login
              </button>
              {/* <div className="divider bg-primary"></div> */}
              <button
                onClick={() => handleLogInWithGoogle()}
                className="px-10 py-2 bg-white text-primary  rounded-3xl hover:shadow-lg flex justify-center items-center shadow-lg border"
              >
                <FcGoogle className="text-2xl" />
                <p>oogle</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
