import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaBookMedical } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";

const AddBook = () => {
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const apiKey = import.meta.env.VITE_img_host_key;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const handleAddBookBtn = async (data) => {
    data.librarianEmail = user.email;
    const img = data.bookImage[0];
    const formData = new FormData();
    formData.append("image", img);

    const uploadImage = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      { method: "POST", body: formData },
    );
    const imgData = await uploadImage.json();

    data.bookImage = imgData.data.url;
    data.stats = "Unpublish";

    axiosSecure.post("/books", data).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        toast.success("Book added into database.", { position: "top-center" });
        reset();
      } else {
        toast.success(res.data, { position: "top-center" });
      }
    });
  };
  return (
    <div>
      <h1 className="text-6xl text-center py-8 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
        Add Books to Your Collection
      </h1>
      <form
        onSubmit={handleSubmit(handleAddBookBtn)}
        className="mx-[4%] sm:mx-[20%]"
      >
        <fieldset className="fieldset border-[#33333382] rounded-box border mb-8 p-4">
          <legend className="fieldset-legend text-lg">
            Basic Book Information
          </legend>
          {/* Profile Image Upload */}
          <div className=" mb-6">
            <label className="relative cursor-pointer">
              <div className="w-100 mx-auto h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  //   <FaUserPlus className="text-4xl" />
                  <FaBookMedical className="text-4xl" />
                )}
              </div>
              {errors.bookImage?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">
                  Profile image is required
                </p>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("bookImage", {
                  required: true,
                  onChange: handleImageUpload,
                })}
              />
            </label>
          </div>
          {/* Book Title field */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Book Title
          </label>
          {errors.bookTitle?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">Book Title is required</p>
          )}
          <input
            {...register("bookTitle", { required: true })}
            type="text"
            className="input w-full"
            placeholder="Book Title"
          />
          {/* Author Name field */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Author Name
          </label>
          {errors.authorName?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">Author Name is required</p>
          )}
          <input
            {...register("authorName", { required: true })}
            type="text"
            className="input w-full"
            placeholder="Author Name"
          />

          {/* Book Category */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Book Category
          </label>

          <select {...register("bookCategory")} className="input w-full">
            <option value="">Select Book Category</option>

            <option value="Programming">Programming</option>
            <option value="Novel">Novel</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
          </select>

          {/* Book description */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Book description
          </label>
          {errors.pickupInstructionReceiver?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">
              Book description is required
            </p>
          )}
          <textarea
            rows={3}
            {...register("bookDescription", { required: true })}
            className="w-full border border-[#0000002c] rounded-lg p-2"
            placeholder="Book description . . ."
          ></textarea>
        </fieldset>

        <fieldset className="fieldset border-[#33333382] rounded-box border mb-8 p-4">
          <legend className="fieldset-legend text-lg">Book details</legend>
          {/* Language */}
          <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
            Language
          </label>

          <select {...register("language")} className="input w-full">
            <option value="">Select Language</option>

            <option value="English">English</option>
            <option value="Bangla">Bangla</option>
            <option value="German">German</option>
            <option value="Arabic">Arabic</option>
          </select>

          {/* Pages */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Pages
          </label>
          {errors.pages?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">Pages is required</p>
          )}
          <input
            {...register("pages", { required: true })}
            type="number"
            className="input w-full"
            placeholder="Pages"
          />

          {/* Book Format */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Book Format
          </label>

          <div className="space-y-2">
            <label className="font-medium">Select Book Format</label>

            <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Hardcover"
                  {...register("bookType")}
                />
                Hardcover
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="Paperback"
                  {...register("bookType")}
                />
                Paperback
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" value="PDF" {...register("bookType")} />
                PDF
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="eBook"
                  {...register("bookType")}
                />
                eBook
              </label>
            </div>
          </div>

          {/* Edition */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Edition
          </label>
          {errors.edition?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">Edition is required</p>
          )}
          <input
            {...register("edition", { required: true })}
            type="text"
            className="input w-full"
            placeholder="Edition"
          />
        </fieldset>

        <fieldset className="fieldset border-[#33333382] rounded-box border mb-8 p-4">
          <legend className="fieldset-legend text-lg">Page details</legend>

          {/* Publisher Name */}
          <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
            Publisher Name
          </label>
          {errors.publisher?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">
              Publisher Name is required
            </p>
          )}
          <input
            {...register("publisherName", { required: true })}
            type="text"
            className="input w-full"
            placeholder="Publisher Name"
          />
          {/* Published Year */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Published Year
          </label>
          {errors.publishedYear?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">
              Published Year is required
            </p>
          )}
          <input
            {...register("publishedYear", { required: true })}
            type="text"
            className="input w-full"
            placeholder="Published Year"
          />
          {/* ISBN Number */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            ISBN Number
          </label>
          {errors.isbnNo?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">ISBN Number is required</p>
          )}
          <input
            {...register("isbnNo", { required: true })}
            type="text"
            className="input w-full"
            placeholder="ISBN Number"
          />
        </fieldset>

        <fieldset className="fieldset border-[#33333382] rounded-box border mb-8 p-4">
          <legend className="fieldset-legend text-lg">Page details</legend>

          {/* Library Name */}
          <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
            Library Name
          </label>
          {errors.libraryName?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">
              Library Name is required
            </p>
          )}
          <input
            {...register("libraryName", { required: true })}
            type="text"
            className="input w-full"
            placeholder="Library Name"
          />

          {/* Available Copies */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Available Copies
          </label>
          {errors.availableCopies?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">
              Available Copies is required
            </p>
          )}
          <input
            {...register("copies", { required: true })}
            type="number"
            className="input w-full"
            placeholder="Available Copies"
          />
        </fieldset>

        <fieldset className="fieldset border-[#33333382] rounded-box border mb-8 p-4">
          <legend className="fieldset-legend text-lg">
            Publishing Information
          </legend>

          {/* Price */}
          <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
            Price
          </label>
          {errors.price?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">Price is required</p>
          )}
          <input
            {...register("price", { required: true })}
            type="number"
            className="input w-full"
            placeholder="Price"
          />

          {/* Delivery Charge */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Delivery Charge
          </label>
          {errors.deliveryCharge?.type === "required" && (
            <p className="text-red-600 text-sm mt-1">
              Delivery Charge is required
            </p>
          )}
          <input
            {...register("deliveryCharge", { required: true })}
            type="number"
            className="input w-full"
            placeholder="Delivery Charge"
          />

          {/* Book Status */}
          <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
            Book Status
          </label>

          <select {...register("bookStatus")} className="input w-full">
            <option value="">Select Book Status</option>

            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Coming Soon">Coming Soon</option>
          </select>
        </fieldset>
        <button className="btn btn-primary w-full" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
