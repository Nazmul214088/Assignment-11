import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { Link } from "react-router";

const Invoices = () => {
  const [myPayments, setMyPayments] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxios();
  useEffect(() => {
    if (!user) return;
    const getMyPayment = async () => {
      const result = await axiosSecure.get(`/orders/${user.email}?status=paid`);
      setMyPayments(result.data);
    };
    getMyPayment();
  }, [axiosSecure, user]);
  return (
    <div>
      {myPayments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="bg-blue-500/20">
                <th>SI. No.</th>
                <th>Book Title</th>
                <th>Payment Id</th>
                <th>Amount</th>
                <th>Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {myPayments.map((payment, i) => (
                <tr key={payment._id} className={i % 2 === 1 ? "bg-blue-500/10" : ""}>
                  <td>{i + 1}</td>
                  <td>{payment.bookName}</td>
                  <td>{payment.transaction}</td>
                  <td>{payment.totalCost}</td>
                  <td>{payment.paymentDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" text-center h-[80vh] flex flex-col justify-center items-center">
          <h2 className="text-5xl font-bold py-4 text-red-600 ">
            No Payment Records Found
          </h2>
          <p className="text-xl font-semibold text-black/60 py-4 mb-6">
            Make a payment to start tracking your transactions.
          </p>
          <Link
            className="py-4 px-8 border border-black/40 rounded-xl text-xl text-blue-700 bg-blue-400/20 font-semibold"
            to={"/dashboard/user/my-order"}
          >
            Payment Your Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default Invoices;
