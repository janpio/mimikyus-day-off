import CharSection from "./CharSection";
import Nav from "../../common/Nav";
import EnterGame from "./EnterGame";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
  let { mode, setMode, isMusicPlaying, handleMusicToggle, db_user, db_character, db_moves, db_achievements } = props;
  // const userId = 1;
  // const achievementName = "something shiny";

  // const data = {
  //   userId: 1, // Replace with the actual userID
  // };

  // fetch("/api/updateAchievements", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Failed to update achievement");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log("Achievement updated successfully:", data.achievement);
  //   })
  //   .catch((error) => {
  //     console.error("Failed to update achievement:", error);
  //   });

  return (
    <div className="dashboard">
      <Nav
        mode={mode}
        isMusicPlaying={isMusicPlaying}
        handleMusicToggle={handleMusicToggle}
        windowTitle="POKÉDEX"
        db_achievements={db_achievements}
      />
      <div className="dash-body">
        <CharSection db_moves={db_moves}/>
        <EnterGame setMode={setMode} />
      </div>
    </div>
  );
}
