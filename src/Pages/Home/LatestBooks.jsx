import BookCard from "./BookCard";

const LatestBooks = ({ latestBooks }) => {
  return (
    <div className="my-8">
      <h1 className="text-6xl text-center font-bold bg-linear-to-r from-[#900101] to-[#00188e] dark:from-[#3a9dff] bg-clip-text text-transparent">
        New Collection
      </h1>

      <div className="grid lg:grid-cols-2 gap-4 my-8">
        {latestBooks.length > 0 &&
          latestBooks.map((book, index) => (
            <BookCard book={book} key={index} />
          ))}
      </div>
    </div>
  );
};

export default LatestBooks;
