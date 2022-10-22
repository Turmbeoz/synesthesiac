import phaserGlow from '../assets/phaserGlow.png';
import Bubbler from './Bubbler';
import Lightning from './LightningComponent';
import { useState, useEffect, useContext } from "react";
import { WeaponAndShipContext } from '../gameInfo/gameContext';
import lightninBW from '../assets/lightning_colors/lightninBOTHENDSBW.png'




function LetterButtonSquare(props){
    let shooter;
    const active = '#CACACA';
    const inactive = '#090909';
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext);
    const { newAlienObj } = weaponShipObj;
    const { note, colorCSS, gray, png } = props;
    const [buttonsState, setButtonState] = useState({currColor: '#CACACA'})
    const [weaponStateLetter, setWeaponStateLetter] = useState({
        wubblesI:[]
    })
    const cssEffect = useEffect(()=>{
    }, [buttonsState])

    function shoot(e){

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
        const lightnin = (<Lightning png={theysListenin? png : lightninBW} xVal={leftVal} yVal={'Y'} note={note} lettButtXVal={lettButtXVal} cssFilter={colorCSS.cssFilter} hex={'#CACACA'} aSqr={aSqr} bSqr={bSqr} ></Lightning>);
        setWeaponStateLetter({...weaponStateLetter, wubblesI: [wubbles, lightnin]})
        setTimeout(()=>{
            setWeaponStateLetter({...weaponStateLetter, wubblesI: []})
        }, 600)
    
    }
    function shootEnd(e){
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
    return (
        
        <div className="letterbutton" onTouchStart={(e)=> shoot(e)} onTouchEnd={(e)=> shootEnd(e)}>
            {weaponStateLetter.wubblesI}
            
            <h1 className='buttonTEXT' style={{
                height: '90%',
                marginTop: '30%',
                filter: "blur(0.5px)",
                color: buttonsState.currColor,
                'WebkitAnimation': 'flickerletter 8s infinite',
                'MozAnimation': 'flickerletter 8s infinite',
                'animation': 'flickerletter 8s infinite' 
                }}>{props.note}
            </h1>    
            
        </div>
        
       
    )
}


export default LetterButtonSquare;
