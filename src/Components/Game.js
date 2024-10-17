import React, { useState } from "react";
import image1 from "../Static/RandomImg/1.png";
import image2 from "../Static/RandomImg/2.png";
import image3 from "../Static/RandomImg/3.png";
import image4 from "../Static/RandomImg/4.png";

const Game = () => {
  // init all img in remainImgs
  const [remainImgs, setRemainImgs] = useState([
    image1,
    image2,
    image3,
    image4,
  ]);

  const handleClick = (index, randomIndex1, randomIndex2) => {
    const selected = remainImgs[index];

    // only remove not select
    const remainingImages = remainImgs.filter(
      (_, i) => i === randomIndex1 || i === randomIndex2
    );
    const newArr2 = remainingImages.filter((_, i) => i !== index);

    // renew remainImgs
    setRemainImgs((prevRemainImgs) =>
      prevRemainImgs.filter(
        (image) => image === selected || !newArr2.includes(image)
      )
    );
  };

  const getRandomImageIndices = () => {
    if (remainImgs.length === 2) {
      return [0, 1];
    }

    const randomIndex1 = Math.floor(Math.random() * remainImgs.length);
    let randomIndex2 = Math.floor(Math.random() * remainImgs.length);

    // to ensure randomIndex2 not same as randomIndex1
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * remainImgs.length);
    }

    return [randomIndex1, randomIndex2];
  };

  // return final img when all other img been remove
  if (remainImgs.length === 1) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>最後選擇的圖片是:</h3>
        <img src={remainImgs[0]} alt="Final Image" style={{ width: "500px" }} />
      </div>
    );
  }

  const [randomIndex1, randomIndex2] = getRandomImageIndices();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>選擇一個圖片:</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <img
          src={remainImgs[randomIndex1]}
          alt="Image 1"
          style={{ width: "500px", cursor: "pointer" }}
          onClick={() => handleClick(randomIndex1, randomIndex1, randomIndex2)}
        />
        <img
          src={remainImgs[randomIndex2]}
          alt="Image 2"
          style={{ width: "500px", cursor: "pointer" }}
          onClick={() => handleClick(randomIndex2, randomIndex1, randomIndex2)}
        />
      </div>
    </div>
  );
};

export default Game;
