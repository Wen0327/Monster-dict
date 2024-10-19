import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FormattedMessage } from "react-intl";

const basePath = process.env.PUBLIC_URL || "";

const totalImages = [];
for (let i = 0; i <= 100; i++) {
  totalImages.push(`${basePath}/LotteryChar/${i}.png`);
}

const Lottery = () => {
  const [results, setResults] = useState([]);
  const [showRetry, setShowRetry] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [swappedCharacter, setSwappedCharacter] = useState(null); // Store the swapped character
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  // Function to handle swapping characters
  const handleSwap = () => {
    if (selectedLeft && selectedRight) {
      setSwappedCharacter({ left: selectedLeft, right: selectedRight }); // Store both the left and right selections
      setIsModalVisible(false);
    }
  };

  // Function to simulate a 10-pull
  const pullChar = () => {
    const pulls = [];
    for (let i = 0; i < 9; i++) {
      const randomNum = Math.random();
      if (randomNum < 0.12) {
        const character = Math.floor(Math.random() * 100) + 1; // Character from 1 to 100
        pulls.push(character);
      } else {
        pulls.push(0); // Character 0
      }
    }

    // The 10th pull is guaranteed to be from characters 1-20, with the swapped character replacing the left character
    const lastPullPool = [...Array(20).keys()].map((i) => i + 1);

    if (swappedCharacter) {
      const { left, right } = swappedCharacter;
      const index = lastPullPool.indexOf(left);
      if (index !== -1) {
        lastPullPool.splice(index, 1, right); // Replace the selected left character with the selected right character
      }
    }

    const guaranteedCharacter =
      lastPullPool[Math.floor(Math.random() * lastPullPool.length)];
    pulls.push(guaranteedCharacter);

    setResults(pulls);
    setShowRetry(true);
  };

  // Function to reset  and immediately pull again
  const resetChar = () => {
    setResults([]);
    setShowRetry(false);
    pullChar(); 
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>
        * <FormattedMessage id="Use.JP.Anniversary.Data" />
      </h2>

      <Button
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: "20px" }}
      >
        <FormattedMessage
          id="Switch.Character"
          defaultMessage="Swap Characters"
        />
      </Button>

      <Modal
        title={
          <FormattedMessage
            id="Switch.Character"
            defaultMessage="Swap Characters"
          />
        }
        visible={isModalVisible}
        onOk={handleSwap}
        onCancel={() => setIsModalVisible(false)}
        okText={<FormattedMessage id="Switch" />}
        cancelText={<FormattedMessage id="Cancel" />}
        destroyOnClose
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div>
            <h4>
              <FormattedMessage id="Top.20" />
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((char) => (
                <img
                  key={char}
                  src={totalImages[char]}
                  alt={`Character ${char}`}
                  style={{
                    border:
                      selectedLeft === char
                        ? "2px solid blue"
                        : "1px solid #ddd",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "45px",
                    height: "45px",
                  }}
                  onClick={() => setSelectedLeft(char)}
                />
              ))}
            </div>
          </div>
          <div>
            <h4>
              <FormattedMessage id="Other.Characters" />
            </h4>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              {Array.from({ length: 80 }, (_, i) => i + 21).map((char) => (
                <img
                  key={char}
                  src={totalImages[char]}
                  alt={`Character ${char}`}
                  style={{
                    border:
                      selectedRight === char
                        ? "2px solid blue"
                        : "1px solid #ddd",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "45px",
                    height: "45px",
                  }}
                  onClick={() => setSelectedRight(char)}
                />
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {!gameStarted ? (
        <Button
          onClick={() => {
            setGameStarted(true);
            pullChar();
          }}
        >
          <FormattedMessage id="Ten.Draw" defaultMessage="Pull 10" />
        </Button>
      ) : (
        <>
          {results.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "10px",
                  justifyContent: "center",
                  maxWidth: "500px",
                  margin: "0 auto",
                }}
              >
                {results.map((result, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={totalImages[result]}
                      alt={`Character ${result}`}
                      style={{ width: "45px", height: "45px" }}
                    />
                  </div>
                ))}
              </div>

              {showRetry && (
                <Button onClick={resetChar} style={{ marginTop: "20px" }}>
                  <FormattedMessage id="Redo.Ten.Draw" defaultMessage="Retry" />
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Lottery;
