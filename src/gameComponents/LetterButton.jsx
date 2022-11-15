import phaserGlow from '../assets/phaserGlow.png';
import Bubbler from './Bubbler';
import Lightning from './LightningComponent';
import { useState, useEffect, useContext, useRef } from "react";
import { WeaponAndShipContext } from '../gameInfo/gameContext';
import lightninBW from '../assets/lightning_colors/lightninBOTHENDSBW.png'
import { NoteBadgeSelect } from './NoteBadgeSelect';
import ReactHowler from 'react-howler'


function LetterButtonSquare(props){
    let shooter;
    const active = '#CACACA';
    const inactive = '#090909';
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext);
    const { newAlienObj, buttonAlternates } = weaponShipObj;
    const { note, colorCSS, gray, png, noteChangeAudio } = props;
    const [buttonsState, setButtonState] = useState({currColor: props.active? active : inactive })
    const [weaponStateLetter, setWeaponStateLetter] = useState({
        wubblesI:[]
    })
    const [lightninState, setLightninState] = useState({lightnin: null})
    const [noteModifier, setNoteModifier] = useState(null)
    const [explosionSound, setExplosionSound] = useState(null)
    const [noteChangeSound, setNoteChangeSound] = useState(null)
    const timerRef = useRef();
    const isLongPress = useRef(false);
    const closeSharpFlatSelect = useRef();
    
    const isHoldingNoteKey = useRef();
    const isHoldingNoteKeyTimeout = useRef();

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
        return setNoteModifier(<NoteBadgeSelect noteChangeAudio={noteChangeAudio} buttonNoteInfo={buttonNoteInfo} classNAME={`btn-sharp-flat`} natural={colorCSS} flat={buttonAlternates[note].flat} noteButtonStr={note} sharp={buttonAlternates[note].sharp} />)
    }
    function noteModifierFuncOFF(e){
        const x = ["♭", "#", "♮"];
        let xxx = {color: "CACACA"}
        const { noteChangersAudio } = buttonAlternates
        console.log(noteChangersAudio)
        // ADD SOUNDS HERE for approx 500ms - all three ways - the sound of switching cannons - note change AUDIO here too
        if (e.target.outerText === "♮"){
            xxx = {color: buttonNoteInfo.active.hex}
            setNoteChangeSound(<ReactHowler src={noteChangersAudio[buttonNoteInfo.active.stringVer]} seek={0} playing={true} html5={true} preload={true} volume={0.25}/>)
            setButtonState({ currColor: colorCSS.hex })
            setButtonNoteInfo({ active: colorCSS, left: buttonAlternates[note].flat, right: buttonAlternates[note].sharp, symbols: ["♮", "♭", "#"]});
            
        }
        if (e.target.outerText === "♭"){
            xxx = {color: buttonNoteInfo.left.hex}
            setNoteChangeSound(<ReactHowler src={noteChangersAudio[buttonNoteInfo.left.stringVer]} seek={0} playing={true} html5={true} preload={true} volume={0.25}/>)
            setButtonState({ currColor: buttonAlternates[note].flat.hex })
            setButtonNoteInfo({ active: buttonAlternates[note].flat, left: colorCSS, right: buttonAlternates[note].sharp, symbols: ["♭", "♮", "#"] });
            
        }
        if (e.target.outerText === "#"){
            xxx = {color: buttonNoteInfo.right.hex}
            setNoteChangeSound(<ReactHowler src={noteChangersAudio[buttonNoteInfo.right.stringVer]} seek={0} playing={true} html5={true} preload={true} volume={0.25}/>)
            setButtonState({ currColor: buttonAlternates[note].sharp.hex })
            setButtonNoteInfo({ active: buttonAlternates[note].sharp, left: buttonAlternates[note].flat, right: colorCSS, symbols: ["#", "♭", "♮"] })
            
        }
        
        setNoteModifier(<NoteBadgeSelect stylesP={xxx} buttonNoteInfo={buttonNoteInfo} classNAME={`btn-sharp-flat`} natural={colorCSS} flat={buttonAlternates[note].flat} noteButtonStr={note} sharp={buttonAlternates[note].sharp}/>)
        // add into a setTimeout() for a small delay to the close
        setTimeout(() =>{
            setButtonState({ currColor: "#CACACA" })
            setNoteModifier(null)
        }, 500)
        return setNoteModifier(<NoteBadgeSelect buttonNoteInfo={buttonNoteInfo} classNAME={`btn-sharp-flat`} natural={colorCSS} flat={buttonAlternates[note].flat} noteButtonStr={note} sharp={buttonAlternates[note].sharp}/>)

    }
    function shoot(e){
        console.log("SHOOTIN")
        if (e.target.className === "btn-sharp-flatL" || e.target.className === "btn-sharp-flatR") {
            noteModifierFuncOFF(e);
            return;
        }
        // Uncomment later after passing the active or not prop for the buttons
        if (!props.active){
            return;
        }
        
        if (e.touches.length > 1){
            e.preventDefault();
        }

        const handlerShootOrHold = () => {
            const wubbles = (<Bubbler key={'00'} hex={"#CACACA"}></Bubbler>);
            setWeaponStateLetter({...weaponStateLetter, wubblesI: wubbles});

            if (!isLongPress.current){
                isHoldingNoteKey.current = true
                timerRef.current = setTimeout(() => {
                    noteModifierFunc();
                    isLongPress.current = false;
                    isHoldingNoteKey.current = false
                }, 600)
            }
            setTimeout(()=>{
                setWeaponStateLetter({ ...weaponStateLetter, wubblesI: null })
            }, 600)
        }

        handlerShootOrHold();
        // if (!isHoldingNoteKey.current){
        //     isHoldingNoteKeyTimeout.current = setTimeout(() => {
                
        //     }, 5);
        // }
    
    }
    function shootMove(e){
        clearTimeout(isHoldingNoteKeyTimeout.current)
        console.log("move that body")
        return
    }
    function shootEnd(e){
        clearTimeout(isHoldingNoteKeyTimeout.current)
        clearTimeout(timerRef.current)
        if (!props.active){
            return;
        }

        const handlerLightnin = () => {
            const indexVal = weaponShipObj.tempEvent[0].target.id.split('alienKey')[0];
            const theysListenin = (newAlienObj.listening && buttonNoteInfo.active.stringVer === newAlienObj.listening);
            if (theysListenin){
                setButtonState({currColor: buttonNoteInfo.active.hex });
                newAlienObj[indexVal].struck = "DESTROYED";
                setExplosionSound(<ReactHowler  src={newAlienObj[indexVal].explodeAudio} seek={0} playing={true} html5={true} preload={true} volume={0.55}/>
                ) 
                setTimeout(() => {
                    newAlienObj[indexVal].removeFromScreen = true
                }, 900)
                
                setWeaponShipObj({...weaponShipObj, newAlienObj: {...newAlienObj, indexVal: {...newAlienObj[indexVal] }}});
                setTimeout(()=>{
                    setButtonState({ currColor: "#CACACA" });
                }, 600)
    
            }else{
                newAlienObj[indexVal].struck = "MISSED"
                setWeaponShipObj({...weaponShipObj, newAlienObj: {...newAlienObj, indexVal: {...newAlienObj[indexVal] }}})
                
            }
    
            const wubbles = (<Bubbler key={'00'} hex={theysListenin? buttonNoteInfo.active.stringVer : "#CACACA"}></Bubbler>);
    
            const aSqr = (weaponShipObj.tempEvent[0].clientY - e.changedTouches[0].clientY).toFixed(0);
            const bSqr = (weaponShipObj.tempEvent[0].clientX - e.changedTouches[0].clientX).toFixed(0);
            setTimeout(()=>{
                const active = '#CACACA';
                const inactive = '#090909';
                const cssStat = props.active? active : inactive
                setButtonState({ currColor: cssStat })
        
            }, 500)
            const leftVal = weaponShipObj.newAlienObj[indexVal].left;
            const lettButtXVal = e.changedTouches[0].clientX;
            const lightnin = (<Lightning png={theysListenin? buttonNoteInfo.active.png : lightninBW} xVal={leftVal} yVal={'Y'} note={note} lettButtXVal={lettButtXVal} hex={'#CACACA'} aSqr={aSqr} bSqr={bSqr} ></Lightning>);
            setLightninState({lightnin: lightnin})
            setWeaponStateLetter({ wubblesI: wubbles })
            setTimeout(()=>{
                setLightninState({lightnin: null})
                setWeaponStateLetter({ wubblesI: null })
            }, 600)


    
        }
        if(isHoldingNoteKey.current === true){
            handlerLightnin();
        }
        


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
    return (
        
        <div ref={closeSharpFlatSelect} className="letterbutton" onTouchStart={(e)=> shoot(e)} onTouchMove={()=> shootMove()} onTouchEnd={(e)=> shootEnd(e)}>
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
            {lightninState.lightnin}
            {explosionSound}
            {noteChangeSound}
        </div>
        
       
    )
}


export default LetterButtonSquare;
