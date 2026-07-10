import { toast } from "react-toastify";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const EditBookModal = ({ ref, book, confirmBtn, cancelBtn }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleEditBtn = (data) => {
    axiosSecure.patch(`/books/${book._id}`, data).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Book updated.", { position: "top-center" });
      }
    });
    reset();
    window.location.reload();
    confirmBtn();
  };
  return (
    <dialog ref={ref} className="modal">
      {book && (
        <div className="modal-box">
          <form method="dialog w-full">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(handleEditBtn)}>
            <fieldset className="fieldset border-[#33333382] rounded-box border mb-8 p-4">
              <legend className="fieldset-legend text-lg">
                Basic Book Information
              </legend>

              {/* Book Title field */}
              <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
                Book Title
              </label>
              {errors.bookTitle?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">
                  Book Title is required
                </p>
              )}
              <input
                {...register("bookTitle", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Book Title"
                defaultValue={book.bookTitle}
              />
              {/* Author Name field */}
              <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
                Author Name
              </label>
              {errors.authorName?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">
                  Author Name is required
                </p>
              )}
              <input
                {...register("authorName", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Author Name"
                defaultValue={book.authorName}
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
                defaultValue={book.bookDescription}
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
                defaultValue={book.pages}
              />

              {/* Book Format */}
              <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
                Book Format
              </label>

              <div className="space-y-2">
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
                    <input
                      type="checkbox"
                      value="PDF"
                      {...register("bookType")}
                    />
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
                defaultValue={book.edition}
              />
            </fieldset>

            <fieldset className="fieldset border-[#33333382] rounded-box border mb-8 p-4">
              <legend className="fieldset-legend text-lg">Page details</legend>

              {/* Publisher */}
              <label className="label py-1 text-[#0F172A] text-[14px] font-medium">
                Publisher
              </label>
              {errors.publisherName?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">
                  Publisher is required
                </p>
              )}
              <input
                {...register("publisherName", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Publisher"
                defaultValue={book?.publisherName}
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
                defaultValue={book.publishedYear}
              />
              {/* ISBN Number */}
              <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
                ISBN Number
              </label>
              {errors.isbnNo?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">
                  ISBN Number is required
                </p>
              )}
              <input
                {...register("isbnNo", { required: true })}
                type="text"
                className="input w-full"
                placeholder="ISBN Number"
                defaultValue={book.isbnNo}
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
                defaultValue={book.libraryName}
              />

              {/* Available Copies */}
              <label className="label py-1 mt-4 text-[#0F172A] text-[14px] font-medium">
                Available Copies
              </label>
              {errors.copies?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">
                  Available Copies is required
                </p>
              )}
              <input
                {...register("copies", { required: true })}
                type="number"
                className="input w-full"
                placeholder="Available Copies"
                defaultValue={book?.copies}
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
                defaultValue={book.price}
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
                defaultValue={book?.deliveryCharge}
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
            <div className=" flex justify-between">
              <button
                className="btn bg-red-600 px-6 text-white text-xl font-semibold"
                onClick={cancelBtn}
              >
                Cancel
              </button>
              <button
                // onClick={confirmBtn}
                type="submit"
                className="btn bg-green-600 px-6 text-white text-xl font-semibold"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      )}
    </dialog>
  );
};

export default EditBookModal;
