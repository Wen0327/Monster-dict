import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const images = [];
for (let i = 1; i <= 300; i++) {
  images.push(`/RandomImg/${i}.png`);
}

const ImgContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 20px;

   /* rwd */
   @media (max-width: 768px) {
    flex-direction: column;
  }
`;

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

  const RenderImg = ({ index }) => {
    return (
      <img
        src={remainImgs[index]}
        alt="Image"
        style={{
          width: "500px",
          maxWidth: "100%",
          cursor: remainImgs.length === 1 ? "default" : "pointer",
        }}
        onClick={remainImgs.length > 1 ? () => handleClick(index) : null}
      />
    );
  };

  const RenderProgress = () => {
    return (
      <progress
        value={progress}
        max="100"
        style={{ width: "80%", height: "20px", marginBottom: "20px" }}
      >
        {progress}%
      </progress>
    );
  };

  const handleClick = (index) => {
    // only remove not select
    const remainingImages = remainImgs.filter((_, i) => i !== index);

    // renew remaining images
    setRemainImgs(remainingImages);
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
        <h3>
          <FormattedMessage id="Fave.Answer" />
        </h3>
        <RenderImg index={0} />
      </div>
    );
  }

  if (remainImgs.length === 2) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>
          <FormattedMessage id="Choose.Character" />
        </h3>
        <RenderProgress />
        <ImgContainer>
          <RenderImg index={0} />
          <RenderImg index={1} />
        </ImgContainer>
      </div>
    );
  }

  const [randomIndex1, randomIndex2] = randomIndices;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>
        <FormattedMessage id="Choose.Character" />
      </h3>
      <RenderProgress />
      <ImgContainer>
        <RenderImg index={randomIndex1} />
        <RenderImg index={randomIndex2} />
      </ImgContainer>
    </div>
  );
};

export default Game;
