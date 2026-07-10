import { useEffect, useState } from "react";
import ChooseBookCourier from "./ChooseBookCourier";
import Coverage from "./Coverage";
import LatestBooks from "./LatestBooks";
import Slider from "./Slider";
import useAxios from "../../Hooks/useAxios";

const Home = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const axiosSecure = useAxios();
  console.log("home");

  useEffect(() => {
    const getLatestBooks = async () => {
      const res = await axiosSecure.get("/books/latest");
      console.log(res.data);
      setLatestBooks(res.data);
    };
    getLatestBooks();
  }, [axiosSecure]);

  console.log(latestBooks);
  return (
    <div className="my-8 ">
      <Slider latestBooks={latestBooks} />
      <LatestBooks latestBooks={latestBooks} />
      <Coverage />
      <ChooseBookCourier />
    </div>
  );
};

export default Home;
