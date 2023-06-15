import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import Nav from "../common/Nav";
import BattleRoom from "./BattleRoom";
import TreasureRoom from "./TreasureRoom";
import { useGameState } from "../../utils/context/GameStateContext";
import InventoryWindow from "./InventoryWindow";
import InventoryButton from "./InventoryButton";
export default function Play(props) {
  const {
    mode,
    setMode,
    isMusicPlaying,
    handleMusicToggle,
    windowToggle,
    windowClose,
    isMenuOpen,
  } = props;
  const { gameState, nextRoom, setSelectedMusic } = useGameState();

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
        windowToggle={windowToggle}
      />
      <div className="play-viewport">
        <button className="dash-return" onClick={returnToDash}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <FontAwesomeIcon icon={faHouse} />
        </button>
        {gameState.roomType === "battle" && <BattleRoom setMode={setMode} />}
        {gameState.roomType === "treasure" && (
          <TreasureRoom
            returnToDash={returnToDash}
            nextRoom={nextRoom}
            gameState={gameState}
          />
        )}
        {mode === "PLAY" && (
          <InventoryWindow
            handleClick={() => windowClose("inventory")}
            isMenuOpen={isMenuOpen}
          />
        )}
        <InventoryButton handleClick={() => windowToggle("inventory")} />
      </div>
    </div>
  );
}
