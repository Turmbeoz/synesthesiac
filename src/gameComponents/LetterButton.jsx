import phaserGlow from '../assets/phaserGlow.png';
import Bubbler from './Bubbler';
import Lightning from './LightningComponent';
import React, { useState, useEffect, useContext, useRef } from "react";
import { WeaponAndShipContext } from '../gameInfo/gameContext';
import lightninBW from '../assets/lightning_colors/lightninBOTHENDSBW.png'
import { NoteBadgeSelect } from './NoteBadgeSelect';




function LetterButtonSquare(props){
    let shooter;
    const active = '#CACACA';
    const inactive = '#090909';
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext);
    const { newAlienObj, buttonAlternates } = weaponShipObj;
    const { note, colorCSS, gray, png } = props;
    const [buttonsState, setButtonState] = useState({currColor: '#CACACA', 0: colorCSS, 1: buttonAlternates.flat, 2: buttonAlternates.sharp })
    const [weaponStateLetter, setWeaponStateLetter] = useState({
        wubblesI:[]
    })
    const [noteModifier, setNoteModifier] = useState(null)
    const timerRef = useRef();
    const isLongPress = useRef(false);
    const closeSharpFlatSelect = useRef();
    
    useEffect(()=>{
        let handler = (e)=>{

            if(!(closeSharpFlatSelect.current?.contains(e.target))){
                setNoteModifier(null)
              }
            };
        document.addEventListener("touchstart", handler);

        return ()=>{
            document.removeEventListener("touchstart", handler)
        }
    });

    const [buttonNoteInfo, setButtonNoteInfo] = useState({ active: colorCSS, left: buttonAlternates[note].flat, right: buttonAlternates[note].sharp, symbols: ["♮", "♭", "#"] })
    function noteModifierFunc(){
        return setNoteModifier(<NoteBadgeSelect buttonNoteInfo={buttonNoteInfo} classNAME={`btn-sharp-flat`} natural={colorCSS} flat={buttonAlternates[note].flat} noteButtonStr={note} sharp={buttonAlternates[note].sharp} />)
    }
    // console.log(buttonNoteInfo.symbols[0])
    function noteModifierFuncOFF(e){
        console.log(e.target.outerText);
        const x = ["♭", "#", "♮"];
        let xxx = {color: "CACACA"}
        if (e.target.outerText === "♮"){
            let xxx = {color: buttonNoteInfo.active.hex}
            setButtonNoteInfo({ active: colorCSS, left: buttonAlternates[note].flat, right: buttonAlternates[note].sharp, symbols: ["♮", "♭", "#"]})
        }
        if (e.target.outerText === "♭"){
            let xxx = {color: buttonNoteInfo.left.hex}
            setButtonNoteInfo({ active: buttonAlternates[note].flat, left: colorCSS, right: buttonAlternates[note].sharp, symbols: ["♭", "♮", "#"] });
            
        }
        if (e.target.outerText === "#"){
            let xxx = {color: buttonNoteInfo.right.hex}
            setButtonNoteInfo({ active: buttonAlternates[note].sharp, left: buttonAlternates[note].flat, right: colorCSS, symbols: ["#", "♭", "♮"] })
            
        }
        setNoteModifier(<NoteBadgeSelect stylesP={xxx} buttonNoteInfo={buttonNoteInfo} classNAME={`btn-sharp-flat`} natural={colorCSS} flat={buttonAlternates[note].flat} noteButtonStr={note} sharp={buttonAlternates[note].sharp}/>)
        // add into a setTimeout() for a small delay to the close
        setTimeout(() =>{
            setNoteModifier(null)
        }, 400)
        return setNoteModifier(<NoteBadgeSelect buttonNoteInfo={buttonNoteInfo} classNAME={`btn-sharp-flat`} natural={colorCSS} flat={buttonAlternates[note].flat} noteButtonStr={note} sharp={buttonAlternates[note].sharp}/>)

    }
    function shoot(e){
        console.log(props.colorCSS)
        console.log(buttonAlternates[note]);
        console.log(e.target.className);
        if (e.target.className === "btn-sharp-flat") {
            noteModifierFuncOFF(e);
            return
        }
        // Uncomment later after passing the active or not prop for the buttons
        if (!props.active){
            return;
        }
        const screenHeight = window.screen.height;
        const indexVal = weaponShipObj.tempEvent[0].target.id.split('alienKey')[0];
        if (e.touches.length > 1){
            e.preventDefault();
        }
        let hexValForLightnin = '#CACACA';
        const theysListenin = (newAlienObj.listening && note === newAlienObj.listening);
        if (theysListenin){
            setButtonState({currColor: props.colorCSS.hex});
            hexValForLightnin = props.colorCSS.hex;
            newAlienObj[indexVal].struck = "DESTROYED"
            setWeaponShipObj({...weaponShipObj, newAlienObj: {...newAlienObj, indexVal: {...newAlienObj[indexVal] }}})

        }else{
            newAlienObj[indexVal].struck = "MISSED"
            setWeaponShipObj({...weaponShipObj, newAlienObj: {...newAlienObj, indexVal: {...newAlienObj[indexVal] }}})
            setButtonState({currColor: '#CACACA'});
            
        }

        const wubbles = (<Bubbler key={'00'} hex={theysListenin? props.colorCSS.hex : "#CACACA"}></Bubbler>);

        const aSqr = (weaponShipObj.tempEvent[0].clientY - e.touches[0].clientY).toFixed(0);
        const bSqr = (weaponShipObj.tempEvent[0].clientX - e.touches[0].clientX).toFixed(0);
        
        const leftVal = weaponShipObj.newAlienObj[indexVal].left;
        const lettButtXVal = e.touches[0].clientX;
        const lightnin = (<Lightning png={theysListenin? png : lightninBW} xVal={leftVal} yVal={'Y'} note={note} lettButtXVal={lettButtXVal} hex={'#CACACA'} aSqr={aSqr} bSqr={bSqr} ></Lightning>);
        setWeaponStateLetter({...weaponStateLetter, wubblesI: [wubbles, lightnin]})
        setTimeout(()=>{
            setWeaponStateLetter({...weaponStateLetter, wubblesI: []})
        }, 600)
        if (!isLongPress.current){
            timerRef.current = setTimeout(() => {
                noteModifierFunc();
                isLongPress.current = false;
            }, 600)
        }

    
    }
    // function shootMove(e){

    //     return
    // }
    function shootEnd(e){
        clearTimeout(timerRef.current)
        if (!props.active){
            return;
        }
        setTimeout(()=>{

            const active = '#CACACA';
            const inactive = '#090909';
            const cssStat = props.active? active : inactive
            setButtonState({ currColor: cssStat })
    
        }, 500)
    }
    const noteBadge = (buttonNoteInfo.symbols[0] === "♮")? null : (<div className='note-badge' style={{
        position: "absolute",
        height: "25px",
        backgroundColor:"#444",
        color: "white",
        borderRadius: "20%",
        marginLeft: "35px",
        touchAction: "none",
        userSelect: "none",
        pointerEvents: "none",

    }}>{buttonNoteInfo.symbols[0]}</div>)
    // console.log(buttonNoteInfo.active)
    return (
        
        <div ref={closeSharpFlatSelect} className="letterbutton" onTouchStart={(e)=> shoot(e)} onTouchEnd={(e)=> shootEnd(e)}>
            {weaponStateLetter.wubblesI}
            
            <h1 className='buttonTEXT' style={{
                userSelect: "none",
                pointerEvents: "none",
                height: '90%',
                marginTop: '30%',
                filter: "blur(0.5px)",
                color: buttonsState.currColor,
                'WebkitAnimation': 'flickerletter 8s infinite',
                'MozAnimation': 'flickerletter 8s infinite',
                'animation': 'flickerletter 8s infinite' 
                }}>{props.note}
            </h1>    
            {noteModifier}
            {noteBadge}
            
        </div>
        
       
    )
}


export default LetterButtonSquare;
