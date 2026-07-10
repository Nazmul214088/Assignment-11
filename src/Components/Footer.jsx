import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaClockRotateLeft, FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { FcGlobe } from "react-icons/fc";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="grid md:grid-cols-3 justify-items-center lg:grid-cols-5 gap-4 py-8 px-8 dark:bg-[#57606f] dark:text-white">
        <aside className="md:col-span-2 md:flex gap-2">
          <figure className="flex md:flex-none justify-center">
            <img className="h-20" src={logo} alt="" />
          </figure>
          <p className="px-2 text-justify pr-6">
            Site Info BookCourier helps students, researchers, and readers
            access library books through a fast and convenient home delivery and
            pickup service.
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Quick Links</h6>
          <ul className="mx-2">
            <li>
              <a className="link link-hover">Branding</a>
            </li>
            <li>
              <a className="link link-hover">Design</a>
            </li>
            <li>
              <a className="link link-hover">Marketing</a>
            </li>
            <li>
              <a className="link link-hover">Advertisement</a>
            </li>
          </ul>
        </nav>
        <nav>
          <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
          <ul className="space-y-2 mx-2 text-sm">
            <li className="flex gap-2">
              <FaLocationDot className="text-lg" />
              <span>Gazipur, Dhaka, Bangladesh</span>
            </li>
            <li className="flex gap-2">
              <FaPhoneAlt className="text-lg" />
              <span> +880 1640-852353</span>
            </li>
            <li className="flex gap-2">
              <FcGlobe className="text-lg" />
              <span>support@bookcourier.com</span>
            </li>
            <li className="flex gap-2">
              <FaClockRotateLeft className="text-lg" />
              <span>Sat – Thu: 9:00 AM – 8:00 PM</span>
            </li>
          </ul>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <ul className="mx-2">
            <li>
              <a className="link link-hover">Terms of use</a>
            </li>
            <li>
              <a className="link link-hover">Privacy policy</a>
            </li>
            <li>
              <a className="link link-hover">Cookie policy</a>
            </li>
          </ul>
        </nav>
      </div>

      <ul className="flex justify-center gap-6 text-2xl py-8 dark:bg-[#57606f]">
        <li>
          <a>
            <FaLinkedinIn />
          </a>
        </li>
        <li>
          <a>
            <FaGithub />
          </a>
        </li>
        <li>
          <a>
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a>
            <FaXTwitter />
          </a>
        </li>
        <li>
          <a>
            <FaYoutube />
          </a>
        </li>
      </ul>
      <aside className="text-center py-8 dark:bg-[#20242d] dark:text-white">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          <span className="font-semibold"> ABookCourier</span> – Library-to-Home
          Delivery System.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
