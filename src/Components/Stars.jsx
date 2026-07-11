import { IoStarHalf, IoStarOutline, IoStarSharp } from "react-icons/io5";

const Stars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 <= Math.floor(rating)) return "full";
    if (i < rating) return "half";
    return "empty";
  });

  return (
    <div className="flex gap-1 py-2 items-center text-2xl text-[#e7c503f5]">
      {stars.map((star, index) => (
        <span key={`star-${index}`}>
          {star === "full" ? (
            <IoStarSharp />
          ) : star === "half" ? (
            <IoStarHalf />
          ) : (
            <IoStarOutline />
          )}
        </span>
      ))}
    </div>
  );
};

export default Stars;
