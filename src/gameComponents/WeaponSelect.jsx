import LetterButtonSquare from './LetterButton';
import A from '../assets/A.png';
import Asvg from '../assets/A.svg'
// import Ared from '../assets/Ared.png';
import B from '../assets/B.png';
import C from '../assets/C.png';
import D from '../assets/D.png';
import E from '../assets/E.png';
import F from '../assets/F.png';
import G from '../assets/G.png';
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
    const [slice, setSlice] = useState({ left: 0, right: 1 })
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
        const newGuy = <Alienship left={ newAlienObj[i].left } note={ newAlienObj[i].note } gray={ newAlienObj[i].gray } color={ newAlienObj[i].color } key={ i + 'alienKey' } keyId={ i + 'alienKeyID' } index={newAlienObj[i].index} idle={newAlienObj[i].idle} touched={newAlienObj[i].touched} listeningHold={newAlienObj[i].listeningHold} ></Alienship>
        liveOnScreenNEW.push(newGuy)
    }
    const keyShift = [true, true, true, true, true, true, true];
    const activeGray = '#CACACA';
    const inactiveGray = '#090909';
    const tempNOTES = { 0:'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G'};
    const tempIMG = [A,B,C,D,E,F,G]
    const weaponSreadArray = [];
    for (let i=0; i<7; i++){
        // Create LBS dynamically
        const letterButton = <LetterButtonSquare active={ keyShift[i] } note={ tempNOTES[i] } gray={keyShift[i]? activeGray : inactiveGray} colorCSS={notes[i]} delay={2500} listening={newAlienObj.listening} key={notes[i].stringVer+'lbs'}/>
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



// A RED filter: invert(14%) sepia(83%) saturate(7052%) hue-rotate(359deg) brightness(92%) contrast(118%);   #ff0000

// A# Bb Red-Orange filter: invert(40%) sepia(76%) saturate(4805%) hue-rotate(360deg) brightness(100%) contrast(107%); #ff4500

// B Orange filter: invert(67%) sepia(38%) saturate(2827%) hue-rotate(359deg) brightness(101%) contrast(107%); #ffa500

// C Yellow-Orange filter: invert(75%) sepia(76%) saturate(675%) hue-rotate(325deg) brightness(101%) contrast(101%);  #ffae42

// C# Db Yellow filter: invert(88%) sepia(58%) saturate(765%) hue-rotate(1deg) brightness(106%) contrast(104%); #ffff00

// D Yellow-Green filter: invert(72%) sepia(8%) saturate(3195%) hue-rotate(38deg) brightness(101%) contrast(91%);  #9acd32

// D# Eb Green filter: invert(22%) sepia(96%) saturate(2118%) hue-rotate(99deg) brightness(101%) contrast(103%);  #008000

// E Blue-Green filter: invert(58%) sepia(61%) saturate(3754%) hue-rotate(137deg) brightness(99%) contrast(91%); #0cbaa6

// F Blue filter: invert(10%) sepia(100%) saturate(5057%) hue-rotate(244deg) brightness(99%) contrast(147%); #0000ff

// F# Gb Blue-Violet filter: invert(19%) sepia(91%) saturate(4530%) hue-rotate(269deg) brightness(93%) contrast(91%); #8a2be2

// G Violet filter: invert(72%) sepia(51%) saturate(1190%) hue-rotate(239deg) brightness(96%) contrast(95%);  #ee82ee

// G# Ab Purple filter: invert(6%) sepia(94%) saturate(6084%) hue-rotate(298deg) brightness(114%) contrast(104%); #800080