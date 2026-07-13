import { Link } from "react-router";
import bookBg from "../../assets/bookBg.jpg";

const BookCard = ({ book }) => {
  return (
    <div className="border border-[#3333] dark:bg-[#] rounded-xl shadow-lg flex flex-col justify-between">
      <div>
        <figure className=" relative border fig border-[#3333] rounded-xl ">
          <div
            className="absolute h-full rounded-xl w-full  bg-cover bg-center -z-10"
            style={{
              backgroundImage: `url(${bookBg})`,
              filter: "blur(5px)",
            }}
          ></div>
          <img className="h-80 w-auto mx-auto z-99" src={book.bookImage} />
        </figure>
        <div className="p-8">
          <h2 className="text-4xl font-bold bg-linear-to-r from-[#00188e] to-[#900101] bg-clip-text text-transparent">
            Title: {book.bookTitle}
          </h2>
          <p className="text-xl font-semibold">Author: {book.authorName}</p>
          <h3 className="text-xl py-2 font-semibold">
            Library Name: {book.libraryName}
          </h3>
        </div>
      </div>
      <div className="px-8 pb-6">
        <div className="flex justify-between py-2 border-y mb-6 border-[#3333]">
          <div>
            <p className="text-xl font-bold">Category: {book.bookCategory}</p>
            <p className="text-xl font-semibold">
              <span>Available Copies:</span> {book.copies}
            </p>
          </div>
          <div>
            <p className="text-xl flex justify-between">
              <span>Price:</span>{" "}
              <span className="font-bold">{book.price}</span>
            </p>
            <p className="text-xl flex justify-between gap-2">
              <span>Rating: </span>
              <span className="font-bold">
                {isNaN(book.averageRating) ? 0 : book.averageRating}
              </span>
            </p>
          </div>
        </div>
        <div className="text-right py-2 mb-4">
          <Link
            to={`/books/${book._id}`}
            state={{ book }}
            className="btn btn-primary bg-linear-to-r from-[#00188eb7] to-[#900101] hover:from-[#902001] hover:to-[#001269] transition duration-500"
          >
            Books Details
          </Link>
        </div>
        <p className="text-center text-[#33333375] pt-4">
          Added Date: {new Date(book.createdAt).toLocaleDateString()},
          {new Date(book.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
