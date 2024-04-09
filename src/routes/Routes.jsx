import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import PageNotFound from "../components/PageNotFound";
import Home from "../pages/home/Home";
import Login from "../pages/login/login/Login";
import Register from "../pages/login/register/Register";
import Books from "../pages/books/Books";
import BookPage from "../pages/books/BookPage";
import MyProfile from "../pages/dashboard/profile/MyProfile";

import BorrowRequests from "../pages/dashboard/borrowRequest/BorrowRequests";
import AddBook from "../pages/dashboard/addBook/AddBook";
import BookRequests from "../pages/dashboard/bookRequest/BookRequest";
import BooksAdmin from "../pages/dashboard/book/BooksAdmin";
import EditBook from "../pages/dashboard/book/EditBook";
import LibrarianRoute from "./LibrarianRotue";
import UserPrivateRoute from "./UserPrivateRoute";
import PrivateRoute from "./PrivateRoute";
import MyBorrowings from "../pages/dashboard/myBorrowings/MyBorrowings";

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
      {
        path: "/request-book",
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
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />,
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-borrowings",
        element: (
          <PrivateRoute>
            <UserPrivateRoute>
              <MyBorrowings />
            </UserPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/borrow-requests",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <BorrowRequests />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/books",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <BooksAdmin />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/edit-book/:bookId",
        loader: ({ params }) => params.bookId,
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <EditBook />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-book",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <AddBook />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/Book-requests",
        element: (
          <PrivateRoute>
            <LibrarianRoute>
              <BookRequests />
            </LibrarianRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

// building +_+
