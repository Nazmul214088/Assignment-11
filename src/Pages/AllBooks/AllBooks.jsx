import { useEffect, useMemo, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import BookCard from "../Home/BookCard";
import { FaSearch } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import Pagination from "./Components/pagination";
const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [booksPerPage, setBooksPerPage] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [page, setPage] = useState(1);
  const axiosSecure = useAxios();
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const getCols = useMemo(() => {
    if (windowWidth > 1536) {
      return 3;
    } else if (windowWidth > 1280) {
      return 2;
    } else {
      return 1;
    }
  }, [windowWidth]);
  console.log(page);
  console.log(getCols);
  useEffect(() => {
    const getBooks = async () => {
      if (category) {
        const res = await axiosSecure.get(`/books?bookCategory=${category}`);
        setAllBooks(res.data);
      } else {
        const res = await axiosSecure.get("/books");
        setAllBooks(res.data);
      }
    };
    getBooks();
  }, [axiosSecure, category]);
  useEffect(() => {
    const getBooks = async () => {
      if (category) {
        const res = await axiosSecure.get(
          `/books?bookCategory=${category}&page=${page}&limit=${2 * getCols}`,
        );
        setBooksPerPage(res.data);
      } else {
        const res = await axiosSecure.get(
          `/books?page=${page}&limit=${2 * getCols}`,
        );
        setBooksPerPage(res.data);
      }
    };
    getBooks();
  }, [axiosSecure, category, page, getCols]);
  const handleSearchBookBtn = (data) => {
    const filterData = allBooks.filter((book) =>
      book.bookTitle.toLowerCase().includes(data.inputSearch.toLowerCase()),
    );
    setAllBooks(filterData);
  };
  const handleSortBtn = async (data) => {
    const result = await axiosSecure.get(`/books?price=${data}`);
    setAllBooks(result.data);
  };

  const totalPage = () => {
    return Math.ceil(allBooks.length / (getCols * 2));
  };

  return (
    <div className=" w-[94%] mx-auto ">
      {category ? (
        <h1 className="text-5xl text-center py-10 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
          {category} Book Collection
        </h1>
      ) : (
        <h1 className="text-5xl text-center py-10 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
          All Books
        </h1>
      )}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-20 md:gap-30 lg:gap-40">
        <form
          className="flex gap-2"
          onSubmit={handleSubmit(handleSearchBookBtn)}
        >
          <input
            type="text"
            placeholder="search"
            {...register("inputSearch", { required: true })}
            className="border p-2 rounded-lg w-full"
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
          className="border border-black/10 rounded-md p-2 cursor-pointer w-full"
        >
          <option value="">Default</option>
          <option value="name-asc">Book Name(A to Z)</option>
          <option value="name-desc">Book Name(Z to A)</option>
          <option value="price-asc">Price(Low{">"}High)</option>
          <option value="price-desc">Price(High{">"}Low)</option>
        </select>
      </div>
      <div className="grid lg:grid-cols-2 gap-4 mt-4 mb-8">
        {booksPerPage.length > 0 ? (
          booksPerPage.map((book, index) => (
            <BookCard book={book} key={index} />
          ))
        ) : (
          <h2 className="py-10 text-red-600 text-3xl text-center col-span-3 font-semibold">
            Book is not found!
          </h2>
        )}
      </div>
      <Pagination
        totalPage={totalPage()}
        cols={getCols}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AllBooks;
