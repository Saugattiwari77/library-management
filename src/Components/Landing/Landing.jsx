import React from "react";
// import Homepage from "../../Pages/Home/Homepage";
import Bookcard from "../Card/Bookcard";
import Carouselimg from "../../Pages/Home/Carousel";

const Landing = () => {
  const sampleBooks = [
    {
      id: 1,
      title: "Muna Madan",
      price: 450,
      originalPrice: 600,
      rating: 4.5,
      reviews: 24,
      stock: "IN STOCK",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Palpasa Cafe",
      price: 550,
      originalPrice: 700,
      rating: 4.2,
      reviews: 18,
      stock: "IN STOCK",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Karnali Blues",
      price: 500,
      originalPrice: 650,
      rating: 4.8,
      reviews: 32,
      stock: "IN STOCK",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="container mt-4">
      <Carouselimg />
      <div className="row mt-4">
        {sampleBooks.map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <Bookcard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
