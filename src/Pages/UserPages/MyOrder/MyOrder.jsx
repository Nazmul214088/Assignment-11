import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  useEffect(() => {
    if (!user) return;
    const getOrders = async () => {
      const res = await axiosSecure.get(`/orders/${user.email}`);
      setMyOrders(res.data);
    };
    getOrders();
  }, [user, axiosSecure]);
  const handleCancelOrder = async (id) => {
    const result = await axiosSecure.patch(`/orders/${id}`);
    if (result.data.matchedCount > 0) {
      const updateOrders = myOrders.map((order) =>
        order._id === id ? { ...order, status: "cancelled" } : order,
      );
      setMyOrders(updateOrders);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your order has been deleted.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handlePaymentBtn = async (id) => {
    const paymentOrder = myOrders.find((order) => order._id === id);
    const paymentInfo = {
      totalCost: paymentOrder.totalCost,
      bookName: paymentOrder.bookName,
      bookId: id,
    };
    const result = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo,
    );

    window.location.assign(result.data.url);
  };
  return (
    <div>
      {myOrders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="bg-blue-500/20">
                <th>SI. No.</th>
                <th>Book Title</th>
                <th>Cost</th>
                <th>Order Date</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((book, index) => (
                <tr
                  key={book._id}
                  className={index % 2 === 1 ? "bg-blue-500/10" : ""}
                >
                  <td>{index + 1}</td>
                  <td>{book.bookName}</td>
                  <td>{book.totalCost}</td>
                  <td>{book.orderedAt}</td>
                  <td
                    className={
                      book.status === "cancelled"
                        ? "text-red-600 font-semibold"
                        : ""
                      
                    }
                  >
                    {book.status}
                  </td>
                  <td>
                    {book.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleCancelOrder(book._id)}
                          className="py-2 px-6 text-white font-semibold tabs-xl bg-red-600 border border-black/20 rounded-xl cursor-pointer mr-4"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handlePaymentBtn(book._id)}
                          className="py-2 px-6 text-white font-semibold tabs-xl bg-green-600 border border-black/20 rounded-xl cursor-pointer"
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                    {book.status === "paid" && (
                      <p className="text-xl font-semibold text-green-600">
                        Completed
                      </p>
                    )}
                    {book.status === "cancelled" && (
                      <p className="text-xl font-semibold text-red-600">
                        Cancelled
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" text-center h-[80vh] flex flex-col justify-center items-center">
          <h2 className="text-5xl font-bold py-4 text-red-600 ">
            You haven't placed any orders yet.
          </h2>
          <p className="text-xl font-semibold text-black/60 py-4 mb-6">
            Browse our collection and order your favorite books.
          </p>
          <Link
            className="py-4 px-8 border border-black/40 rounded-xl text-xl text-blue-700 bg-blue-400/20 font-semibold"
            to={"/books"}
          >
            Books
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
