import { useRef, useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditBookModal from "../../Components/EditBookModal";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";

const MyBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState();

  const axiosSecure = useAxios();
  const modalRef = useRef();
  useEffect(() => {
    const getAllBooks = async () => {
      const res = await axiosSecure.get("/books");
      setAllBooks(res.data);
      setLoading(false);
    };
    getAllBooks();
  }, [axiosSecure]);
  console.log(selectedBook);

  const handleDeleteBtn = (id) => {
    axiosSecure.delete(`books/${id}`).then((res) => {
      if (res.data.deletedCount === 1) {
        toast.success("Book delete successfully done.", {
          position: "top-center",
        });
        setAllBooks((prev) => prev.filter((book) => book._id !== id));
      }
    });
  };
  if (loading) {
    return <p className="text-xl text-center py-10">Loading . . . </p>;
  }
  const handleEditBtn = (book) => {
    setSelectedBook(book);
    modalRef.current.showModal();
  };
  const handleConfirmBtn = () => {
    modalRef.current.close();
  };

  const handleCancelBtn = () => {
    modalRef.current.close();
  };

  return (
    <div className="overflow-x-auto">
      <EditBookModal
        ref={modalRef}
        book={selectedBook}
        confirmBtn={handleConfirmBtn}
        cancelBtn={handleCancelBtn}
      />

      {allBooks.length > 0 ? (
        <table className="table table-zebra text-xl">
          {/* head */}
          <thead>
            <tr className="text-2xl bg-[#73717133]">
              <th>SI. No.</th>
              <th>Book Name</th>
              <th>Book Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book?.bookTitle}</td>
                <td>
                  <img src={book.bookImage} className="h-20" />
                </td>
                <td>
                  <button
                    onClick={() => handleEditBtn(book)}
                    className="btn text-xl mr-2"
                  >
                    <FaEdit />
                    <span className="hidden md:block">Edit</span>
                  </button>
                  <button
                    className="btn text-xl bg-red-600 text-white"
                    onClick={() => handleDeleteBtn(book._id)}
                  >
                    <span className="hidden md:block">Delete</span>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-4xl text-red-600 font-semibold text-center mt-20">
          There is no book!
        </p>
      )}
    </div>
  );
};

export default MyBooks;
