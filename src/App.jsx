import './App.css';
import earth from '../src/assets/earthgrayscaled.png';
import starsBackground from '../src/assets/starsbackground.png';
import starsForeground from '../src/assets/starsForeground1.png';
import WeaponSelector from './gameComponents/WeaponSelect.jsx'
import { useState } from 'react';
import  { WeaponAndShipContext } from '../src/gameInfo/gameContext'
import notesCSSandData from './gameInfo/notesCSSandData.js';
import keys from './gameInfo/keys';
import Alienship from './gameComponents/Alienship';
// const villainsShipsOLD = [<Alienship left={25} key={'0'} keyId={'0'} note={'A'}></Alienship>]
const SimplexNoise = require('./gameInfo/simplexNoise.js');
console.log(window.SimplexNoise);
console.log(window.SimplexNoise.prototype.noise2D());
console.log(window.SimplexNoise.prototype.grad3);

function App() {
  const buttonWidth = ((window.screen.width) / 7).toFixed(2);
  const AbuttonCenter = -125;
  const bubbleCenterArr = [];
  const currentKey = keys.Ckey;
  const numOfVillains = 20;
  // const [noise, setNoise] = useState(smplxNs);
  // Arrray of note objects.One eaach shows up and we'll add 10 or so random from the list to make it longer
  // const villainKeyNotesArr = Array(numOfVillains).fill(keys.Ckey[0]);
  const villainKeyNotesArr = [...keys.Ckey] //.sort(() => Math.random() - 0.5);;
  const remainVillains = numOfVillains - villainKeyNotesArr.length;
  for (let i=0; i<remainVillains; i++){
    villainKeyNotesArr.push(currentKey[Math.floor(Math.random()*currentKey.length)])
  }
  const villainXposition = Array.from({length: numOfVillains}, () => Math.floor(Math.random() * 90))
  // final array of villain components
  const villainsShipsArr = [];
  const newAlienObj = { listening: null };
  for (let i=0; i<numOfVillains; i++){
    newAlienObj[i] = { left: villainXposition[i], note: villainKeyNotesArr[i].stringVer, gray: notesCSSandData.defaultGray.hex, color: villainKeyNotesArr[i].cssFilter, key: i + 'alienKey', keyId: i + 'alienKeyID', index: i, touched: false, idle: false, spinsSeconds: 4, listeningHold: false }
  }
  const [weaponShipObj, setWeaponShipObj] = useState({ deadOrDestroyedIDs: new Set(), newAlienObj: newAlienObj, numOfVillains: numOfVillains, tempEvent: null, lightningCom: null });
  return (
    <div className="wrapper" id='canvas'>
      <canvas id='c'></canvas>
      <WeaponAndShipContext.Provider value={{weaponShipObj, setWeaponShipObj}}>
      <WeaponSelector notes={currentKey} aliensArray={weaponShipObj.villainsShipsArr} bubbleCssPos={bubbleCenterArr}/>
      </WeaponAndShipContext.Provider>
        <div className='header'>
              <img src={earth} className="earth" alt="earth" />
              <img src={starsForeground} className="starsfg"  alt="starsfg" />
        </div>
    <div className='bgstatic'>
      <img src={starsBackground} className="starsbg"  bgproperties="fixed"  alt="starsbg" />
      </div>
    </div>
  );
}

export default App;




