// src/pages/services/Brick.jsx
import React from "react";
import brick1 from "../../assets/img/w1.webp";
import brick2 from "../../assets/img/waste1.jpg";
import brick3 from "../../assets/img/waste2.jpg";
import brick4 from "../../assets/img/waste3.jpg";

const Brick = () => {
  const cards = [
    {
      title: "Eco Bricks",
      desc: "Turn plastic waste into eco-friendly bricks for construction or landscaping.",
      img: brick1,
    },
    {
      title: "Compressed Bottles",
      desc: "Use filled plastic bottles as sustainable alternatives to traditional bricks.",
      img: brick2,
    },
    {
      title: "Clay Brick Molds",
      desc: "Recycle broken bricks by forming them into molds with a blend of clay and waste.",
      img: brick3,
    },
    {
      title: "Plastic Brick Pavers",
      desc: "Melted plastic can be molded into brick pavers, reducing plastic pollution.",
      img: brick4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] py-12 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1e293b] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img src={card.img} alt={card.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{card.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brick;
