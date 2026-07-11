import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import useAxios from "../Hooks/useAxios";
import Swal from "sweetalert2";
import Stars from "./Stars";
import ProgressBar from "./ProgressBar";

const CustomerReview = ({ bookId }) => {
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [selectStars, setSelectStars] = useState(0);
  const axiosSecure = useAxios();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    const getReviews = async () => {
      const res = await axiosSecure.get(`/reviews?bookId=${bookId}`);
      setReviews(res.data);
    };
    getReviews();
  }, [axiosSecure, bookId]);
  const handleSubmitCustomerReview = (data) => {
    data.rating = selectStars;
    data.bookId = bookId;
    data.reviewAt = new Date();
    axiosSecure.post("/reviews", data).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        reset();
        setSelectStars(0);
        setReviews([...reviews, data]);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Thank you! Your review has been submitted successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.map((review) => {
    if (review.rating === 5) {
      ratingCounts[0] += 1;
    } else if (review.rating === 4) {
      ratingCounts[1] += 1;
    } else if (review.rating === 3) {
      ratingCounts[2] += 1;
    } else if (review.rating === 2) {
      ratingCounts[3] += 1;
    } else {
      ratingCounts[4] += 1;
    }
  });
  const ratingPercentages = ratingCounts.map(
    (count) => (count / reviews.length) * 100,
  );
  const ratings = () => {
    let totalReviews = 0;
    if (reviews.length > 0) {
      totalReviews = reviews.reduce(
        (total, review) => total + Number(review.rating),
        0,
      );
    }
    return (totalReviews / reviews.length).toFixed(2);
  };
  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now - past) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
    ];
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 0 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold py-4">Customer Reviews</h2>
      <div className="grid lg:grid-cols-3 py-4 gap-8 mb-10 items-center border border-black/10 rounded-lg">
        <div className="p-6">
          <h3 className="text-2xl font-semibold">Total Reviews</h3>
          <h2 className="text-4xl font-bold py-2">{reviews.length}</h2>
          <p className="text-black/50">Growth in reviews on this years</p>
        </div>
        <div className="p-6 border-x border-black/20">
          <h3 className="text-2xl font-semibold">Average Rating</h3>
          <div className="text-2xl font-bold py-2 flex gap-2 items-center">
            <h2>{ratings()}</h2>
            <Stars rating={ratings()} />
          </div>
          <p className="text-black/50">Growth in reviews on this years</p>
        </div>
        <div className="p-6">
          {ratingPercentages.map((count, i) => (
            <div className="flex ">
              <p className="w-15 font-semibold text-[#002472]">{5 - i} star</p>
              <ProgressBar progress={count} />
              <p className="w-10 text-right text-[#00133b]">
                {count.toFixed()}%
              </p>
            </div>
          ))}
        </div>
      </div>
      <div>
        {reviews.length < 1 ? (
          <h2>No reviews given yet.</h2>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div className=" border border-black/10 p-4 rounded-lg">
                <div key={review._id} className="flex justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {review.customerName}
                    </h2>
                    <p className="text-sm text-black/50">
                      {review.customerEmail}
                    </p>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="text-black/50">{timeAgo(review.reviewAt)}</p>
                </div>
                <p className="py-2 text-justify">{review.customerReview}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <h2 className="text-xl mt-8 font-bold py-2">Your Review</h2>
      <div className="relative">
        <button className="flex gap-2 py-2 cursor-pointer">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoStarOutline
              key={i}
              onMouseMove={() => setStars(i + 1)}
              onClick={() => setSelectStars(i + 1)}
              className={`text-xl ${i < stars || i < selectStars ? "text-[#e7c503f5]" : ""}`}
            />
          ))}
        </button>
        <button className="flex gap-2 py-2 absolute top-0 cursor-pointer">
          {Array.from({ length: stars || selectStars }).map((_, i) => (
            <IoStarSharp
              key={i}
              onMouseMove={() => setStars(i + 1)}
              onMouseOut={() => setStars(0)}
              onClick={() => setSelectStars(i + 1)}
              className="text-xl block text-[#e7c503f5]"
            />
          ))}
        </button>
      </div>
      <form onSubmit={handleSubmit(handleSubmitCustomerReview)}>
        <fieldset>
          <label className="font-semibold py-1">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="border border-black/10 w-full p-3 rounded-md"
            {...register("customerName", { required: true })}
          />
        </fieldset>
        <fieldset className="mt-6">
          <label className="font-semibold py-1">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border border-black/10 w-full p-3 rounded-md"
            {...register("customerEmail", { required: true })}
          />
        </fieldset>
        <fieldset className="mt-6">
          <label className="font-semibold py-1">Review</label>
          <textarea
            {...register("customerReview", { required: true })}
            placeholder="Write your review . . . "
            className="border border-black/20 w-full rounded-md p-4 "
            rows={4}
          />
        </fieldset>
        <button className="btn px-8 text-white bg-[#037e22]" type="submit">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CustomerReview;
