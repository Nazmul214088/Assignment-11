import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import loginImg from "../../assets/login.png";
import { useForm } from "react-hook-form";
import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbUserUp } from "react-icons/tb";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const [eye, setEye] = useState(false);
  const [image, setImage] = useState(null);
  const { createUser, updateUserProfile, signInWithGoogle } = use(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxios();

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRegister = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        const img = data.profileImage[0];
        const formData = new FormData();
        formData.append("image", img);

        axiosSecure
          .post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`,
            formData,
          )
          .then((result) => {
            const photoURL = result.data.data.display_url;
            //create database for users data
            const userInfo = {
              email: data.email,
              displayName: data.name,
              password: data.password,
              photoURL,
            };
            axiosSecure.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Registration has been completed.",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });

            const profileData = {
              displayName: data.name,
              photoURL,
            };
            updateUserProfile(profileData)
              .then(() => {
                console.log("Profile update is successfully done.");
              })
              .catch((err) => {
                console.log(err);
              });
          });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
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
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* Profile Image Upload */}
              <div className=" mb-6">
                <label className="relative cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {image ? (
                      <img
                        src={image}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      //   <FaUserPlus className="text-4xl" />
                      <TbUserUp className="text-4xl" />
                    )}
                  </div>
                  {errors.profileImage?.type === "required" && (
                    <p className="text-red-600 text-sm mt-1">
                      Profile image is required
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("profileImage", {
                      required: true,
                      onChange: handleImageUpload,
                    })}
                  />
                </label>
              </div>
              {/* Name field */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input w-full"
                placeholder="Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">Name is required</p>
              )}
              {/* Email field */}
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
              {/* Password Field */}
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={`${eye ? "text" : "password"}`}
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  })}
                  className="input w-full"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">
                    Password has been minimum 6 characters.
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must include uppercase, lowercase, number, and
                    special character.
                  </p>
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
                Register
              </button>
            </fieldset>
          </form>
          <div className="flex gap-2">
            <span>Already have an account?</span>
            <Link to={"/login"}>Login</Link>
          </div>
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5]"
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

export default Register;
