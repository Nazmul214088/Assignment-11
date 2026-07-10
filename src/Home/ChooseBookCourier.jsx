import { FaBookOpen, FaTags } from "react-icons/fa";
import { FaRotate, FaShieldHalved, FaTruckFast } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

const ChooseBookCourier = () => {
  const bookCourierData = [
    {
      icon: <FaBookOpen className="border-b my-2" />,
      title: "Why Choose Book Courier",
      description: "Thousands of books from different categories and authors.",
    },
    {
      icon: <FaTruckFast className="border-b my-2" />,
      title: "Fast Home Delivery",
      description: "Get books delivered quickly anywhere in Bangladesh.",
    },
    {
      icon: <FaTags className="border-b my-2" />,
      title: "Affordable Prices",
      description: "Best prices with regular discounts and offers.",
    },
    {
      icon: <FaShieldHalved className="border-b my-2" />,
      title: "Safe & Secure Payment",
      description: "Multiple secure payment methods for safe transactions.",
    },
    {
      icon: <MdVerified className="border-b my-2" />,
      title: "Trusted by Readers",
      description: "Positive reviews and growing community of book lovers.",
    },
    {
      icon: <FaRotate className="border-b my-2" />,
      title: "Easy Return Policy",
      description: "Simple return and replacement system for damaged books.",
    },
  ];
  return (
    <div className="my-8 px-[2%]">
      <h1 className="text-6xl text-center py-8 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
        Why Choose Book Courier{" "}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
        {bookCourierData.map((book) => (
          <div
            key={book.title}
            className="border max-w-100 p-8 rounded-xl text-center border-[#3333] shadow-lg"
          >
            <div className="text-3xl flex justify-center text-[#900101] ">
              {book.icon}
            </div>
            <h2 className="text-4xl text-[#000c48] font-bold mb-2 py-2">
              {book.title}
            </h2>
            <p className="text-lg py-2 text-[#333333bc]">{book.description}</p>
          </div>
        ))}
      </div>
      {/* 📖 10,000+ Books Available
👥 5,000+ Happy Readers
🚚 Delivery Across Bangladesh
⭐ 4.9 Average Rating */}
    </div>
  );
};

export default ChooseBookCourier;
