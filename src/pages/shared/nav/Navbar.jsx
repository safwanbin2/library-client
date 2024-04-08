import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext/AuthProvider";
import RequestBookModal from "../../../components/requestBook/RequestBookModal";

const Navbar = () => {
  const { userDB } = useContext(AuthContext);
  const [navbar, setNavbar] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScroll(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NavLinks = (
    <>
      <>
        <li
          className={`text-gray-600 text-base dropdown dropdown-hover me-4 md:py-4 hover:text-primary transition-all duration-300`}
        >
          <Link
            to="/books"
            className="flex flex-col justify-center items-center gap-[2px]"
          >
            <p className="">Books</p>
          </Link>
        </li>
        {userDB?.role === "user" && (
          <li className="text-gray-600 text-base dropdown dropdown-hover me-4 md:py-4 hover:text-primary transition-all duration-300 ">
            <label
              htmlFor="request_book_modal"
              className="flex flex-col justify-center items-center gap-[2px] cursor-pointer"
            >
              Request Books
            </label>
          </li>
        )}
        {userDB?.email ? (
          <>
            <li className="text-grey font-semibold dropdown dropdown-hover me-4 md:py-4">
              <Link
                to={`/dashboard/my-profile`}
                className="flex flex-col justify-center items-center gap-[2px]"
              >
                <p className=" text-primary">
                  <img
                    src={userDB?.image}
                    className="size-10 rounded-full"
                    alt=""
                  />
                  {/* <BsPerson className="text-2xl" /> */}
                </p>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-gray-600 text-base dropdown dropdown-hover me-4 py-2">
              <Link
                to={"/login"}
                className="flex flex-col justify-center items-center gap-[2px] p-btn rounded-full "
              >
                <p className="">Login</p>
              </Link>
            </li>
          </>
        )}
      </>
    </>
  );

  return (
    <>
      <nav
        className={`bg-base-100 shadow-lg z-10 transition-all duration-500 w-full fixed top-0 left-0 ${
          scroll ? " bg-opacity-50 backdrop-filter backdrop-blur-lg" : ""
        }`}
      >
        <div className={`${navbar ? "bg-base-100 shadow" : ""} py-2 md:py-0`}>
          <div className="justify-between w-11/12 mx-auto md:items-center md:flex">
            <div>
              <div className="flex items-center justify-between md:block">
                <ul className="flex justify-center items-center space-x-4 md:space-x-8 md:space-y-0 tracking-wider">
                  <li>
                    <Link
                      className="text-primary text-xl md:text-2xl uppercase font-bold"
                      to="/"
                    >
                      <h2 className="text-primary">Library</h2>
                      {/* <img className='h-[32px]' src={m} alt="" /> */}
                    </Link>
                  </li>
                </ul>
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-600 rounded-md outline-none py-4"
                    onClick={() => setNavbar(!navbar)}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 mt-2 font-bold md:font-normal md:block md:pb-0 md:mt-0 ${
                  navbar ? "block" : "hidden"
                }`}
              >
                <ul
                  className={`flex-col items-start justify-start md:flex-row md:items-center md:justify-center space-y-4 flex md:space-x-8 md:space-y-0 tracking-wider text-sm`}
                >
                  {NavLinks}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <RequestBookModal />
    </>
  );
};

export default Navbar;
