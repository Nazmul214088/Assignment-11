import { TbBooks } from "react-icons/tb";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { FaSmileBeam, FaUniversity } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

const TestimonialsAndStatistics = () => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalDeliveries, setTotalDeliveries] = useState(0);
  const [totalLibraries, setTotalLibraries] = useState(0);
  const [percentageOfBestReviews, setPercentageOfBestReviews] = useState(0);
  const axiosSecure = useAxios();
  useEffect(() => {
    const happyReader = async () => {
      const res = await axiosSecure.get("/reviews");
      setTotalReviews(res.data.length);
      const bestReviews =
        res.data &&
        res.data.reduce((sum, review) => {
          if (review.rating >= 4) {
            sum++;
          }
          return sum;
        }, 0);

      setPercentageOfBestReviews((bestReviews / res.data.length) * 100);
    };
    happyReader();
    const getTotalLibraries = async () => {
      const res = await axiosSecure.get("/users?role=librarian");
      setTotalLibraries(res.data.totalLibraries);
    };
    getTotalLibraries();
    const getTotalDeliveries = async () => {
      const res = await axiosSecure.get("/users?status=delivered");
      setTotalDeliveries(res.data.total);
    };
    getTotalDeliveries();
  }, [axiosSecure]);

  return (
    <div className="mt-10 px-[2%]">
      <h1 className="text-6xl text-center py-8 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
        Testimonials & Statistics
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="border border-black/10 rounded-md p-6 text-center shadow-[0_0_20px_#0b2c3bb2] hover:shadow-[0_15px_20px_#0061b1] transition duration-200 hover:-translate-y-2">
          <p className="flex justify-center">
            <TbBooks className="text-4xl h-20 w-20 text-[#0061b1] bg-[#0072cf3d] p-4 rounded-lg" />
          </p>
          <h2 className="text-3xl md:text-5xl font-bold py-2 mt-2">
            {totalReviews || 0}+
          </h2>
          <p className="text-xl text-black/60 font-semibold">Books AvailAble</p>
        </div>
        <div className="border border-black/10 rounded-md p-6 text-center shadow-[0_0_20px_#0b2c3bb2] hover:shadow-[0_15px_20px_#0061b1] transition duration-200 hover:-translate-y-2">
          <p className="flex justify-center">
            <FaUniversity className="text-4xl h-20 w-20 text-[#0061b1] bg-[#0072cf3d] p-4 rounded-lg" />
          </p>
          <h2 className="text-3xl md:text-5xl font-bold py-2 mt-2">
            {totalLibraries || 0}+
          </h2>
          <p className="text-xl text-black/60 font-semibold">Libraries</p>
        </div>
        <div className="border border-black/10 rounded-md p-6 text-center shadow-[0_0_20px_#0b2c3bb2] hover:shadow-[0_15px_20px_#0061b1] transition duration-200 hover:-translate-y-2">
          <p className="flex justify-center">
            <FaTruckFast className="text-4xl h-20 w-20 text-[#0061b1] bg-[#0072cf3d] p-4 rounded-lg" />
          </p>
          <h2 className="text-3xl md:text-5xl font-bold py-2 mt-2">
            {totalDeliveries || 0}
          </h2>
          <p className="text-xl text-black/60 font-semibold">Deliveries</p>
        </div>
        <div className="border border-black/10 rounded-md p-6 text-center shadow-[0_0_20px_#0b2c3bb2] hover:shadow-[0_15px_20px_#0061b1] transition duration-200 hover:-translate-y-2">
          <p className="flex justify-center">
            <FaSmileBeam className="text-4xl h-20 w-20 text-[#0061b1] bg-[#0072cf3d] p-4 rounded-lg" />
          </p>
          <h2 className="text-3xl md:text-5xl font-bold py-2 mt-2">
            {percentageOfBestReviews.toFixed(2) || 0}%
          </h2>
          <p className="text-xl text-black/60 font-semibold">Happy Readers</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsAndStatistics;
