import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import PageNotFound from "../components/PageNotFound";
import Home from "../pages/home/Home";
import Login from "../pages/login/login/Login";
import Register from "../pages/login/register/Register";
import Books from "../pages/books/Books";
import BookPage from "../pages/books/BookPage";
import MyProfile from "../pages/dashboard/profile/MyProfile";
import MyBook from "../pages/dashboard/myBook/MyBook";
import BorrowRequests from "../pages/dashboard/borrowRequest/BorrowRequests";
import AddBook from "../pages/dashboard/addBook/AddBook";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:bookId",
        loader: ({ params }) => params.bookId,
        element: <BookPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/dashboard",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/my-profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/my-books",
        element: <MyBook />,
      },
      {
        path: "/dashboard/borrow-requests",
        element: <BorrowRequests />,
      },
      {
        path: "/dashboard/add-book",
        element: <AddBook />,
      },
    ],
  },
]);
