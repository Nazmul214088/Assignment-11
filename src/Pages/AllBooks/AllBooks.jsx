import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import BookCard from "../Home/BookCard";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const axiosSecure = useAxios();
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const getBooks = async () => {
      const res = await axiosSecure.get("/books");
      setAllBooks(res.data);
    };
    getBooks();
  }, [axiosSecure]);
  const handleSearchBookBtn = (data) => {
    console.log(data);
    const filterData = allBooks.filter((book) =>
      book.bookTitle.toLowerCase().includes(data.inputSearch.toLowerCase()),
    );
    setAllBooks(filterData);
  };
  const handleSortBtn = async (data) => {
    const result = await axiosSecure.get(`/books?price=${data}`);
    setAllBooks(result.data);
  };
  return (
    <div className=" w-[94%] mx-auto ">
      <h1 className="text-6xl text-center py-8 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
        All Books
      </h1>
      <div className="flex justify-between">
        <form
          className="flex gap-2"
          onSubmit={handleSubmit(handleSearchBookBtn)}
        >
          <input
            type="text"
            placeholder="search"
            {...register("inputSearch", { required: true })}
            className="border p-2 rounded-lg"
          />
          <button
            type="submit"
            className="flex gap-2 cursor-pointer items-center border border-black/10 rounded-md bg-[#13d369] text-white py-2 px-8"
          >
            <FaSearch />
            <span>Search</span>
          </button>
        </form>
        <select
          onChange={(e) => handleSortBtn(e.target.value)}
          className="border border-black/10 rounded-md w-50 px-2 cursor-pointer"
        >
          <option value="">Default</option>
          <option value="name-asc">Book Name(A to Z)</option>
          <option value="name-desc">Book Name(Z to A)</option>
          <option value="price-asc">Price(Low{">"}High)</option>
          <option value="price-desc">Price(High{">"}Low)</option>
        </select>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-4 mb-8">
        {allBooks.length > 0 ? (
          allBooks.map((book, index) => <BookCard book={book} key={index} />)
        ) : (
          <h2 className="py-10 text-red-600 text-3xl text-center col-span-3 font-semibold">
            Book is not found!
          </h2>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
