import lightningBW from '../assets/lightningBW.png';
import lightyBoy from '../assets/lightBoy.png';
// const light = require('../gameInfo/lightningREAL.js');
// import { Lightning } from '../gameInfo/lightningREAL';
import lightNIN from '../assets/lightninBOTHENDSBW.png'
function LightningComponent(props){
    // x , y , hexColor
    const { hex, lineLength, aSqr, bSqr, xVal, lettButtXVal, note, cssFilter } = props;
    console.log("We LIGHTNIN!!!!!");
    // Rootline is the height of the lightning in px
    const rootLine = (Math.sqrt((aSqr*aSqr)+(bSqr*bSqr))*1.08).toFixed(0);
    const sinAng = bSqr / aSqr;
    const offset = (((rootLine/2) / window.screen.width)*100).toFixed(0);
    const percentLeft = (((lettButtXVal - offset) / window.screen.width)*100).toFixed(0);
    console.log(rootLine, offset, percentLeft)
    const width = (window.screen.width / 7).toFixed(0);
    const leftCSS = { 'A': 0.5, 'B': 1.5, 'C': 2.5, 'D': 3.5, 'E': 4.5, 'F': 5.5, 'G': 6.5 }
    const finalLeftPos = (leftCSS[note]*width) - (rootLine /2);
    console.log("finalLeftCss Guess: "+ finalLeftPos)
    var ang = (Math.atan2(aSqr, bSqr) * 180 / Math.PI)+90;

    const lightLeft = ((finalLeftPos / window.screen.width)*100).toFixed(0);
    return  <div >
 
    <img src={lightNIN} style={{
                height: rootLine +'px',
                bottom: '6%',        
                opacity: "15%",
                left: finalLeftPos+'px',
                transform: `rotate(${ang}deg)`,
                transformOrigin: "bottom center",
                color: hex,
                position: 'fixed',
                transition: 'all ease',
                'WebkitAnimation': 'flickerletter 0.75s infinite',
                'MozAnimation': 'flickerletter 0.75s infinite',
                'animation': 'flickerletter 0.75s infinite' 
                }} alt="Colored Lightning"/>
        
    </div>
}


//                rotate: ang+"deg",    transform: `rotate(${ang}deg)`,



export default LightningComponent;