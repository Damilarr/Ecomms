import React from "react";
import { UseGlobalContext } from "./Context";
import { Items } from "./Home";
import { useEffect } from "react";
import { useState } from "react";
import { useGetAllProductsQuery } from "../features/productsApi";

const SimilarItems = ({ ...props }) => {
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [products, setProducts] = useState([]);
  function getRandomProducts(objects, count = 4) {
    const shuffledObjects = objects.slice();
    for (let i = shuffledObjects.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledObjects[i], shuffledObjects[j]] = [
        shuffledObjects[j],
        shuffledObjects[i],
      ];
    }
    return shuffledObjects.slice(0, count);
  }
  useEffect(() => {
    if (!isLoading) {
      if (window.innerWidth < 640) {
        setProducts(getRandomProducts(data, 2));
      } else {
        setProducts(getRandomProducts(data));
      }
    }
  }, [isLoading]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="flex flex-col pt-14 pb-10 sm:pb-14 ">
      <h2 className="font-bold active lg:text-6xl md:text-5xl sm:text-4xl text-3xl py-9 text-center md:text-left">
        {props.heading}
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {products.map((product) => {
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

export default SimilarItems;
