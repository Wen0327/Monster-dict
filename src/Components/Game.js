import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

const images = [];
for (let i = 1; i <= 300; i++) {
  images.push(`/RandomImg/${i}.png`); 
}

const Game = ({ currentLanguage }) => {
  // init all img
  const [remainImgs, setRemainImgs] = useState(images);
  const [randomIndices, setRandomIndices] = useState([0, 1]);
  const totalImages = images.length;

  // useEffect to log language change
  useEffect(() => {
    console.log("Language switched to:", currentLanguage);
  }, [currentLanguage]);

  // useEffect to generate random indices when remainImgs change
  useEffect(() => {
    if (remainImgs.length > 2) {
      const [randomIndex1, randomIndex2] = getRandomImageIndices();
      setRandomIndices([randomIndex1, randomIndex2]);
    }
  }, [remainImgs]);

  const handleClick = (index, randomIndex1, randomIndex2) => {
    const selected = remainImgs[index];

    // only remove not select
    const remainingImages = remainImgs.filter(
      (_, i) => i === randomIndex1 || i === randomIndex2
    );
    const newArr2 = remainingImages.filter((_, i) => i !== index);

    // renew remaining images
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

    // ensure randomIndex2 not the same as randomIndex1
    while (randomIndex2 === randomIndex1) {
      randomIndex2 = Math.floor(Math.random() * remainImgs.length);
    }

    return [randomIndex1, randomIndex2];
  };

  const progress = ((totalImages - remainImgs.length) / totalImages) * 100;

  if (remainImgs.length === 1) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>最後選擇的圖片是:</h3>
        <img src={remainImgs[0]} alt="Final Image" style={{ width: "500px" }} />
      </div>
    );
  }

// save random index
  const [randomIndex1, randomIndex2] = randomIndices; 

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>
        <FormattedMessage id="Choose.Character" />
      </h3>
      <progress
        value={progress}
        max="100"
        style={{ width: "80%", height: "20px", marginBottom: "20px" }}
      >
        {progress}%
      </progress>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
        }}
      >
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
