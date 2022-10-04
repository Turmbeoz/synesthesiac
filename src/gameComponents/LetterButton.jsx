import phaserGlow from '../assets/phaserGlow.png';
import Bubbler from './Bubbler';
import { useState, useEffect, useContext } from "react";
import { WeaponAndShipContext } from '../gameInfo/gameContext';


// 8/18 - animate the weapon firing, if the note is the same, then color it. If not, leave it b/w
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

        // Uncomment later after passing the active or not prop for the buttons
        if (!props.active){
            return;
        }
        const screenHeight = window.screen.height;
        if (e.touches.length > 1){
            e.preventDefault();
        }
        console.log("They aint listenen")

        const theysListenin = (weaponShipObj.newAlienObj.listening && note === weaponShipObj.newAlienObj.listening);
        console.log(theysListenin)
        if (theysListenin){
            console.log("Theys the same!!");
            setButtonState({currColor: props.colorCSS.hex});
            console.log(buttonsState);

        }else{
            setButtonState({currColor: '#CACACA'});
        }
        const wubbles = (<Bubbler key={'00'} hex={theysListenin? props.colorCSS.hex : "#CACACA"}></Bubbler>);

        setWeaponStateLetter({...weaponStateLetter, wubblesI: [wubbles]})
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