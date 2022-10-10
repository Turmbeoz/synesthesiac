import phaserGlow from '../assets/phaserGlow.png';
import Bubbler from './Bubbler';
import Lightning from './LightningComponent';
import { useState, useEffect, useContext } from "react";
import { WeaponAndShipContext } from '../gameInfo/gameContext';






function LetterButtonSquare(props){
    let shooter;
    const active = '#CACACA';
    const inactive = '#090909';
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext);
    const { note, colorCSS, gray } = props;
    const [buttonsState, setButtonState] = useState({currColor: '#CACACA'})
    const [weaponStateLetter, setWeaponStateLetter] = useState({
        wubblesI:[]
    })
    const cssEffect = useEffect(()=>{
        console.log("HUH")
    }, [buttonsState])

    function shoot(e){
        console.log('Shoot that mofo!!!');
        console.log(e.touches);
        console.log(weaponShipObj.tempEvent);
        // Uncomment later after passing the active or not prop for the buttons
        if (!props.active){
            return;
        }
        const screenHeight = window.screen.height;
        if (e.touches.length > 1){
            e.preventDefault();
        }
        console.log("They aint listenen")
        let hexValForLightnin = '#CACACA';
        const theysListenin = (weaponShipObj.newAlienObj.listening && note === weaponShipObj.newAlienObj.listening);
        if (theysListenin){
            console.log("Theys the same!!");
            setButtonState({currColor: props.colorCSS.hex});
            // INSERT THE NEW LIGHTNING PROP HERE 10/05/22
            hexValForLightnin = props.colorCSS.hex;

        }else{
            setButtonState({currColor: '#CACACA'});
        }
        const wubbles = (<Bubbler key={'00'} hex={theysListenin? props.colorCSS.hex : "#CACACA"}></Bubbler>);

        // 10/6 Create the timeout that the lightning will take up. It's brightness flickering randomly.
        const aSqr = (weaponShipObj.tempEvent[0].clientY - e.touches[0].clientY).toFixed(0);
        const bSqr = (weaponShipObj.tempEvent[0].clientX - e.touches[0].clientX).toFixed(0);
        const indexVal = weaponShipObj.tempEvent[0].target.id.split('alienKey')[0];
        const leftVal = weaponShipObj.newAlienObj[indexVal].left;
        const lettButtXVal = e.touches[0].clientX;
        const lightnin = (<Lightning xVal={leftVal} yVal={'Y'} note={note} lettButtXVal={lettButtXVal} cssFilter={colorCSS.cssFilter} hex={'#CACACA'} aSqr={aSqr} bSqr={bSqr} ></Lightning>);
        setWeaponStateLetter({...weaponStateLetter, wubblesI: [wubbles, lightnin]})
        setTimeout(()=>{
            setWeaponStateLetter({...weaponStateLetter, wubblesI: []})
        },500)
    
    }
    function shootEnd(e){
        if (!props.active){
            return;
        }
        setTimeout(()=>{
            // const active = props.colorCSS.hex;
            // const inactive = props.gray.hex; 
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
// invert(99%) sepia(80%) saturate(77%) hue-rotate(228deg) brightness(114%) contrast(96%)