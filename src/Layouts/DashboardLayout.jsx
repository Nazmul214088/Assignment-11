import { CgProfile } from "react-icons/cg";
import {
  FaBookMedical,
  FaFileInvoiceDollar,
  FaHome,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { MdLibraryBooks } from "react-icons/md";
import { TbBooks, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import useRole from "../Hooks/useRole";
import { HiOutlineHeart } from "react-icons/hi";

const DashboardLayout = () => {
  const role = useRole();

  const userLinks = (
    <>
      <li>
        <NavLink
          to={"/dashboard/user/my-profile"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Profile"
        >
          <FaUser />
          <span className="is-drawer-close:hidden">My Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/user/my-order"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Order"
        >
          <FaBagShopping />
          <span className="is-drawer-close:hidden">My Order</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/user/invoice"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Invoice"
        >
          <FaFileInvoiceDollar />
          <span className="is-drawer-close:hidden">Invoice</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/user/my-wishlist"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Wishlist"
        >
          <HiOutlineHeart />
          <span className="is-drawer-close:hidden">My Wishlist</span>
        </NavLink>
      </li>
    </>
  );
  const librarianLinks = (
    <>
      <li>
        <NavLink
          to={"/dashboard/librarian/add-book"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Add Book"
        >
          <FaBookMedical />
          <span className="is-drawer-close:hidden">Add Book</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/librarian/my-books"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Books"
        >
          <MdLibraryBooks />
          <span className="is-drawer-close:hidden">My Books</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/librarian/orders"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Orders"
        >
          <FaBagShopping />
          <span className="is-drawer-close:hidden">Orders</span>
        </NavLink>
      </li>
    </>
  );
  const adminLinks = (
    <>
      <li>
        <NavLink
          to={"/dashboard/admin/all-users"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="All Users"
        >
          <FaUsers />
          <span className="is-drawer-close:hidden">All Users</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/admin/manage-books"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Manage Books"
        >
          <TbBooks />
          <span className="is-drawer-close:hidden">Manage Books</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard/admin/my-profile"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Profile"
        >
          <CgProfile />
          <span className="is-drawer-close:hidden">My Profile</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <TbLayoutSidebarLeftExpand className="text-2xl" />
          </label>
          <Link className="py-4" to={"/"} className="btn btn-ghost text-xl">
            <img className="h-15" src={logo} />
            <span>BookCourier</span>
          </Link>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to={"/"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <FaHome />
                <span className="is-drawer-close:hidden">Home page</span>
              </NavLink>
            </li>
            {role === "Librarian" && librarianLinks}
            {role === "User" && userLinks}
            {role === "Admin" && adminLinks}
            <li>
              <NavLink
                to={"/dashboard/setting"}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <FiSettings />
                <span className="is-drawer-close:hidden">Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
