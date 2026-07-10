import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashboardLayout from "../Layouts/DashboardLayout";
import AllBooks from "../Pages/AllBooks/AllBooks";
import MyOrder from "../Pages/UserPages/MyOrder/MyOrder";
import MyProfile from "../Pages/UserPages/MyProfile/MyProfile";
import Invoices from "../Pages/UserPages/Invoices/Invoices";
import AddBook from "../Pages/LibrarianPages/AddBook";
import MyBooks from "../Pages/LibrarianPages/MyBooks";
import Orders from "../Pages/LibrarianPages/Orders";
import AllUsers from "../Pages/AdminPages/AllUsers";
import ManageBooks from "../Pages/AdminPages/ManageBooks";
import AdminProfile from "../Pages/AdminPages/AdminProfile";
import PaymentSuccess from "../Pages/UserPages/MyOrder/PaymentSuccess";
import PaymentCancel from "../Pages/UserPages/MyOrder/PaymentCancel";
import BookDetails from "../Components/BookDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/books",
        Component: AllBooks,
      },
      {
        path: "/books/:_id",
        Component: BookDetails,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        Component: DashboardLayout,
      },
      //users links
      {
        path: "user/my-profile",
        Component: MyProfile,
      },
      {
        path: "user/my-order",
        Component: MyOrder,
      },
      {
        path: "user/invoice",
        Component: Invoices,
      },

      //Librarian Links
      {
        path: "librarian/add-book",
        Component: AddBook,
      },
      {
        path: "librarian/my-books",
        Component: MyBooks,
      },
      {
        path: "librarian/orders",
        Component: Orders,
      },
      //Admin links
      {
        path: "admin/all-users",
        Component: AllUsers,
      },
      {
        path: "admin/manage-books",
        Component: ManageBooks,
      },
      {
        path: "admin/my-profile",
        Component: AdminProfile,
      },
      {
        path: "payment_success",
        Component: PaymentSuccess,
      },
      {
        path: "payment_cancel",
        Component: PaymentCancel,
      },
    ],
  },
]);
