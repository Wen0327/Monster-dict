import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

const basePath = process.env.PUBLIC_URL || '';

const totalImages = [];
for (let i = 1; i <= 300; i++) {
  totalImages.push(`${basePath}/RandomImg/${i}.png`);
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

const ModeButtonContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  gap: 10px;

  /* rwd */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Game = ({ currentLanguage }) => {
  // State to track if game has started
  const [gameStarted, setGameStarted] = useState(false);
  const [remainImgs, setRemainImgs] = useState([]);
  const [randomIndices, setRandomIndices] = useState([0, 1]);
  const [totalImagesInGame, setTotalImagesInGame] = useState(0);
  const [mode, setMode] = useState(null);

  // useEffect to log language change
  useEffect(() => {}, [currentLanguage]);

  // useEffect to generate random indices when remainImgs change
  useEffect(() => {
    if (remainImgs.length > 2) {
      const [randomIndex1, randomIndex2] = getRandomImageIndices();
      setRandomIndices([randomIndex1, randomIndex2]);
    }
  }, [remainImgs]);

  // Function to start the game
  const startGame = (selectedMode) => {
    setMode(selectedMode);
    let selectedImages = [];
    if (selectedMode === "normal") {
      selectedImages = [...totalImages];
    } else if (selectedMode === "half") {
      selectedImages = getRandomImages(totalImages, 150);
    } else if (selectedMode === "quarter") {
      selectedImages = getRandomImages(totalImages, 75);
    }
    setRemainImgs(selectedImages);
    setTotalImagesInGame(selectedImages.length);
    setGameStarted(true);
  };

  const getRandomImages = (imagesArray, count) => {
    const shuffled = [...imagesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const RenderImg = ({ index, onClick }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1/1",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
        }}
      >
        {!loaded && (
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
        <img
          src={remainImgs[index]}
          alt="Image"
          style={{
            width: remainImgs.length > 1 ? "100%" : "",
            height: remainImgs.length > 1 ? "100%" : "",
            display: loaded ? "block" : "none",
          }}
          onLoad={() => setLoaded(true)}
          onClick={remainImgs.length > 1 ? onClick : null}
        />
      </div>
    );
  };

  const RenderProgress = () => {
    const progress =
      ((totalImagesInGame - remainImgs.length) / totalImagesInGame) * 100;
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

  const handleClick = (clickedIndex) => {

    if (remainImgs.length === 2) {
      const selectedImage = remainImgs[clickedIndex];

      setRemainImgs([selectedImage]);
    } else {
      const remainingImages = remainImgs.filter(
        (_, i) => i === clickedIndex || !randomIndices.includes(i)
      );

      setRemainImgs(remainingImages);
    }
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

  const restartGame = () => {
    setGameStarted(false);
    setRemainImgs([]);
    setMode(null);
  };

  if (!gameStarted) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h3>
          <FormattedMessage id="Choose.Game.Mode" />
        </h3>
        <ModeButtonContainer>
          <Button onClick={() => startGame("normal")}>
            <FormattedMessage id="Normal.Mode" />
          </Button>
          <Button onClick={() => startGame("half")}>
            <FormattedMessage id="Half.Mode" />
          </Button>
          <Button onClick={() => startGame("quarter")}>
            <FormattedMessage id="Quarter.Mode" />
          </Button>
        </ModeButtonContainer>
      </div>
    );
  }

  if (remainImgs.length === 1) {
    return (
      <div
        style={{ alignItems: "center", textAlign: "center", marginTop: "20px" }}
      >
        <h3>
          <FormattedMessage id="Fave.Answer" />
        </h3>
        <img src={remainImgs[0]} alt="Image" style={{ maxWidth: "100%" }} />

        <Button onClick={restartGame} style={{ marginTop: "20px" }}>
          <FormattedMessage id="Restart.Game" defaultMessage="Restart Game" />
        </Button>
      </div>
    );
  }

  if (remainImgs.length === 2) {
    return (
      <div>
        <h3>
          <FormattedMessage id="Final.Match" />
        </h3>
        <h3>
          <FormattedMessage id="Choose.Character" />
        </h3>
        <RenderProgress />

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <ImgContainer>
            <RenderImg index={0} onClick={() => handleClick(0)} />
            <RenderImg index={1} onClick={() => handleClick(1)} />
          </ImgContainer>
        </div>
      </div>
    );
  }

  const [randomIndex1, randomIndex2] = randomIndices;

  console.log(randomIndices);

  const MatchCounter = () => {
    const showCounts = {
      256: "Round.of.256",
      128: "Round.of.128",
      64: "Round.of.64",
      32: "Round.of.32",
      16: "Round.of.16",
      8: "Quarter.Finals",
      4: "Semi.Finals",
      2: "Final.Match",
    };

    const currentLength = remainImgs.length;

    if (!showCounts[currentLength]) return null;

    return (
      <h3>
        <FormattedMessage id={showCounts[currentLength]} />
      </h3>
    );
  };

  return (
    <div>
      <MatchCounter />
      <h3>
        <FormattedMessage id="Choose.Character" />
      </h3>
      <RenderProgress />

      <div style={{ marginTop: "20px" }}>
        <ImgContainer>
          <RenderImg
            index={randomIndex1}
            onClick={() => handleClick(randomIndex1)}
          />
          <RenderImg
            index={randomIndex2}
            onClick={() => handleClick(randomIndex2)}
          />
        </ImgContainer>
      </div>
    </div>
  );
};

export default Game;
