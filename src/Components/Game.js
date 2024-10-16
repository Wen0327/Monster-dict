import React, { useState } from "react";
import image1 from "../Static/RandomImg/1.png";
import image2 from "../Static/RandomImg/2.png";
import image3 from "../Static/RandomImg/3.png";

const Game = () => {
  // 初始狀態所有圖片都在 arr1
  const [arr1, setArr1] = useState([image1, image2, image3]);
  const [arr2, setArr2] = useState([]);

  const handleClick = (index, randomIndex1, randomIndex2) => {
    const selected = arr1[index];

    // 只移除當前顯示且未被選取的圖片
    const remainingImages = arr1.filter(
      (_, i) => i === randomIndex1 || i === randomIndex2
    );
    const newArr2 = remainingImages.filter((_, i) => i !== index);

    // 更新arr1，保留選中的圖片並移除當前未選中的圖片
    setArr1((prevArr1) =>
      prevArr1.filter((image) => image === selected || !newArr2.includes(image))
    );

    // 將未被選中的圖片加入 arr2
    setArr2((prevArr2) => [...prevArr2, ...newArr2]);

    console.log("Selected image: ", selected); // Log the selected image
  };

  const getRandomImageIndices = () => {
    if (arr1.length === 2) {
      return [0, 1]; // 如果只剩兩張圖片
    }

    const randomIndex1 = Math.floor(Math.random() * arr1.length);
    let randomIndex2 = Math.floor(Math.random() * arr1.length);

    // 確保 randomIndex2 不會跟 randomIndex1 一樣
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * arr1.length);
    }

    return [randomIndex1, randomIndex2];
  };

  // 當 arr1 只剩一張圖片時，顯示最終選擇的圖片
  if (arr1.length === 1) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>最後選擇的圖片是:</h3>
        <img src={arr1[0]} alt="Final Image" style={{ width: "150px" }} />
      </div>
    );
  }

  const [randomIndex1, randomIndex2] = getRandomImageIndices();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>選擇一個圖片:</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <img
          src={arr1[randomIndex1]}
          alt="Image 1"
          style={{ width: "500px", cursor: "pointer" }}
          onClick={() => handleClick(randomIndex1, randomIndex1, randomIndex2)}
        />
        <img
          src={arr1[randomIndex2]}
          alt="Image 2"
          style={{ width: "500px", cursor: "pointer" }}
          onClick={() => handleClick(randomIndex2, randomIndex1, randomIndex2)}
        />
      </div>
    </div>
  );
};

export default Game;
