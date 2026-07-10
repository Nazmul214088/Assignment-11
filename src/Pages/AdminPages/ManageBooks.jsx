import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { MdOutlineUnpublished, MdPublish } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const ManageBooks = () => {
  const axiosSecure = useAxios();
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    const getBooks = async () => {
      const res = await axiosSecure.get("/books");
      setAllBooks(res.data);
    };
    getBooks();
  }, [axiosSecure]);
  const handleChangeStatus = async (status, id) => {
    const updateStatus = {
      status,
    };
    const res = await axiosSecure.patch(`/books/${id}`, updateStatus);
    console.log(res.data);
    if (res.data.modifiedCount > 0) {
      const updateBooks = allBooks.map((book) =>
        book._id === id ? { ...book, status: status } : book,
      );
      setAllBooks(updateBooks);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Added to the ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDeleteBtn = async (id) => {
    console.log(id);
    const deleteBook = await axiosSecure.delete(`/books/${id}`);
    if (deleteBook.data.deletedCount) {
      const updateBooks = allBooks.filter((book) => book._id !== id);
      setAllBooks(updateBooks);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Book deleted ! ",
        showConfirmButton: false,
        timer: 1500,
      });
      const deleteOrder = await axiosSecure.delete(`/orders/${id}`);
      if (deleteOrder.data.deletedCount) {
        const updateBooks = allBooks.filter((book) => book._id !== id);
        setAllBooks(updateBooks);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Deleted book is successfully done.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      {allBooks.length > 0 ? (
        <table className="table table-zebra text-xl">
          {/* head */}
          <thead>
            <tr className=" bg-[#3b96ff3b]">
              <th className="lg:table-cell hidden">SI. No.</th>
              <th className="lg:table-cell hidden">Book Image</th>
              <th>Book Name</th>
              <th className="md:table-cell hidden">Author Name</th>
              <th className="md:table-cell hidden">Status</th>
              <th>Publication Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book, i) => (
              <tr
                key={book._id}
                className={i % 2 === 1 ? "bg-[#58a3f81f]" : ""}
              >
                <td className="hidden lg:table-cell">{i + 1}</td>
                <td className="lg:table-cell hidden">
                  <img className="h-15" src={book.bookImage} alt={book.title} />
                </td>
                <td> {book.bookTitle}</td>
                <td className="md:table-cell hidden italic">
                  {book.authorName}
                </td>
                <td className="md:table-cell hidden">{book.status}</td>
                <td>
                  {book.status === "Publish" ? (
                    <button
                      className="flex items-center gap-1 cursor-pointer border border-black/10 px-6 py-2 rounded-lg bg-red-600 text-white"
                      onClick={() => handleChangeStatus("Unpublish", book._id)}
                    >
                      <MdOutlineUnpublished className="text-2xl" />
                      <span className="md:block hidden">Unpublish Book</span>
                    </button>
                  ) : (
                    <button
                      className="flex gap-1 items-center cursor-pointer border border-black/10 px-6 py-2 rounded-lg bg-green-500 text-white"
                      onClick={() => handleChangeStatus("Publish", book._id)}
                    >
                      <MdPublish className="text-2xl" />
                      <span className="md:block hidden">Publish Book</span>
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="flex items-center gap-1 cursor-pointer border border-black/10 px-6 py-2 rounded-lg bg-red-600 font-semibold text-white"
                    onClick={() => handleDeleteBtn(book._id)}
                  >
                    <FaTrashAlt />
                    <span className="md:block hidden">Delete</span>
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

export default ManageBooks;

const data = [
  {
    bookStatus: "Available",
    librarianEmail: "nazmulhoque.info@gmail.com",
    bookImage: "https://i.ibb.co.com/3y45ffN4/06.jpg",
    bookTitle: "Clean Code",
    authorName: "Robert C. Martin",
    bookCategory: "Programming",
    libraryName: "Tech World Library",
    copies: 4,
    price: 950,
    deliveryCharge: 80,
    rating: 4.9,
    bookDescription:
      "Clean Code is one of the most respected programming books for software developers. Written by Robert C. Martin, the book teaches how to write clean, maintainable, efficient, and professional-quality code. It covers coding principles, naming conventions, functions, testing, refactoring, and software craftsmanship. Through practical examples and real-world scenarios, developers learn how to improve code readability and build scalable software systems.",
    language: "English",
    pages: 464,
    publisherName: "Prentice Hall",
    publishedYear: 2008,
    isbnNo: "9780132350884",
    edition: "1st Edition",
    format: "Paperback",
    bookType: [
      "Best Practices for Developers",
      "Code Refactoring Techniques",
      "Readable Code Principles",
      "Professional Software Development",
    ],
    createdAt: "2026-05-17T14:20:00Z",
    status: "Publish",
  },
  {
    bookStatus: "Available",
    librarianEmail: "nazmulhoque.info@gmail.com",
    bookImage: "https://i.ibb.co.com/3y45ffN4/06.jpg",
    bookTitle: "Clean Code",
    authorName: "Robert C. Martin",
    bookCategory: "Programming",
    libraryName: "Tech World Library",
    copies: 4,
    price: 950,
    deliveryCharge: 80,
    rating: 4.9,
    bookDescription:
      "Clean Code is one of the most respected programming books for software developers. Written by Robert C. Martin, the book teaches how to write clean, maintainable, efficient, and professional-quality code. It covers coding principles, naming conventions, functions, testing, refactoring, and software craftsmanship. Through practical examples and real-world scenarios, developers learn how to improve code readability and build scalable software systems.",
    language: "English",
    pages: 464,
    publisherName: "Prentice Hall",
    publishedYear: 2008,
    isbnNo: "9780132350884",
    edition: "1st Edition",
    format: "Paperback",
    bookType: [
      "Best Practices for Developers",
      "Code Refactoring Techniques",
      "Readable Code Principles",
      "Professional Software Development",
    ],
    createdAt: "2026-05-17T14:20:00Z",
    status: "Publish",
  },
  {
    bookStatus: "Available",
    librarianEmail: "nazmulhoque.info@gmail.com",
    bookImage: "https://i.ibb.co.com/20GY5B9H/02.webp",
    bookTitle: "Atomic Habits",
    authorName: "James Clear",
    bookCategory: "Self Development",
    libraryName: "Knowledge Point Library",
    copies: 5,
    price: 650,
    deliveryCharge: 70,
    rating: 4.9,
    bookDescription:
      "Atomic Habits is a practical self-improvement guide that explains how tiny daily habits can create remarkable long-term results. James Clear introduces proven strategies to help readers build good habits, eliminate bad habits, and improve productivity through small but consistent changes. The book focuses on systems, discipline, motivation, and identity-based habits, making it one of the most popular personal development books worldwide.",
    language: "English",
    pages: 320,
    publisherName: "Avery",
    publishedYear: 2018,
    isbnNo: "9780735211292",
    edition: "1st Edition",
    format: "Hardcover",
    bookType: [
      "Habit Building Techniques",
      "Real-Life Examples",
      "Productivity Improvement",
      "Easy Practical Strategies",
    ],
    createdAt: "2026-05-19T14:15:00Z",
    status: "Publish",
  },
  {
    bookStatus: "Available",
    librarianEmail: "nazmulhoque.info@gmail.com",
    bookImage: "https://i.ibb.co.com/21qNySFw/05.jpg",
    bookTitle: "The Midnight Library",
    authorName: "Matt Haig",
    bookCategory: "Fantasy Fiction",
    libraryName: "Readers Hub Library",
    copies: 7,
    price: 600,
    deliveryCharge: 65,
    rating: 4.6,
    bookDescription:
      "The Midnight Library is a deeply emotional fantasy novel that explores regret, hope, and the infinite possibilities of life. The story follows Nora Seed as she enters a mysterious library between life and death, where each book allows her to experience a different version of her life. Through these journeys, she learns important truths about happiness, choices, and self-acceptance.",
    language: "English",
    pages: 304,
    publisherName: "Canongate Books",
    publishedYear: 2020,
    isbnNo: "9781786892737",
    edition: "Special Edition",
    format: "Hardcover",
    bookType: [
      "Emotional Storytelling",
      "Fantasy Elements",
      "Life Lessons",
      "Award-Winning Novel",
    ],
    createdAt: "2026-05-21T08:10:00Z",
    status: "Publish",
  },
  {
    bookStatus: "Available",
    librarianEmail: "nazmulhoque.info@gmail.com",
    bookImage: "https://i.ibb.co.com/xSNP4Mj1/04.png",
    bookTitle: "Rich Dad Poor Dad",
    authorName: "Robert T. Kiyosaki",
    bookCategory: "Finance",
    libraryName: "Smart Study Library",
    copies: 4,
    price: 700,
    deliveryCharge: 80,
    rating: 4.8,
    bookDescription:
      "Rich Dad Poor Dad shares powerful financial lessons through the experiences of the author's two father figures — one rich and one poor. The book challenges traditional beliefs about money, jobs, and education while teaching readers the importance of financial literacy, investing, entrepreneurship, and passive income. It is widely regarded as one of the best beginner-friendly personal finance books.",
    language: "English",
    pages: 336,
    publisherName: "Plata Publishing",
    publishedYear: 1997,
    isbnNo: "9781612680194",
    edition: "Updated Edition",
    format: "Paperback",
    bookType: [
      "Financial Education",
      "Investment Basics",
      "Passive Income Concepts",
      "Beginner-Friendly Finance Guide",
    ],
    createdAt: "2026-05-20T16:20:00Z",
    status: "Unpublish",
  },
  {
    bookStatus: "Available",
    librarianEmail: "nazmulhoque.info@gmail.com",
    bookImage: "https://i.ibb.co.com/LdmX4m2J/01.png",
    bookTitle: "The Alchemist",
    authorName: "Paulo Coelho",
    bookCategory: "Fiction",
    libraryName: "Dhaka Central Library",
    copies: 8,
    price: 450,
    deliveryCharge: 60,
    rating: 4.8,
    bookDescription:
      "The Alchemist is an inspiring novel that follows the journey of Santiago, a young Andalusian shepherd who dreams of discovering a hidden treasure near the Egyptian pyramids. During his journey, he meets different people who guide him toward understanding the importance of listening to his heart and following his dreams. The story beautifully combines adventure, spirituality, and self-discovery while teaching readers valuable lessons about destiny, courage, and personal growth.",
    language: "English",
    pages: 208,
    publisherName: "HarperOne",
    publishedYear: 1988,
    isbnNo: "9780061122415",
    edition: "25th Anniversary Edition",
    format: "Paperback",
    bookType: [
      "International Bestseller",
      "Inspirational Storytelling",
      "Easy to Read Language",
      "Life-Changing Lessons",
    ],
    createdAt: "2026-05-18T10:30:00Z",
    status: "Unpublish",
  },
];
