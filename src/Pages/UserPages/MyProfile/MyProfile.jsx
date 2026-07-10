import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import {
  FaAngleDown,
  FaAngleUp,
  FaEye,
  FaEyeSlash,
  FaTrashAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import useAxios from "../../../Hooks/useAxios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [languageArrow, setLanguageArrow] = useState(true);
  const [currentUserData, setCurrentUserData] = useState({});
  const [password, setPassword] = useState(true);
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const auth = getAuth();
  const axiosSecure = useAxios();
  const apiKey = import.meta.env.VITE_img_host_key;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!user?.email) return;
    const getUser = async () => {
      try {
        const { data } = await axiosSecure.get(`/users/${user.email}`);
        setCurrentUserData(data);
        setImage(data.photoURL);
      } catch (error) {
        console.log(error?.message);
        toast.error("No user is found!");
      }
    };
    getUser();
  }, [user?.email, axiosSecure]);
  useEffect(() => {
    if (currentUserData) {
      const name = currentUserData.displayName?.split(" ") || [];

      reset({
        firstName: name[0] || "",
        lastName: name[1] || "",
        email: currentUserData.email || "",
        username: currentUserData.phone || "",
        language: currentUserData.language || "",
        gender: currentUserData.gender || "",
        dateOfBirth: currentUserData.dateOfBirth || "",
        updateTime: new Date().toLocaleDateString(),
      });
    }
  }, [currentUserData, reset]);

  const handleImageUpload = (e) => {
    const file = e.target?.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handleProfileUpdate = async (data) => {
    try {
      const updateDoc = {};
      let isUpdate = false;
      const img = data.userPhoto?.[0];

      if (img) {
        const formData = new FormData();
        formData.append("image", img);

        const uploadImage = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          { method: "POST", body: formData },
        );
        const imgData = await uploadImage.json();
        data.photoURL = imgData.data.url;
      } else {
        data.photoURL = currentUserData.photoURL; // keep existing
      }
      console.log(data);
      // Update Display Name and photoUrl
      const displayName = `${data.firstName} ${data.lastName}`;
      if (
        displayName !== currentUserData.displayName ||
        data.photoURL !== currentUserData.photoURL
      ) {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: data.photoURL,
        });
        updateDoc.displayName = displayName;
        updateDoc.photoURL = data.photoURL;
        isUpdate = true;
      }

      //Update email
      if (data.email !== currentUserData.email) {
        await updateEmail(auth.currentUser, data.email);
        updateDoc.email = data.email;
        isUpdate = true;
      }
      //Change password
      if (
        data.newPassword.length >= 6 &&
        currentUserData.password === data.currentPassword
      ) {
        await updatePassword(auth.currentUser, data.newPassword);
        updateDoc.password = data.newPassword;
        isUpdate = true;
      }
      updateDoc.gender = data.gender;
      updateDoc.username = data.username;
      updateDoc.dateOfBirth = data.dateOfBirth;
      updateDoc.language = data.language;
      updateDoc.updateAt = data.updateTime;

      await axiosSecure.patch(`/users/${currentUserData.email}`, updateDoc);
      if (isUpdate) {
        toast.success("Profile updated Successfully");
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className=" max-w-180 mx-auto">
      <h2 className="text-6xl py-4 font-semibold">Account Settings</h2>
      <p className="text-xl text-black/60 py-2">
        Manage your preferences, security, and connected tools <br />
        all in one place.
      </p>
      <form onSubmit={handleSubmit(handleProfileUpdate)}>
        <div className="flex md:flex-row flex-col items-center gap-x-6">
          {/* Profile Image Upload */}
          <div className=" mb-6">
            <label className="relative cursor-pointer">
              <div className="w-50 h-50 rounded-full flex justify-center items-center bg-gray-200 overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <MdAddAPhoto className="text-4xl" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("userPhoto", {
                  onChange: handleImageUpload,
                })}
              />
            </label>
          </div>
          <button
            type="button"
            className="text-xl px-8 py-4 border border-black/30 flex gap-4 rounded-2xl bg-red-600 text-white items-center "
            onClick={() => setImage(null)}
          >
            <span>Remove Photo </span>
            <FaTrashAlt />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* First Name */}
          <div>
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              First Name
            </label>
            <input
              {...register("firstName", { required: true })}
              type="text"
              className="input w-full"
              placeholder="First Name"
            />
            {errors.firstName?.type === "required" && (
              <p className="text-red-600 text-sm mt-1">
                First Name is required
              </p>
            )}
          </div>
          {/* Last Name */}
          <div>
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              Last Name
            </label>
            <input
              {...register("lastName", { required: true })}
              type="text"
              className="input w-full"
              placeholder="Last Name"
            />
            {errors.lastName?.type === "required" && (
              <p className="text-red-600 text-sm mt-1">Last Name is required</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Email */}
          <div>
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input w-full"
              placeholder="Your Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600 text-sm mt-1">Email is required</p>
            )}
          </div>
          {/* user Name */}
          <div>
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              Username
            </label>

            <input
              {...register("username", { required: true })}
              type="text"
              className="input w-full"
              placeholder="User Name"
            />

            {errors.username?.type === "required" && (
              <p className="text-red-600 text-sm mt-1">Username is required</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Current Password */}
          <div className="relative">
            <button
              type="button"
              className=" absolute cursor-pointer right-4 top-10.5 z-99"
              onClick={() => setPassword(!password)}
            >
              {password ? <FaEyeSlash /> : <FaEye />}
            </button>
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              Current Password
            </label>
            <input
              {...register("currentPassword", { required: true })}
              type={password ? "password" : "text"}
              className="input w-full"
              placeholder="Current Password"
            />

            {errors.currentPassword?.type === "required" && (
              <p className="text-red-600 text-sm mt-1">
                Current password is required
              </p>
            )}
          </div>
          {/* New Password */}
          <div className="relative">
            <button
              type="button"
              className=" absolute cursor-pointer right-4 top-10.5 z-99"
              onClick={() => setPassword(!password)}
            >
              {password ? <FaEyeSlash /> : <FaEye />}
            </button>
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              New Password
            </label>

            <input
              {...register("newPassword", { required: true })}
              type={password ? "password" : "text"}
              className="input w-full"
              placeholder="New Password"
            />
            {errors.newPassword?.type === "required" && (
              <p className="text-red-600 text-sm mt-1">
                New password is required
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Date of Birth */}
          <div>
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              Date of Birth
            </label>
            <input
              {...register("dateOfBirth", { required: true })}
              type="date"
              className="input w-full"
              placeholder="Date of Birth"
            />
            {errors.dateOfBirth?.type === "required" && (
              <p className="text-red-600 text-sm mt-1">
                Date of Birth is required
              </p>
            )}
          </div>
          {/* Gender */}
          <div className="relative">
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              Gender
            </label>

            <select {...register("gender")} className="input w-full">
              <option value="">Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Language */}
          <div className=" relative">
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              Language
            </label>

            {languageArrow ? (
              <FaAngleDown className=" absolute  z-999 text-2xl right-2 top-9" />
            ) : (
              <FaAngleUp className=" absolute z-999 text-2xl right-2 top-9" />
            )}
            <select
              onClick={() => setLanguageArrow(!languageArrow)}
              {...register("language")}
              className="input w-full"
            >
              <option value="">Select Your Language</option>
              {languages.map((lan) => (
                <option key={lan.value} value={lan.value}>
                  {lan.label}
                </option>
              ))}
            </select>
          </div>
          {/* Update Time */}
          <div>
            <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
              Update Time
            </label>
            <input
              {...register("updateTime")}
              type=""
              className="input w-full"
              placeholder="Update time"
              readOnly
            />
          </div>
        </div>
        <button className="btn btn-primary w-full text-center text-xl mt-8">
          Update
        </button>
      </form>
    </div>
  );
};

export default MyProfile;

const languages = [
  { value: "English", label: "English" },
  { value: "Bangla", label: "Bangla" },
  { value: "Hindi", label: "Hindi" },
  { value: "Arabic", label: "Arabic" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Chinese", label: "Chinese" },
  { value: "Japanese", label: "Japanese" },
  { value: "Korean", label: "Korean" },
];
