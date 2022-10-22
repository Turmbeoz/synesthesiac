import LetterButtonSquare from './LetterButton';
import Bubbler from './Bubbler';
import { useState, useContext, useRef } from 'react';
import { WeaponAndShipContext } from '../gameInfo/gameContext';
import useInterval from '../gameInfo/useInterval';
import Alienship from './Alienship';
import notesCSSandData from '../gameInfo/notesCSSandData';


function WeaponSelector(props){
    const { bubbleCssPos, notes } = props;
    const buttonWidth = window.screen.width / 7;
    // useContext hook for communication between ship and cannon
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext);
    const { newAlienObj, numOfVillains } = weaponShipObj;
    // Save note and state of ship being listened to.
    const screenHeight = window.screen.height;
    // const weaponButtonRef = useRef({
    //     0: {colorCSS: notes[0], active: true, image: A, }
    // })
    const [weaponArray, setWeaponArray] = useState({ arr: [] });
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
    const interValue = useInterval(runTheInterval, 4000);
    const liveOnScreenNEW = [];
    for (let i=slice.left; i<slice.right; i++){
        const newGuy = <Alienship exploder={newAlienObj[i].exploder} left={ newAlienObj[i].left } note={ newAlienObj[i].note } gray={ newAlienObj[i].gray } color={ newAlienObj[i].color } key={ i + 'alienKey' } keyId={ i + 'alienKeyID' } index={newAlienObj[i].index} idle={newAlienObj[i].idle} touched={newAlienObj[i].touched} listeningHold={newAlienObj[i].listeningHold} hitNotDead={newAlienObj[i].hitNotDead}></Alienship>
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
            {weaponArray.arr}
        <div className="shipmetal" >
        {weaponSreadArray}
        </div>
        
        </>
    )
}


export default WeaponSelector;

