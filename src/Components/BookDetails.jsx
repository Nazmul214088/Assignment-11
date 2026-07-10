import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import useAuth from "../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import RelatedBooks from "../Pages/Home/RelatedBooks";
const BookDetails = () => {
  const [book, setBook] = useState();

  const { _id } = useParams();
  const { user } = useAuth();
  const orderBtnModalRef = useRef();
  const axiosSecure = useAxios();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      name: user?.displayName,
      email: user?.email,
    });
  }, [user, reset]);
  useEffect(() => {
    const getBook = async () => {
      const res = await axiosSecure.get(`/books/${_id}`);
      setBook(res.data);
    };
    getBook();
  }, [axiosSecure, _id]);
  const showModalBtn = () => {
    orderBtnModalRef.current.showModal();
  };
  console.log(book);

  const handlePlaceOrder = async (data) => {
    data.bookName = book.bookTitle;
    data.librarianEmail = book.libraryEmail;
    data.bookId = book._id;
    data.totalCost = Number(book.price) + Number(book.deliveryCharge);
    axiosSecure.post("/orders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "This book order has been done!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        orderBtnModalRef.current.close();
      } else {
        Swal.fire({
          position: "top-center",
          icon: "warning",
          title: `${res.data}`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        orderBtnModalRef.current.close();
      }
    });
  };
  if (!book) {
    return (
      <p className="flex justify-center items-center h-screen">Loading . . .</p>
    );
  }
  console.log(book.bookCategory);

  return (
    <div className=" border border-[#3333] rounded-xl shadow-lg my-8 py-6 w-[96%] mx-auto px-[6%]">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <figure className=" basis-2/5 rounded-xl ">
          <img className="rounded-xl w-full h-full" src={book?.bookImage} />
        </figure>
        <div>
          <div>
            <h2 className="text-4xl font-bold bg-linear-to-r from-[#00188e] to-[#900101] bg-clip-text text-transparent py-2">
              Title: {book?.bookTitle}
            </h2>
            <p className="text-xl font-semibold">Author: {book?.authorName}</p>
            <h3 className="text-xl py-2 font-semibold">
              Library Name: {book?.libraryName}
            </h3>

            <p className="text-xl font-semibold">Edition: {book?.edition}</p>
            <div className="flex justify-between py-4">
              <p className="text-lg">Language: {book?.language}</p>

              <p className="text-xl">
                Rating: <span className="font-bold ">4.6</span>
              </p>
            </div>
          </div>
          <div className="flex justify-between py-2 border-y my-2 border-[#3333]">
            <div>
              <p className="text-xl font-bold">Category: {book?.category}</p>
              <p className="text-xl font-semibold">
                Available Copies: {book?.availableCopies}
              </p>
            </div>
            <div>
              <div className="text-xl flex justify-between">
                <p>Price: </p>
                <p className="font-bold">{book?.price}</p>
              </div>
              <p className="text-xl flex gap-6">
                <span>Delivery Charge:</span>
                <span className="font-bold"> {book?.deliveryCharge}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => showModalBtn(book)}
              className="btn btn-primary hover:from-[#902001] hover:to-[#001269] transition duration-500"
            >
              Order Now
            </button>
            <p className="text-xl flex gap-4">
              <span>total Cost:</span>
              <span className="font-semibold">
                {Number(book?.price) + Number(book?.deliveryCharge)}
              </span>
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-semibold mt-8">Description:</h2>
      <p className="text-justify mb-8">{book?.bookDescription}</p>
      <h2 className="text-3xl font-semibold">Customer Reviews:</h2>
      <RelatedBooks bookCategory={book.bookCategory} />

      <p className="text-center text-[#33333375] pt-4">
        Added Date: {new Date(book.createAt).toLocaleDateString()},
        {new Date(book?.createAt).toLocaleTimeString()}
      </p>

      {/* modal */}
      <dialog
        ref={orderBtnModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form onSubmit={handleSubmit(handlePlaceOrder)}>
            {/* Name field */}
            <div className="flex items-center gap-2 my-4">
              <label className="label text-[#0F172A] font-medium">Name:</label>

              <input
                {...register("name", { required: true })}
                type="text"
                readOnly={true}
                className="input w-full"
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2 my-4">
              <label className="label text-[#0F172A] font-medium">Email:</label>

              <input
                {...register("email", { required: true })}
                type="email"
                className="input w-full"
                readOnly={true}
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2 my-4">
              <label className="py-1 text-[#0F172A] font-medium">Phone:</label>

              <input
                {...register("phone", { required: true })}
                type="number"
                className="input w-full"
                placeholder="Phone"
              />

              {errors.phone?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">Phone is required</p>
              )}
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 my-4">
              <label className="py-1 text-[#0F172A] font-medium">
                Address:
              </label>

              <input
                {...register("address", { required: true })}
                type="text"
                className="input w-full"
                placeholder="Address"
              />

              {errors.address?.type === "required" && (
                <p className="text-red-600 text-sm mt-1">Address is required</p>
              )}
            </div>

            {/* Confirm Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Confirm Order
            </button>
          </form>

          {/* Close button */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BookDetails;
