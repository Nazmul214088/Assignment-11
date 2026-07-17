import { FaBookOpen, FaBrain, FaLaptopCode, FaMosque } from "react-icons/fa";
import { GiMicroscope } from "react-icons/gi";
import { PiBookOpenTextFill } from "react-icons/pi";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQueries } from "@tanstack/react-query";

const Categories = () => {
  const axiosSecure = useAxios();
  const bookCounts = useQueries({
    queries: categories.map((category) => ({
      queryKey: ["bookCounts", category.name],
      queryFn: async () => {
        const res = await axiosSecure.get(
          `/books?bookCategory=${category.name}`,
        );
        return res.data.length;
      },
    })),
  });

  return (
    <div className="mt-10 px-[2%]">
      <h1 className="text-6xl text-center py-8 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
        Testimonials & Statistics
      </h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const { data: count, isLoading } = bookCounts[index];
          const Icon = category.icon;
          return (
            <Link
              to={`/books?category=${category.name}`}
              className="border border-black/10 rounded-md p-6 text-center shadow-[0_0_20px_#0b2c3bb2] hover:shadow-[0_15px_20px_#0061b1] transition duration-200 hover:-translate-y-2 cursor-pointer"
            >
              <p className="flex justify-center">
                <Icon className="text-5xl md:text-6xl text-primary" />
              </p>
              <h2 className="text-xl md:text-2xl font-bold mt-4">
                {category.name}
              </h2>
              <p className="text-base md:text-lg text-gray-500 mt-1">
                {isLoading
                  ? "Loading..."
                  : `${count} ${count > 1 ? "Books" : "Book"}`}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
const categories = [
  {
    name: "Islamic",
    icon: FaMosque,
  },
  {
    name: "Fiction",
    icon: FaBookOpen,
  },
  {
    name: "Science",
    icon: GiMicroscope,
  },
  {
    name: "Computer Science",
    icon: FaLaptopCode,
  },
  {
    name: "Self Development",
    icon: FaBrain,
  },
  {
    name: "Novel",
    icon: PiBookOpenTextFill,
  },
];

export default Categories;
