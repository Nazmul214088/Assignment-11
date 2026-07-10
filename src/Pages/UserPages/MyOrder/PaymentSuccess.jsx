import { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxios();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    if (!sessionId) return;
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data.matchedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your payment success.",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-center",
            icon: "warning",
            title: "Your payment has been failed.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }, [axiosSecure, sessionId]);
  return <div>PaymentSuccess</div>;
};

export default PaymentSuccess;
