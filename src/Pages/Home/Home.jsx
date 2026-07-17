import { useEffect, useState } from "react";
import ChooseBookCourier from "./ChooseBookCourier";
import Coverage from "./Coverage";
import LatestBooks from "./LatestBooks";
import Slider from "./Slider";
import useAxios from "../../Hooks/useAxios";
import TestimonialsAndStatistics from "./TestimonialsAndStatistics";
import Categories from "./Categories";

const Home = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const axiosSecure = useAxios();

  useEffect(() => {
    const getLatestBooks = async () => {
      const res = await axiosSecure.get("/books/latest");
      setLatestBooks(res.data);
    };
    getLatestBooks();
  }, [axiosSecure]);
  return (
    <div className="my-8 ">
      <Slider latestBooks={latestBooks} />
      <LatestBooks latestBooks={latestBooks} />
      <Coverage />
      <ChooseBookCourier />
      <Categories />
      <TestimonialsAndStatistics />
    </div>
  );
};

export default Home;
