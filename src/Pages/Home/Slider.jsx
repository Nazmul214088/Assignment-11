import { FaArrowRight } from "react-icons/fa";
import sliderBackground from "../../assets/sliderBackground.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";

const Slider = ({ latestBooks }) => {
  return (
    <Swiper
      loop={true}
      pagination={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
        stopOnLastSlide: false,
        reverseDirection: false,
      }}
      navigation={true}
      modules={[Navigation, Pagination, Autoplay]}
      className="mySwiper h-[70vh] lg:h-[90vh]"
    >
      {latestBooks &&
        latestBooks.map((book, i) => (
          <SwiperSlide
            key={book._id}
            style={{ backgroundImage: `url(${sliderBackground})` }}
            className=" bg-cover bg-center"
          >
            <div className="flex gap-4 h-full justify-center items-center">
              <img className="h-[90%]" src={book.bookImage} />
              <div>
                <h1 className="text-4xl lg:text-5xl font-semibold py-4 text-white">
                  0{i + 1}
                </h1>
                <h2 className="text-5xl lg:text-6xl text-white font-bold pt-4">
                  {book.bookTitle}
                </h2>
                <h2 className="text-2xl lg:text-3xl text-[#6f64ff] font-semibold italic pb-6">
                  {book.authorName}
                </h2>
                <p className="text-xl py-2 w-[90%] text-white text-justify hidden md:block">
                  {book.bookDescription.length > 120
                    ? book.bookDescription.slice(0, 120) + " . . . "
                    : book.bookDescription}
                </p>
                <Link to={"/books"} className="btn btn-primary my-2">
                  View All Books <FaArrowRight />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
