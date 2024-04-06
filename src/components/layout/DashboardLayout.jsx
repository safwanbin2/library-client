/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { GoSignOut } from "react-icons/go";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaBook } from "react-icons/fa";
import { FaBookMedical } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { VscNewFile } from "react-icons/vsc";
import { toast } from "sonner";
import { SiBookstack } from "react-icons/si";

const DashboardLayout = () => {
  const { logOut, userDB } = useContext(AuthContext);

  console.log(userDB?.role);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    const consent = window.confirm("Are you sure you want to log out?");
    if (consent) {
      localStorage.removeItem("accessToken");
      logOut()
        .then(() => {
          toast.success("Logged out successfully");
          navigate("/");
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Problem occured while logging out");
        });
    }
  };

  const sideLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            `flex items-center p-2 rounded-lg  border-b-2 border-transparent hover:bg-base-200 ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <FaHome className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" />
          <span className="flex-1 ml-3 whitespace-nowrap">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/my-profile"
          className={({ isActive, isPending }) =>
            `flex items-center p-2 rounded-lg  border-b-2 border-transparent hover:bg-base-200 ${
              isActive ? "bg-primary text-white" : ""
            }`
          }
        >
          <CgProfile className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" />
          <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
        </NavLink>
      </li>
      {userDB?.role === "user" && (
        <li>
          <NavLink
            to="/dashboard/my-books"
            className={({ isActive, isPending }) =>
              `flex items-center p-2 rounded-lg  border-b-2 border-transparent hover:bg-base-200 ${
                isActive ? "bg-primary text-white" : ""
              }`
            }
          >
            <FaBook className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" />
            <span className="flex-1 ml-3 whitespace-nowrap">My Borrowings</span>
          </NavLink>
        </li>
      )}
      {userDB?.role === "librarian" && (
        <li>
          <NavLink
            to="/dashboard/books"
            className={({ isActive, isPending }) =>
              `flex items-center p-2 rounded-lg  border-b-2 border-transparent hover:bg-base-200 ${
                isActive ? "bg-primary text-white" : ""
              }`
            }
          >
            <SiBookstack className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" />
            <span className="flex-1 ml-3 whitespace-nowrap">Books</span>
          </NavLink>
        </li>
      )}
      {userDB?.role === "librarian" && (
        <li>
          <NavLink
            to="/dashboard/add-book"
            className={({ isActive, isPending }) =>
              `flex items-center p-2 rounded-lg  border-b-2 border-transparent hover:bg-base-200 ${
                isActive ? "bg-primary text-white" : ""
              }`
            }
          >
            <FaBookMedical className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" />
            <span className="flex-1 ml-3 whitespace-nowrap">Add Book</span>
          </NavLink>
        </li>
      )}
      {userDB?.role === "user" && (
        <li>
          <NavLink
            to="/dashboard/borrow-requests"
            className={({ isActive, isPending }) =>
              `flex items-center p-2 rounded-lg  border-b-2 border-transparent hover:bg-base-200 ${
                isActive ? "bg-primary text-white" : ""
              }`
            }
          >
            <CiSquareQuestion className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" />
            <span className="flex-1 ml-3 whitespace-nowrap">
              Borrow Requests
            </span>
          </NavLink>
        </li>
      )}
      {userDB?.role === "librarian" && (
        <li>
          <NavLink
            to="/dashboard/book-requests"
            className={({ isActive, isPending }) =>
              `flex items-center p-2 rounded-lg  border-b-2 border-transparent hover:bg-base-200 ${
                isActive ? "bg-primary text-white" : ""
              }`
            }
          >
            <VscNewFile className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" />
            <span className="flex-1 ml-3 whitespace-nowrap">
              New Book Requests
            </span>
          </NavLink>
        </li>
      )}
      <li>
        <button
          onClick={handleLogOut}
          className="flex items-center p-2 rounded-lg  border-b-2 border-transparent hover:bg-base-200"
        >
          <GoSignOut className="flex-shrink-0 w-6 h-6  transition duration-75 group-hover:text-gray-900" />
          <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
        </button>
      </li>
    </>
  );
  return (
    <section className="bg-base-100">
      <nav className="fixed top-0 z-50 w-full bg-base border-b bg-base-100 shadow">
        <div className=" py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between px-4">
            <Link
              className="text-primary text-xl md:text-2xl uppercase font-bold"
              to="/"
            >
              <h2 className="text-primary">Rating</h2>
              {/* <img className='h-[32px]' src={m} alt="" /> */}
            </Link>
            <div className="flex md:hidden items-center justify-start">
              <button
                onClick={() => handleToggle()}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="p-2 text-gray-600 rounded-md outline-none "
              >
                <span className="sr-only">Open sidebar</span>
                {isOpen ? (
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
                ) : (
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
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`${
          isOpen ? "-translate-x-full" : ""
        } shadow bg-base-100 fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-base border-r border-gray-200 sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-base">
          <ul className="space-y-2 font-medium">{sideLinks}</ul>
        </div>
      </aside>
      {/* display */}
      <div className="mr-4 ml-4 md:ml-72 my-20">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
