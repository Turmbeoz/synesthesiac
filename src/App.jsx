import './App.css';
import earth from '../src/assets/earthgrayscaled.png';
import starsBackground from '../src/assets/starsbackground.png';
import starsForeground from '../src/assets/starsForeground1.png';
import WeaponSelector from './gameComponents/WeaponSelect.jsx'
import { useState } from 'react';
import  { WeaponAndShipContext } from '../src/gameInfo/gameContext'
import notesCSSandData from './gameInfo/notesCSSandData.js';
import keys from './gameInfo/keys';
import { useLocation } from 'react-router-dom';


function App() {
  const locate = useLocation()
  const screenHeight = ((window.screen.height) / 7);
  const { chords } = keys;
  // const AbuttonCenter = -125;
  const bubbleCenterArr = [];
  const currentKey = locate.state.todayNotes.notes;
  const numOfVillains = 20;
  if ("vibrate" in navigator){
    navigator.vibrate(500)
  }
  
  // Arrray of note objects.One eaach shows up and we'll add 10 or so random from the list to make it longer
  // const villainKeyNotesArr = Array(numOfVillains).fill(keys.Ckey[0]);
  const villainKeyNotesArr = [...locate.state.todayNotes.notes] //.sort(() => Math.random() - 0.5);;
  const remainVillains = numOfVillains - villainKeyNotesArr.length;
  for (let i=0; i<remainVillains; i++){
    villainKeyNotesArr.push(currentKey[Math.floor(Math.random()*currentKey.length)])
  }
  const villainXposition = Array.from({length: numOfVillains}, () => Math.floor(Math.random() * 90))
  // final array of villain components
  const villainsShipsArr = [];
  const newAlienObj = { listening: null, droneLandsAndExplodes: null };
  for (let i=0; i<numOfVillains; i++){
    newAlienObj[i] = {  left: villainXposition[i], note: villainKeyNotesArr[i].stringVer, gray: notesCSSandData.defaultGray.hex, color: villainKeyNotesArr[i].cssFilter, key: i + 'alienKey', keyId: i + 'alienKeyID', index: i, touched: false, idle: false, spinsSeconds: 4, listeningHold: false, struck: null, exploder: villainKeyNotesArr[i].exploder, listenerMP3: villainKeyNotesArr[i].listenerMP3, explodeAudio: villainKeyNotesArr[i].explodeAudio }
  }
  const buttonAlternates = {
    "A": { sharp: notesCSSandData.aSharpBFlat, flat: notesCSSandData.gSharpAflat },
    "B": { sharp: null, flat: notesCSSandData.aSharpBFlat},
    "C": { sharp: notesCSSandData.cSharpDflat, flat: null },
    "D": { sharp: notesCSSandData.dSharpEflat, flat: notesCSSandData.cSharpDflat },
    "E": { sharp: null, flat: notesCSSandData.dSharpEflat },
    "F": { sharp: notesCSSandData.fSharpGflat, flat: null },
    "G": { sharp: notesCSSandData.gSharpAflat, flat: notesCSSandData.fSharpGflat },
    noteChangersAudio: notesCSSandData.noteChangers
  }
  const [weaponShipObj, setWeaponShipObj] = useState({ deadOrDestroyedIDs: new Set(), newAlienObj: newAlienObj, numOfVillains: numOfVillains, tempEvent: null, lightningCom: null, buttonAlternates: buttonAlternates });
  return (
    <div className="wrapper" id='canvas'>
      <canvas id='c'></canvas>
      <WeaponAndShipContext.Provider value={{ weaponShipObj, setWeaponShipObj }}>
      <WeaponSelector notes={keys.Ckey} bubbleCssPos={bubbleCenterArr} buttonBools={locate.state.todayNotes.buttonBools}/>
      </WeaponAndShipContext.Provider>
        <div className='header'>
              <img src={earth} className="earth" alt="earth" />
              <img src={starsForeground} className="starsfg"  alt="starsfg" />
        </div>
    <div className='bgstatic'>
      <img src={starsBackground}  bgproperties="fixed"  alt="cracks" />

    </div>
    </div>
  );
}

export default App;




