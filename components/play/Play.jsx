import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Nav from "../common/Nav";
import BattleRoom from "./BattleRoom";
import TreasureRoom from "./TreasureRoom";
import { useGameState } from "../../utils/context/GameStateContext";
import EndGameRoom from "./EndGameRoom";

// Import comics
import intro1 from "@/public/story/intro_comic1.png";
import intro2 from "@/public/story/intro_comic2.png";
import ComicPopup from "../common/ComicPopup";

import { dungeon } from "@/game/pregenerated/dungeon1";

export default function Play(props) {
  const { mode, setMode, isMusicPlaying, handleMusicToggle } = props;
  const {
    gameState,
    nextRoom,
    setSelectedMusic,
    flashSplash,
    setSplash,
  } = useGameState();

  // state for popup, current image
  const [showStory, setShowStory] = useState(false);
  const pages = [intro1, intro2];

  // Story for Floor 1, Room 1
  useEffect(() => {
    if (gameState.currentRoom === dungeon.floor_1.room_1) {
      setShowStory(true);
    }
    return () => {
      setShowStory(false);
    };
  }, [gameState.currentRoom]);

  // Briefly shows VS splash on entering Play or new room, once any stories have been closed
  useEffect(() => {
    if (!showStory) {
      flashSplash();
      return () => {
        setSplash(false);
      };
    }
  }, [gameState.currentRoom, showStory]);

  const returnToDash = () => {
    setMode("DASH");
    setSelectedMusic("00_pokemon_center.mp3");
  };

  return (
    <div className="play-container">
      <Nav
        mode={mode}
        isMusicPlaying={isMusicPlaying}
        handleMusicToggle={handleMusicToggle}
        windowTitle="ROUTE 1"
      />
      <div className="play-viewport">
        {showStory && (
          <ComicPopup
            pages={pages}
            showStory={showStory}
            setShowStory={setShowStory}
          />
        )}
        <button className="dash-return" onClick={returnToDash}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <FontAwesomeIcon icon={faHouse} />
        </button>
        {gameState.roomType === "battle" && (
          <BattleRoom setMode={setMode} setShowStory={setShowStory} />
        )}
        {gameState.roomType === "treasure" && (
          <TreasureRoom
            returnToDash={returnToDash}
            nextRoom={nextRoom}
            gameState={gameState}
          />
        )}
        {gameState.roomType === "end" && (
          <EndGameRoom
            returnToDash={returnToDash}
            nextRoom={nextRoom}
            gameState={gameState}
            setMode={setMode}
            setSelectedMusic={setSelectedMusic}
            setShowStory={setShowStory}
          />
        )}
      </div>
    </div>
  );
}
