import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import BookCard from "./BookCard";

const RelatedBooks = ({ bookCategory }) => {
  console.log(bookCategory);
  const axiosSecure = useAxios();
  const [relatedBooks, setRelatedBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await axiosSecure.get(`/books?bookCategory=${bookCategory}`);
      setRelatedBooks(res.data);
    };
    getBooks();
  }, [axiosSecure, bookCategory]);

  return (
    <div>
      <h2 className="text-4xl font-bold text-center py-4 mt-8 bg-[#2121f72a]">
        Related Books
      </h2>
      <div>
        {relatedBooks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
            {relatedBooks.map((book) => (
              <BookCard book={book} />
            ))}
          </div>
        ) : (
          <h2 className="text-4xl font-bold text-center py-4 text-red-600 my-10">
            Looks like there aren't any related books yet.
          </h2>
        )}
      </div>
    </div>
  );
};

export default RelatedBooks;
