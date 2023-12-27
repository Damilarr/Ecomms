import React, { useEffect, useState } from "react";
import gridIcon from "../assets/grid-outline.png";
import mobileSort from "../assets/mobileSort.png";
import { UseGlobalContext } from "./Context";
import { Items } from "./Home";
import ReactPaginate from "react-paginate";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import SimilarItems from "./SimilarItems";
import { useGetAllProductsQuery } from "../features/productsApi";

export const GridView = ({ props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = props.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <div className="flex flex-col py-5">
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {currentProducts.map((product) => {
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
      </section>
      <div className="py-3 w-4/5 mx-auto">
        <ReactPaginate
          className="py-5 justify-center items-center space-x-5 paginationn w-full mx-auto flex"
          onPageChange={paginate}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(props.length / productsPerPage)}
          previousLabel={"Prev"}
          marginPagesDisplayed={1}
          nextLabel={"Next"}
          containerClassName={"pagination"}
          pageLinkClassName={"page-number"}
          previousLinkClassName={"page-number"}
          nextLinkClassName={"page-number"}
          activeLinkClassName={"active"}
        />
      </div>
    </div>
  );
};
export const ListView = ({ props }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = props.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  return (
    <section className="py-5 flex flex-col">
      {currentProducts.map((product) => {
        return (
          <Link
            to={`/product-details/?id=${product._id}`}
            className="flex justify-between items-end sm:items-center shadow border border-white  mb-3 p-4 rounded-xl"
            key={product.title}
          >
            <div className="flex flex-col space-y-2">
              <p className="text-[#78798E] text-lg">{product.title}</p>
              <h6 className="text-xl font-bold">${product.price}</h6>
              <button className="bg-[#D4DCFB] rounded-md px-2 py-1 w-fit outline-none border-none text-base font-bold">
                Add to cart
              </button>
            </div>
            <img
              src={product.image}
              alt={product.title}
              className="  h-24 w-24  sm:h-36 sm:w-36 rounded-xl"
            />
          </Link>
        );
      })}

      <div className="py-3 w-4/5 mx-auto">
        <ReactPaginate
          className="py-5 justify-center items-center space-x-5 paginationn w-full mx-auto flex"
          onPageChange={paginate}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(props.length / productsPerPage)}
          previousLabel={"Prev"}
          marginPagesDisplayed={1}
          nextLabel={"Next"}
          containerClassName={"pagination"}
          pageLinkClassName={"page-number"}
          previousLinkClassName={"page-number"}
          nextLinkClassName={"page-number"}
          activeLinkClassName={"active"}
        />
      </div>
    </section>
  );
};
export const BreadCrumbs = ({ ...props }) => {
  return (
    <span className="text-[#ABABAB]  lg:text-2xl md:text-xl sm:text-base text-xs">
      <Link to={"/"}>Home</Link>
      <span className="text-black">/{props.text}</span>
    </span>
  );
};
const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const [showGrid, setShowGrid] = useState(true);
  const [category, setCategory] = useState([]);
  const { data, isLoading, error } = useGetAllProductsQuery();
  const handleChangeView = (e) => {
    if (e.currentTarget.classList.contains("selectedBtn")) {
      setShowGrid(showGrid);
    } else {
      setShowGrid(!showGrid);
    }
    document.querySelectorAll("button.view").forEach((btn) => {
      btn.classList.remove("selectedBtn");
    });
    e.currentTarget.classList.add("selectedBtn");
  };
  useEffect(() => {
    if (!isLoading) {
      let cat = new Set(data.map((product) => product.category[0]));
      const arr = Array.from(cat);
      setProducts(data);
      setCategory(arr);
    }
  }, [isLoading]);
  const chooseCategory = (e) => {
    const cat = e.target.innerHTML;
    const buttons = document.querySelectorAll("div.cats button");
    buttons.forEach((btn) => {
      btn.classList.remove("bg-black"), btn.classList.add("bg-btnCol");
      btn.classList.remove("text-white"), btn.classList.add("text-black");
    });
    e.target.classList.replace("bg-btnCol", "bg-black");
    e.target.classList.replace("text-black", "text-white");
    const newdata = data.filter((product) => product.category[0] === cat);
    if (newdata.length > 1) {
      setProducts(newdata);
    } else {
      setProducts(data);
    }
  };
  if (isLoading) {
    return <p>Getting Products...</p>;
  }
  if (!isLoading && error) {
    return <p>An Error Occured</p>;
  }
  return (
    <section className="py-14 px-4 sm:px-6 md:px-10 lg:px-14 flex flex-col bg-ash">
      <h2 className="font-bold active lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-center md:text-left">
        Available Products
      </h2>
      {isLoading && <p>loading...</p>}
      <div className="flex items-center justify-between pt-5">
        <BreadCrumbs text="List of Products" />
        <div className="flex items-center space-x-3">
          <span className="font-bold">View</span>
          <button
            className="selectedBtn w-11 h-11 flex view justify-center items-center"
            onClick={handleChangeView}
          >
            <img src={gridIcon} alt="gridDisplay" className="w-6" />
          </button>
          <button onClick={handleChangeView} className="w-11 view h-11">
            <i className="fa fa-list-ul text-xl px-2"></i>
          </button>
        </div>
      </div>
      {!isLoading && (
        <div className="flex space-x-3 items-center flex-wrap sm:space-y-3 pt-5 cats">
          <button
            onClick={chooseCategory}
            className="bg-black px-3 py-1  mb-2 sm:mb-0 sm:px-5 sm:py-2 rounded-l-full rounded-r-full text-white  outline-none border-none"
          >
            All Products
          </button>
          {category.map((cat) => {
            return (
              <button
                onClick={chooseCategory}
                key={cat}
                className="bg-btnCol my-0 px-3 mb-2 sm:mb-0  sm:px-5 py-1 sm:py-2 rounded-l-full rounded-r-full text-black  outline-none border-none"
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}
      {!isLoading && showGrid && <GridView props={products} />}
      {!isLoading && !showGrid && <ListView props={products} />}
      <SimilarItems heading="Similar Items" data={products} />
    </section>
  );
};

export default ShopNow;
