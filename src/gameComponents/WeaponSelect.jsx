import LetterButtonSquare from './LetterButton';
import Alienship from './Alienship';
import A from '../assets/A.png';
import B from '../assets/B.png';
import C from '../assets/C.png';
import D from '../assets/D.png';
import E from '../assets/E.png';
import F from '../assets/F.png';
import G from '../assets/G.png';
import Bubbler from './Bubbler';
import { useState, useContext } from 'react';
import { WeaponAndShipContext } from '../gameInfo/gameContext'

function WeaponSelector(props){
    const { bubbleCssPos, notes, aliensArray } = props;
    const buttonWidth = window.screen.width / 7;
    // Save note and state of ship being listened to.
    const buttonObj = { 0: buttonWidth, 1: buttonWidth*2, 2: buttonWidth*3, 3: buttonWidth*4, 4: buttonWidth*5, 5: buttonWidth*6, 6:buttonWidth*7 };
    const screenHeight = window.screen.height;
    const [onScreenVillains, setOnScreenVillains] = useState({active: [aliensArray[0]], wholeList: aliensArray})
    const [weaponArray, setWeaponArray] = useState({arr: []});
    const [colorState, setColorState] = useState({
        a: {invert: 93, sepia: 2, saturate: 21, hueRotate: 314, brightness: 94, contrast: 90},
        b: {invert: 18, sepia: 6, saturate: 23, hueRotate: 14, brightness: 94, contrast: 96},
        c: {invert: 93, sepia: 2, saturate: 21, hueRotate: 314, brightness: 94, contrast: 90},
        d: {invert: 18, sepia: 6, saturate: 23, hueRotate: 14, brightness: 94, contrast: 96},
        e: {invert: 93, sepia: 2, saturate: 21, hueRotate: 314, brightness: 94, contrast: 90},
        f: {invert: 18, sepia: 6, saturate: 23, hueRotate: 14, brightness: 94, contrast: 96},
        g: {invert: 18, sepia: 6, saturate: 23, hueRotate: 14, brightness: 94, contrast: 96}
    });
    // useContext hook for communication between ship and cannon
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext);
    function weaponBoard() {
        const el = document.getElementById("canvas");
        el.addEventListener("touchstart", weaponTap, false);
        // el.addEventListener("touchend", handleTouchEnd, false);
        // el.addEventListener("touchcancel", handleTouch, false);
        // el.addEventListener("touchmove", handleTouchMove, false);
      }
    document.addEventListener("DOMContentLoaded", weaponBoard);
    function weaponTap(e){
        if (e.touches.length > 1){
            e.preventDefault()
            // IS the new touch in the A (or watever letter) button? Do something!!
        }
        console.log("WEAPON LEVEL")
        console.log(weaponShipObj);
        // If weapon is pressed, and note is correct - set the letter's state and then run func
        for (let i=0; i<e.changedTouches.length; i++){
            const touch = e.changedTouches[i];
            console.log(touch);
            const height = (touch.clientY / screenHeight).toFixed(2);
            // 92% is the bottom margin for the weapon select. We changed it cause on actual touch it needs to be 75%
            const nineTwo = 0.75;
            if (height >= nineTwo){
                // if listening hold === true and note === same then do the thing 
                // We are inside the weapon terminal!! Add switch type statement for note color change
                const styles = {
                    touchAction: 'none',
                    opacity: 95,
                    pointerEvents: 'none',
                    bottom: '-20%',
                    position: 'fixed',
                    filter: `invert(${notes.defaultGray.cssFilter.invert}%) sepia(${notes.defaultGray.cssFilter.sepia}%) saturate(${notes.defaultGray.cssFilter.saturate}%) hue-rotate(${notes.defaultGray.cssFilter.hueRotate}deg) brightness(${notes.defaultGray.cssFilter.brightness}%) contrast(${notes.defaultGray.cssFilter.contrast}%)`
                    }
                if (touch.clientX < buttonObj[0]){
                    // A is pressed - Create functions to phase in a color!!!
                    console.log('AAAAA');
                    styles.left = bubbleCssPos[0] + '%';
                    weaponShipObj.buttonPressed['A'] = true;
                    // styles.filter = `invert(${notes.a.cssFilter.invert}%) sepia(${notes.a.cssFilter.sepia}%) saturate(${notes.a.cssFilter.saturate}%) hue-rotate(${notes.a.cssFilter.hueRotate}deg) brightness(${notes.a.cssFilter.brightness}%) contrast(${notes.a.cssFilter.contrast}%)`
                    // styles.opacity = '15%'
                    if (weaponShipObj.lockedOn != null && weaponShipObj.lockedOn.note === 'A'){
                        console.log("INSIDE CSS ALTERER");
                        setColorState({...colorState, a: notes.a.cssFilter})
                        styles.filter = `invert(${notes.a.cssFilter.invert}%) sepia(${notes.a.cssFilter.sepia}%) saturate(${notes.a.cssFilter.saturate}%) hue-rotate(${notes.a.cssFilter.hueRotate}deg) brightness(${notes.a.cssFilter.brightness}%) contrast(${notes.a.cssFilter.contrast}%)`
                            }
                }else if(touch.clientX >= buttonObj[0] && touch.clientX < buttonObj[1]){
                    // B is pressed
                    console.log('BBBBBB');
                    styles.left = bubbleCssPos[1] + '%';
                    weaponShipObj.buttonPressed['B'] = true;
                }else if(touch.clientX >= buttonObj[1] && touch.clientX < buttonObj[2]){
                    // C is pressed
                    console.log('CCCCCC');
                    styles.left = bubbleCssPos[2] + '%';
                    weaponShipObj.buttonPressed['C'] = true;
                }else if(touch.clientX >= buttonObj[2] && touch.clientX < buttonObj[3]){
                    // D is pressed
                    console.log('DDDDDD');
                    styles.left = bubbleCssPos[3] + '%';
                    weaponShipObj.buttonPressed['D'] = true;
                }else if(touch.clientX >= buttonObj[3] && touch.clientX < buttonObj[4]){
                    // E is pressed
                    console.log('EEEEEE');
                    styles.left = bubbleCssPos[4] + '%';
                    weaponShipObj.buttonPressed['E'] = true;
                }else if(touch.clientX >= buttonObj[4] && touch.clientX < buttonObj[5]){
                    // F is pressed
                    console.log('FFFFF');
                    styles.left = bubbleCssPos[5] + '%';
                    weaponShipObj.buttonPressed['F'] = true;
                }else if(touch.clientX >= buttonObj[5] && touch.clientX < buttonObj[6]){
                    // G is pressed
                    console.log('GGGGGG');
                    styles.left = bubbleCssPos[6]-8 + '%';
                    weaponShipObj.buttonPressed['G'] = true;
                    
                }
                setWeaponShipObj({...weaponShipObj});
                const aPhase = [<Bubbler key={'00'} styles={styles}></Bubbler>];
                setWeaponArray({arr: aPhase});

                setTimeout(()=>{
                    setWeaponArray({arr:[]});
                },500)
            }else{
                console.log("ELSE STATEMENT");

            }
        }

    }
    // Filter the array of aliens on screen.
    // const villainsShips = [aliensArray[0], aliensArray[1]];
    const deadList = [...weaponShipObj.deadOrDestroyedIDs]
    function alienArrFilter(alien){
        console.log(alien.key[0])
        for (let i=0; i<deadList.length; i++){
            if (alien.key[0] === deadList[i]){
                console.log("WE HURRRR")
                return false;
            }
        }
        return true
    }
    onScreenVillains.active = onScreenVillains.active.filter(alienArrFilter);
    if (onScreenVillains.active.length < 1){
        onScreenVillains.active.push(onScreenVillains.wholeList.pop())
    }
    console.log("CHECKING IDs for aliens")
    console.log(weaponShipObj.deadOrDestroyedIDs)
    return (
        <>
        
            {onScreenVillains.active}
            {weaponArray.arr}

        <div className="shipmetal" >
            <LetterButtonSquare delay={2500} active={true} note={'A'} image={A} cssFilter={colorState.a} />
            <LetterButtonSquare active={false} note={'B'} image={B} cssFilter={colorState.b}  />
            <LetterButtonSquare active={true} note={'C'} image={C} cssFilter={colorState.c}  />
            <LetterButtonSquare active={false} note={'D'}  image={D} cssFilter={colorState.d}  />
            <LetterButtonSquare active={true} note={'E'} image={E} cssFilter={colorState.e}  />
            <LetterButtonSquare active={false} note={'F'} image={F} cssFilter={colorState.f}  />
            <LetterButtonSquare active={false} note={'G'}  image={G} cssFilter={colorState.g}  />
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