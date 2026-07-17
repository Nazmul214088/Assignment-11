import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import useTheme from "../Hooks/useTheme";
import { HiMenu } from "react-icons/hi";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const { theme, themeToggle } = useTheme();

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/books"}>Books</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/dashboard"}>Dashboard</NavLink>
        </li>
      )}
    </>
  );

  const handleLogoutBtn = () => {
    logOut()
      .then(() => {
        toast.success("Sign Out Successfully", { position: "top-center" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //theme toggle system theme
  return (
    <div className="navbar bg-base-100 shadow-sm dark:bg-[#2f3542] dark:text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <HiMenu className="text-2xl" />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm z-999 dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost text-xl">
          <img className="h-15" src={logo} />
          <span>BookCourier</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <ul className="flex gap-4">
          {!user ? (
            <>
              <li>
                <NavLink to={"/register"}>Register</NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="h-10">
                <img
                  className="h-12 w-12 rounded-full object-cover bg-center"
                  src={user.photoURL}
                />
              </li>
              <li>
                <button onClick={handleLogoutBtn} className="btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        <button className="btn mx-2 dark:bg-[#747d8c] " onClick={themeToggle}>
          {theme === "dark" ? (
            <MdDarkMode className="text-white" />
          ) : (
            <CiLight className="text-2xl text-[#ffa600] font-black" />
          )}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
