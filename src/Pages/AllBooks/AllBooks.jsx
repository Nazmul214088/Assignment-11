import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import BookCard from "../Home/BookCard";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const axiosSecure = useAxios();
  useEffect(() => {
    const getBooks = async () => {
      const res = await axiosSecure.get("/books");
      setAllBooks(res.data);
    };
    getBooks();
  }, [axiosSecure]);
  return (
    <div>
      <h1 className="text-6xl text-center py-8 font-bold bg-linear-to-r from-[#900101] to-[#00188e] bg-clip-text text-transparent">
        All Books
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        {allBooks.map((book, index) => (
          <BookCard book={book} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
