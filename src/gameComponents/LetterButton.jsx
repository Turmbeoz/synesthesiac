import phaserGlow from '../assets/phaserGlow.png';
import Bubbler from './Bubbler';

import { useState } from "react";

// 8/18 - animate the weapon firing, if the note is the same, then color it. If not, leave it b/w
function LetterButtonSquare(props){
    let shooter;
    const { villainsShips } = props;
    const [buttonsState, setButtonState] = useState({invert: 93, sepia: 2, saturate: 21, hueRotate: 314, brightness: 94, contrast: 90});
    const [weaponStateLetter, setWeaponStateLetter] = useState({
        a: false,
        b: false,
        c: false,
        d: false,
        e: false,
        f: false,
        g: false
    
    })

    
    // 8/14/2022 - alter event listeners so we are getting the right actions
    function trigger() {
        const el = document.getElementById("canvas");
        el.addEventListener("touchstart", shoot, false);
        // el.addEventListener("touchend", handleTouchEnd, false);
        // el.addEventListener("touchcancel", handleTouch, false);
        // el.addEventListener("touchmove", handleTouchMove, false);
      }
      document.addEventListener("DOMContentLoaded", trigger);
    function shoot(){
        console.log('Shoot that mofo!!!');
    
    }
    return (
        
        <div className="letterbutton" onTouchStart={() => shoot()}>
            <img src={props.image} className="abcdefg" 
                    style={{
                    filter: `invert(${props.cssFilter.invert}%) sepia(${props.cssFilter.sepia}%) saturate(${props.cssFilter.saturate}%) hue-rotate(${props.cssFilter.hueRotate}deg) brightness(${props.cssFilter.brightness}%) contrast(${props.cssFilter.contrast}%)`,
                    opacity: '75%',
                    height: '90%',
                    touchAction: 'none',
                    pointerEvents: 'none',
                    marginTop: '5%',
                    }}
                    alt="let" />
        </div>
        
       
    )
}


export default LetterButtonSquare;
// invert(99%) sepia(80%) saturate(77%) hue-rotate(228deg) brightness(114%) contrast(96%)