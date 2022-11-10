// const light = require('../gameInfo/lightningREAL.js');
// import { Lightning } from '../gameInfo/lightningREAL';
function LightningComponent(props){
    // x , y , hexColor
    const { hex, lineLength, aSqr, bSqr, xVal, lettButtXVal, note, png } = props;
    // Rootline is the height of the lightning in px
    const rootLine = (Math.sqrt((aSqr*aSqr)+(bSqr*bSqr))*1.08).toFixed(0);
    const width = (window.screen.width / 7).toFixed(0);
    const leftCSS = { 'A': 0.5, 'B': 1.5, 'C': 2.5, 'D': 3.5, 'E': 4.5, 'F': 5.5, 'G': 6.5 }
    const finalLeftPos = (leftCSS[note]*width) - (rootLine /2);
    var ang = (Math.atan2(aSqr, bSqr) * 180 / Math.PI)+90;
    const flipLightObj = { 0: "", 1: " scaleX(-1)" }
    const lightLeft = ((finalLeftPos / window.screen.width)*100).toFixed(0);
    return  <div >
 
    <img src={png} style={{
                pointerEvents: "none",
                height: rootLine +'px',
                bottom: '6%',        
                opacity: "95%",
                left: finalLeftPos+'px',
                transform: `rotate(${ang}deg) ${flipLightObj[Math.floor(Math.random()*2)]}`,
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