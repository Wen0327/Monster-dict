import React, { useState } from "react";

const Game = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [usedImages, setUsedImages] = useState([]);

  // Image paths stored in RandomImg folder
  const images = [
    require("../Static/RandomImg/1.png"),
    require("../Static/RandomImg/2.png"),
    require("../Static/RandomImg/3.png"),
  ];

  // Function to get a random index that hasn't been used yet
  const getRandomImage = () => {
    const availableImages = images.filter((_, index) => !usedImages.includes(index));
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    return images.findIndex(image => image === availableImages[randomIndex]);
  };

  const handleClick = (index) => {
    setSelectedImage(images[index]);
    setUsedImages([...usedImages, index]);
    console.log("Selected image: ", images[index]); // Log the selected image
  };

  const randomIndex1 = getRandomImage();
  const randomIndex2 = getRandomImage();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>選擇一個圖片:</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <img
          src={images[randomIndex1]}
          alt="Image 1"
          style={{ width: "150px", cursor: "pointer" }}
          onClick={() => handleClick(randomIndex1)}
        />
        <img
          src={images[randomIndex2]}
          alt="Image 2"
          style={{ width: "150px", cursor: "pointer" }}
          onClick={() => handleClick(randomIndex2)}
        />
      </div>
    </div>
  );
};

export default Game;
