import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import { IoStarSharp } from "react-icons/io5";

import bookBg from "../../../assets/bookBg.jpg";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { data: myWishlist = [] } = useQuery({
    queryKey: ["myWishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?userEmail=${user?.email}`);
      return res.data;
    },
  });

  const handleDeleteBtn = async (bookId) => {
    const res = await axiosSecure.delete(`/wishlist/${bookId}`);
    if (res.data.deletedCount) {
      Swal.fire({
        icon: "success",
        title: "Removed from wishlist successfully.",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries({
        queryKey: ["myWishlist", user?.email],
      });
    }
  };

  return (
    <div className=" grid gap-8 xl:grid-cols-2">
      {myWishlist.length > 0 ? (
        myWishlist.map((wish) => (
          <div key={wish._id} className="border border-black/10 rounded-xl">
            <figure className=" relative border fig border-[#3333] rounded-xl ">
              <div
                className="absolute h-full rounded-xl w-full  bg-cover bg-center -z-10"
                style={{
                  backgroundImage: `url(${bookBg})`,
                  filter: "blur(5px)",
                }}
              ></div>
              <img className="h-80 w-auto mx-auto z-99" src={wish.bookImage} />
            </figure>
            <div className="px-8 pb-8">
              <div className="">
                <div className="flex justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl py-1 pt-8 font-bold">
                      {wish.bookTitle}
                    </h2>
                    <p className=" italic font-semibold text-xl text-black/80">
                      {wish.bookAuthor}
                    </p>
                  </div>
                  <div className="flex gap-1 items-center text-2xl py-2 font-semibold">
                    <IoStarSharp className="text-yellow-600" />
                    <p>
                      {isNaN(wish.averageRating) ? "0.00" : wish.averageRating}
                    </p>
                    <p>
                      ({wish.totalReviews}{" "}
                      {wish.totalReviews <= 1 ? "Review" : "Reviews"})
                    </p>
                  </div>
                </div>
                <div className="flex justify-between border-y border-black/20 py-4 mb-6">
                  <p className="text-xl font-semibold">{wish.bookCategory}</p>
                  <p className="text-2xl font-bold">
                    {" "}
                    <span className="font-black">৳</span> {wish.price}
                  </p>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleDeleteBtn(wish.bookId)}
                    className="border border-black/20 py-2 px-8 rounded-md cursor-pointer bg-red-600 text-white font-semibold text-xl"
                  >
                    Remove
                  </button>
                  <Link
                    to={`/books/${wish.bookId}`}
                    className="border border-black/20 py-2 px-8 rounded-md cursor-pointer bg-green-500 text-white font-semibold text-xl"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h2></h2>
      )}
    </div>
  );
};

export default MyWishlist;
