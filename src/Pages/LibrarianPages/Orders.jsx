import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { MdCancel } from "react-icons/md";
import Swal from "sweetalert2";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const axiosSecure = useAxios();
  useEffect(() => {
    const getOrders = async () => {
      const res = await axiosSecure.get(`/orders?librarianEmail=${user.email}`);
      console.log(res.data);
      setOrders(res.data);
    };
    getOrders();
  }, [axiosSecure, user]);
  const handleDeleteOrder = async (id) => {
    const res = await axiosSecure.delete(`/orders/${id}`);

    if (res.data.deletedCount > 0) {
      const updateOrders = orders.filter((order) => order.bookId !== id);
      setOrders(updateOrders);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your work has been deleted",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      {orders.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr className="bg-blue-500/20">
                  <th className="hidden lg:table-cell">SI. No.</th>
                  <th>Book Title</th>
                  <th className="hidden md:table-cell">Customer Name</th>
                  <th className="hidden lg:table-cell">Customer Email</th>
                  <th>Total Cost</th>
                  <th className="hidden md:table-cell">Order Date</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <tr key={order._id}>
                    <td className="hidden lg:table-cell">0{i + 1}</td>
                    <td>{order.bookName}</td>
                    <td className="hidden md:table-cell">{order.name}</td>
                    <td className="hidden lg:table-cell">{order.email}</td>
                    <td>{order.totalCost}</td>
                    <td className="hidden md:table-cell">{order.orderedAt}</td>
                    <td>{order.paymentStatus}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteOrder(order.bookId)}
                        className="btn text-lg bg-red-600 text-white rounded-lg font-semibold flex items-center gap-2"
                      >
                        <MdCancel className="text-xl" />
                        <span className="hidden md:table-cell">Cancel</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h2  className="text-4xl text-red-600 font-semibold text-center mt-20">Your order list is empty.</h2>
      )}
    </div>
  );
};

export default Orders;
