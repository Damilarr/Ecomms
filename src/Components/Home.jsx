import React from "react";
import chair1 from "../assets/chair1.png";
import chair2 from "../assets/chair2.png";
import chair3 from "../assets/chair3.png";
import Layer from "../assets/Layer_1.png";
import Layer2 from "../assets/Layer2.png";
import ellipse8 from "../assets/Ellipse8.png";
import ellipse9 from "../assets/Ellipse9.png";
import ellipse10 from "../assets/Ellipse10.png";
import manSit from "../assets/manSit.png";
import womanJump from "../assets/womanJump.png";
import ellipse2 from "../assets/Ellipse2.png";
import { Link } from "react-router-dom";
import { useGetAllProductsQuery } from "../features/productsApi";

export const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-stretch justify-between pb-14 px-4 sm:px-6 md:px-10 lg:px-14">
      <div className="flex flex-col w-full md:w-1/2  justify-between lg:px-4">
        <div className="flex flex-col space-y-5 md:space-y-14 pb-6 md:pb-0">
          <h1 className="lg:text-6xl font-bold md:text-5xl sm:text-4xl text-3xl text-center md:text-left relative">
            Discover the Latest{" "}
            <span className="relative">
              Furniture{" "}
              <img
                src={Layer}
                alt="Layer"
                className="absolute bottom-0 left-0"
              />{" "}
            </span>{" "}
            Trends
          </h1>
          <p className="text-base md:text-2xl mt-0 md:text-left text-center">
            Shop the latest Fashion items and stay ahead of the game
          </p>
        </div>
        <button className="bg-black hidden md:block text-white px-5 py-2 text-xl w-fit">
          Explore more
          <i className="fa fa-arrow-right px-2"></i>
        </button>
      </div>
      <div className="w-full md:w-1/2 grid grid-cols-2 gap-3 px-2">
        <img
          src={chair1}
          alt="Furniture 1"
          className="h-44 sm:h-48 md:h-56   w-80 rounded-3xl object-cover"
        />
        <img
          src={chair2}
          alt="Furniture 2"
          className="h-44 sm:h-48 md:h-56 w-80 rounded-3xl object-cover"
        />
        <img
          src={chair3}
          className="rounded-3xl col-span-2 h-44 sm:h-48 md:h-56 w-full object-cover"
          alt="Furniture 3"
        />
      </div>
    </section>
  );
};
export const Collection = () => {
  const { data, isLoading, error } = useGetAllProductsQuery();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>An Error Occured {error.message} try refreshing</p>;
  }
  return (
    <section className="py-14 flex flex-col space-y-6 px-4 sm:px-6 md:px-10 lg:px-14 relative">
      <img
        src={ellipse2}
        alt="ellipse2"
        className="absolute   -top-[35rem] right-0"
      />
      <div className="flex flex-col w-3/4 z-10">
        <h2 className="lg:text-6xl font-bold md:text-5xl sm:text-4xl text-3xl text-center md:text-left relative">
          Stylish Collection Of Furniture
        </h2>
        <p className="text-gray text-base md:text-2xl mt-0 md:text-left text-center">
          Stay updated with our information and engaging blog posts about modern
          Furniture and Fashion on the industry
        </p>
      </div>
      <div className="flex space-x-3 flex-wrap z-10 space-y-3">
        <button className="bg-black px-5 py-2 rounded-l-full rounded-r-full text-white  outline-none border-none">
          All Furniture
        </button>
        <button className="text-black px-5 py-2 rounded-l-full rounded-r-full bg-[#CACED5]  outline-none border-none">
          Living Room
        </button>
        <button className="text-black px-5 py-2 rounded-l-full rounded-r-full bg-[#CACED5]  outline-none border-none">
          Home Office
        </button>
        <button className="text-black px-5 py-2 rounded-l-full rounded-r-full bg-[#CACED5]  outline-none border-none">
          Bedroom
        </button>
        <button className="text-black px-5 py-2 rounded-l-full rounded-r-full bg-[#CACED5]  outline-none border-none">
          Dining Table
        </button>
        <button className="text-black px-5 py-2 rounded-l-full rounded-r-full bg-[#CACED5]  outline-none border-none">
          More
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 z-10 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {data.slice(0, 8).map((product) => {
          return (
            <Items
              title={product.title}
              price={product.price}
              img={product.image}
              key={product.title}
              _id={product._id}
            />
          );
        })}
      </div>
    </section>
  );
};
export const Items = ({ ...props }) => {
  return (
    <Link
      to={`/product-details/?id=${props._id}`}
      className="flex flex-col p-2 space-y-8 justify-between  shadow-slate-300 shadow-lg"
    >
      <img
        src={props.img}
        alt={props.title}
        className="  rounded-2xl object-cover h-44"
      />
      <p className="text-[#78798E] text-lg">{props.title}</p>
      <div className="flex justify-between items-center">
        <h6 className="text-xl font-bold">${props.price}</h6>
        <button className="bg-[#D4DCFB] px-2 py-1 rounded-l-full rounded-r-full outline-none border-none text-base font-bold">
          Add to
        </button>
      </div>
    </Link>
  );
};
export const Discover = () => {
  return (
    <section className="flex px-4 sm:px-6 md:px-10 lg:px-14 flex-col md:flex-row py-14 space-y-8 md:space-y-0 items-start justify-between">
      <div className="flex flex-col w-full md:w-1/2   justify-between space-y-8">
        <div className="flex flex-col space-y-6 relative">
          <h1 className="lg:text-6xl font-bold md:text-5xl sm:text-4xl text-3xl text-center md:text-left relative">
            Enjoy Our Latest Fashion{" "}
            <span className="relative">
              Trends
              <img
                src={Layer2}
                alt="layer2"
                className="absolute top-0   -right-14"
              />
            </span>{" "}
            and Style
          </h1>
          <p className="text-base md:text-2xl mt-0 md:text-left text-center text-black">
            Ship our curated collection of fashion items and stay ahead of the
            fashion game
          </p>
          <img src={ellipse10} alt="ellipse10" className="absolute -top-14" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 text-base space-y-3 sm:space-y-0 text-center sm:text-left text-gray">
          <div className="flex flex-col space-y-3 sm:space-y-6">
            <h2 className="text-2xl font-bold text-black relative">
              Quality
              <img
                src={ellipse8}
                alt="ellipse8"
                className="absolute -top-5 left-5"
              />
            </h2>
            <span>
              Our fashion items are crafted with the highest materials and
              attention to details
            </span>
          </div>
          <div className="flex flex-col space-y-3 sm:space-y-6">
            <h2 className="text-2xl font-bold text-black relative">
              Style
              <img
                src={ellipse9}
                alt="ellipse9"
                className="absolute left-14 top-3"
              />
            </h2>
            <span>
              Express you unique style with our wide range of trendy items.
            </span>
          </div>
        </div>
        <button className="bg-black hidden md:flex self-end items-center text-white px-5 py-2 text-xl w-fit">
          Explore
          <i className="fa fa-arrow-right px-2"></i>
        </button>
      </div>
      <div className="md:w-1/2 w-full m-0 flex flex-col justify-center items-center md:items-end">
        <img
          src={manSit}
          className="lg:w-3/4 md:w-10/12 w-full"
          alt="Man sitting"
        />
      </div>
      <button className="bg-black md:hidden flex self-center items-center text-white px-3 sm:px-5 sm:py-2 py-1 md:text-xl sm:text-lg text-base w-fit">
        Read More
        <i className="fa fa-arrow-right px-2"></i>
      </button>
    </section>
  );
};
export const CustomerStories = () => {
  return (
    <section className="py-14 bg-white flex md:flex-row flex-col-reverse px-4 sm:px-6 md:px-10 lg:px-14">
      <button className="bg-black md:hidden my-8 flex self-center items-center text-white px-3 sm:px-5 sm:py-2 py-1 md:text-xl sm:text-lg text-base w-fit">
        Read More
        <i className="fa fa-arrow-right px-2"></i>
      </button>
      <div className="md:w-1/2 w-full m-0 flex flex-col justify-center items-center md:items-start">
        <img
          src={womanJump}
          className="lg:w-3/4 md:w-10/12 w-full"
          alt="Woman Jumping"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2 space-y-8">
        <span className="text-black font-medium text-base text-center md:text-left">
          Customer stories
        </span>
        <div className="flex flex-col text-purple text-center md:text-left">
          <h2 className="lg:text-6xl font-bold md:text-5xl sm:text-4xl text-3xl  relative">
            Success History of Our Customer{" "}
          </h2>
          <span className="sm:text-lg text-base">
            Emphasise time-saving and use numbers to maximise credibility.
          </span>
        </div>
        <div className="md:w-full lg:text-5xl md:text-4xl sm:text-3xl text-2xl sm:w-3/4 w-4/5 md:m-0 mx-auto pb-8 grid grid-cols-2 gap-3 text-gray font-bold gap-y-7">
          <div className="flex flex-col ">
            <h2 className="">10x</h2>
            <span className="font-normal sm:text-base text-sm">
              Increase in productivity
            </span>
          </div>
          <div className="flex flex-col ">
            <h2 className="">300%</h2>
            <span className="font-normal sm:text-base text-sm">
              Return on investment
            </span>
          </div>
          <div className="flex flex-col ">
            <h2 className="">5K+</h2>
            <span className="font-normal sm:text-base text-sm">
              Happy customers
            </span>
          </div>
          <div className="flex flex-col ">
            <h2 className="">100+</h2>
            <span className="font-normal sm:text-base text-sm">
              5-star review
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <section className="pt-10 pb-14  bg-ash">
      <HeroSection />
      <Collection />
      <Discover />
      <CustomerStories />
    </section>
  );
};

export default Home;
