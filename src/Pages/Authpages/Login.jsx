import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import loginImg from "../../assets/login.png";
import { useForm } from "react-hook-form";
import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";

const Login = () => {
  const [eye, setEye] = useState(false);
  const { signInUser, signInWithGoogle } = use(AuthContext);
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${user.displayName} has been login.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: "User",
          creteAt: new Date(),
        };
        navigate("/");
        axiosSecure.post("/users", userData).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "User is logged",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "User is logged",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEyeBtn = (e) => {
    e.preventDefault();
    setEye(!eye);
  };
  return (
    <div className=" mt-15 lg:flex justify-center w-[80%] mx-auto mb-10">
      <div className="card bg-base-100 w-3/4 mx-auto shrink-0 shadow-2xl basis-1/2">
        <div className="card-body">
          <h1 className="text-4xl font-extrabold py-1">Welcome Back</h1>
          <p className="mb-5">login with BookCourier</p>
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600">Email is required.</p>
              )}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={`${eye ? "text" : "password"}`}
                  {...register("password", { required: true })}
                  className="input w-full"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                <button
                  onClick={handleEyeBtn}
                  className=" absolute right-3 top-3 text-lg"
                >
                  {eye ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </fieldset>
          </form>

          <div className="flex gap-2">
            <span>Don't have any account? </span>
            <Link to={"/register"}>Register</Link>
          </div>
          {/* Google */}
          <button
            className="btn bg-white text-black border-[#e5e5e5]"
            onClick={handleGoogleLogin}
          >
            <FcGoogle />
            Login with Google
          </button>
        </div>
      </div>
      <figure className=" hidden lg:block basis-1/2">
        <img className="w-full" src={loginImg} alt="" />
      </figure>
    </div>
  );
};

export default Login;
