import LetterButtonSquare from './LetterButton';
import Bubbler from './Bubbler';
import { useState, useContext, useEffect } from 'react';
import { WeaponAndShipContext } from '../gameInfo/gameContext';
import ReactHowler from 'react-howler'
import useInterval from '../gameInfo/useInterval';
import Alienship from './Alienship';
import notesCSSandData from '../gameInfo/notesCSSandData';
import cracks1 from '../assets/glass_shatters/broken-glass-effect-transparent-png-11.png'
import cracks2 from '../assets/glass_shatters/cracks.png'
import cracks3 from '../assets/glass_shatters/cracked-glass-effect-png-11552156306eklc2wuros.png'
import backgroundBreathe from "../assets/audio/heartbeat.mp3"
import glassCracks from "../assets/audio/windowsmash.mp3"
function WeaponSelector(props){
    const { bubbleCssPos, notes } = props;
    const buttonWidth = window.screen.width / 7;
    // useContext hook for communication between ship and cannon
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext);
    const { newAlienObj, numOfVillains } = weaponShipObj;
    // Save note and state of ship being listened to.
    const screenHeight = window.screen.height;
    const [glass, setGlass] = useState({ currGlass: null, coeff: 1 })
    const [glassAudio, setGlassAudio] = useState(null)
    const [slice, setSlice] = useState({ left: 0, right: 1 });

    function runTheInterval(){
        const difference = slice.right - slice.left;
        if(slice.right < numOfVillains){
            slice.right += 1;
        }
        if (slice.left < slice.right && difference > 3 && difference < 5){
            slice.left += 1;
        }else if (slice.left < slice.right && slice.right === numOfVillains-1){
            slice.left += 1;
        }
        setSlice(() => {
            return { right: slice.right, left: slice.left }
        })
    }
    const interValue = useInterval(runTheInterval, 6000);
    function makeCracks(){
        let glassShatterJSX = (<img src={cracks3} className="cracks1" style={{
            position: "absolute",
            height: "100%",
            userSelect: "none",
            pointerEvents: "none",
            
               
          }} bgproperties="fixed"  alt="cracks" />);
        setGlassAudio(<ReactHowler src={glassCracks} seek={0} playing={true} html5={true} preload={true} volume={0.02}/>)
        setGlass({currGlass: glassShatterJSX});
        setTimeout(() => {
            setGlass({ currGlass: null })
        }, 3500);
    
    }
    useEffect(() => {
        if (weaponShipObj.droneLandsAndExplodes){
            makeCracks();
            setWeaponShipObj({ ...weaponShipObj, droneLandsAndExplodes: null })
        }else{
            return
        }
    }, [weaponShipObj.droneLandsAndExplodes])


    
    const liveOnScreenNEW = [];
    for (let i=slice.left; i<slice.right; i++){
        const newGuy = newAlienObj[i].removeFromScreen? null : <Alienship listenerMP3={newAlienObj[i].listenerMP3} exploder={newAlienObj[i].exploder} left={ newAlienObj[i].left } note={ newAlienObj[i].note } gray={ newAlienObj[i].gray } color={ newAlienObj[i].color } key={ i + 'alienKey' } keyId={ i + 'alienKeyID' } index={newAlienObj[i].index} idle={newAlienObj[i].idle} touched={newAlienObj[i].touched} listeningHold={newAlienObj[i].listeningHold} hitNotDead={newAlienObj[i].hitNotDead}></Alienship>
        liveOnScreenNEW.push(newGuy)
        
    }
    const keyShift = [true, true, true, true, true, true, true];
    const activeGray = '#CACACA';
    const inactiveGray = '#090909';
    const tempNOTES = { 0:'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G'};
    // const tempIMG = [A,B,C,D,E,F,G]
    const weaponSreadArray = [];
    for (let i=0; i<7; i++){
        // Create LBS dynamically
        const letterButton = <LetterButtonSquare png={notes[i].png} active={ keyShift[i] } note={ tempNOTES[i] } gray={keyShift[i]? activeGray : inactiveGray} colorCSS={notes[i]} delay={2500} listening={newAlienObj.listening} key={notes[i].stringVer+'lbs'} />
        weaponSreadArray.push(letterButton)
    }

    return (
        <>
            {liveOnScreenNEW}
            {glass.currGlass}
        <div className="shipmetal" >
        {weaponSreadArray}
        <ReactHowler loop={true} src={backgroundBreathe} seek={0} playing={true} html5={true} preload={true} volume={0.4}/>
        </div>
        {glassAudio}
        </>
    )
}


export default WeaponSelector;

