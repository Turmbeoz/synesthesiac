import './App.css';
import earth from '../src/assets/earthgrayscaled.png';
import starsBackground from '../src/assets/starsbackground.png';
import starsForeground from '../src/assets/starsForeground1.png';
import WeaponSelector from './gameComponents/WeaponSelect.jsx'
import { useState } from 'react';
import  { WeaponAndShipContext } from '../src/gameInfo/gameContext'
import notesCSSandData from './gameInfo/notesCSSandData.js';
import keys from './gameInfo/keys';

// const villainsShipsOLD = [<Alienship left={25} key={'0'} keyId={'0'} note={'A'}></Alienship>]

function App() {
  const buttonWidth = ((window.screen.width) / 7).toFixed(2);
  const AbuttonCenter = -125;
  const bubbleCenterArr = [];
  for (let i=0; i<7; i++){
    let num = (((AbuttonCenter + buttonWidth*i) / window.screen.width)*100).toFixed(2);
    bubbleCenterArr.push(num);
  }
  // Arrray of note objects.One eaach shows up and we'll add 10 or so random from the list to make it longer
  // const villainKeyNotesArr = [...keys.Ckey];
  // final array of villain components
  const villainsShipsArr = [];
  const [weaponShipObj, setWeaponShipObj] = useState({lockedOn: null, villainsShipsArr: villainsShipsArr, buttonPressed:  {'A': false, 'B': false, 'C': false, 'D': false, 'E': false, 'F': false, 'G': false }});

  return (
    <div className="wrapper" id='canvas'>
      <WeaponAndShipContext.Provider value={{weaponShipObj, setWeaponShipObj}}>
      <WeaponSelector notes={notesCSSandData} bubbleCssPos={bubbleCenterArr}/>
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




