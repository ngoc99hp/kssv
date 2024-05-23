import React, { useState } from "react";
import img1 from "../../homeimg/1.jpg";
import img2 from "../../homeimg/2.jpg";
import img5 from "../../homeimg/5.jpg";
import img6 from "../../homeimg/6.jpg";
import img7 from "../../homeimg/7.jpg";

const images = [img1, img2, img5, img6, img7];

const PhotoGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (img) => {
    setSelectedImage(img);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => openModal(img)}
          >
            <img src={img} alt={`Gallery Image ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div className="relative">
            <img src={selectedImage} alt="Fullscreen Image" className="object-cover w-auto h-auto max-h-full max-w-full" />
            <button
              className="absolute top-2 right-2 text-black text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center my-8 text-gray-800 drop-shadow-lg">
        Đại học Quản lý và Công nghệ Hải Phòng
      </h1>
      <PhotoGallery />
    </div>
  );
};

export default Home;
