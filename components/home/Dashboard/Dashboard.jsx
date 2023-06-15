import CharSection from "./CharSection";
import Nav from "../../common/Nav";
import EnterGame from "./EnterGame";

export default function Dashboard(props) {
  const {
    mode,
    setMode,
    isMusicPlaying,
    handleMusicToggle,
    setSelectedMusic,
    windowToggle,
  } = props;

  return (
    <div className="dashboard">
      <Nav
        mode={mode}
        isMusicPlaying={isMusicPlaying}
        handleMusicToggle={handleMusicToggle}
        windowToggle={windowToggle}
        windowTitle="POKÉDEX"
      />
      <div className="dash-body">
        <CharSection />
        <EnterGame setMode={setMode} setSelectedMusic={setSelectedMusic}/>
      </div>
    </div>
  );
}
