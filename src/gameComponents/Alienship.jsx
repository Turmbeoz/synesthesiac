// picture of hit ship and size properly
// find and import png of damages to ship - size properly and animate their destructsh
import blackdots from '../assets/blackdots.png'
import '../App.css'
import { useState, useEffect, useContext, useRef } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
import HorizontalFlare from './HorizontalFlare';
import { WeaponAndShipContext } from '../gameInfo/gameContext';
import ReactHowler from 'react-howler'
import Explosion from './Explosion.jsx'
import forceFieldRattleAudio from "../assets/audio/rattleForceFields.mp3"
// Sound Effect from <a href="https://pixabay.com/sound-effects/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=6288">Pixabay</a>

// Add a horizontal glow while you're holding the ship to play the notes any that are in its same y value

// Add a state prop drill for a listeningFlare Component 
function Alienship(props){
    let flare;
    let explosion;
    let ship;
    let glassShatterJSX;
    // Pass the left key in when the ship is created in the parent component
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext);
    const { newAlienObj } = weaponShipObj;
    const deadRef = useRef();
    const listenerRefAudio = useRef(false);
    const [shipState, setShipState] = useState({
        left: props.left,
        top: 94,
        height: 15,
        spinsSeconds: props.spinsSeconds,
        hit: props.hit,
        jumpCoeff: 1.5,
        frameRate: 40,
        touched: props.touched,
        idle: props.idle,
        idleArray: Array.from({ length: 5 }, () => Math.floor(Math.random() * 70)),
        idleCount: 45,
        opacity: 90,
        leftOrRight: Math.random() < 0.5 ? -1 : 1,
        listeningHold: props.listeningHold,
        keyId: props.keyId,
        note: props.note,
        hitNotDead: props.hitNotDead,
    })

    // Alien ship is struck but its the wrong one - ship rattles
    const [rattle, setRattle] = useState({        
        coeff: 1.5,
        adder: 0,
        peaked: false, // will be +1 or -1
        flipper: true,
        mover: 12,
        })
    const [rattleForceField, setRattleForceField] = useState(null)
    function lightningStrike(){
        // The ship is destroyed and a note is played
        shipState.explode = true;
    }
    function hitOrMiss(hitInfo){
        // Combine both hit funcs
        if(!hitInfo){
            return
        }
        if (hitInfo === "MISSED"){
            if (!rattleForceField){
                setRattleForceField(<ReactHowler src={forceFieldRattleAudio} seek={0} playing={true} html5={true} preload={true} volume={0.45}/>)
            }
            nearMiss();
            return
        }
        if (hitInfo === "DESTROYED"){
            lightningStrike();
            return
        }
    }
    function nearMiss(){

            if (rattle.mover <= 0){
                rattle.mover = 12
                setRattle({ ...rattle });
                newAlienObj[props.index].struck = null
                return
            }
            if (rattle.flipper){
                shipState.left += rattle.mover
                rattle.mover -= 0.5;
                rattle.flipper = !rattle.flipper
                setRattle({ ...rattle, mover: rattle.mover })
    
            }else{
                shipState.left -= rattle.mover
                rattle.mover -= 0.5;
                rattle.flipper = !rattle.flipper
                setRattle({ ...rattle, mover: rattle.mover })
            }


    }
    // function playAudio(){
    //     new Audio(cListener).play()
    // }
    function stopAudio(){
        
    }
    function touchVerify(touch){
        const leftVal = ((touch.clientX / window.screen.width)*100).toFixed(1);
        const topVal = ((touch.clientY / window.screen.height)*100).toFixed(1);
        const leftDiff = Math.abs(leftVal - shipState.left);
        const topDiff = Math.abs(topVal - shipState.top);
        const totalDiff  = (leftDiff + topDiff).toFixed(0);
        if (totalDiff < 30){
            return true;
        }
        return false;
    }

    function newTouchStart(e){
        if (e.touches.length > 1){
            e.preventDefault();
        }
        
        weaponShipObj.tempEvent = e.touches;

        let boolChange = false;
        for (let i=0; i<e.touches.length; i++){
            if (touchVerify(e.touches[i])){
                boolChange = true;
            }
        }
        if (boolChange){
            // playAudio();
            const currAlien = newAlienObj[props.index];
            currAlien.touched = true;
            currAlien.idle = true;
            currAlien.listeningHold = true;
            currAlien.spinsSeconds = 1;
            newAlienObj.listening = props.note;
            currAlien.hit = true;
            setWeaponShipObj({ ...weaponShipObj, newAlienObj: { ...newAlienObj, num: currAlien } })
            setShipState({ ...shipState });
            

        }else{
        }

    }

    function newTouchMove(e){
        if (e.touches.length > 1){
            e.preventDefault();
        }
        let stillTouchingBool = false;
        for (let i=0; i<e.touches.length; i++){
            const touch = e.touches[i];
            if (touchVerify(touch)){
                stillTouchingBool = true;
            }
        }
        if (!stillTouchingBool){
            const currAlien = newAlienObj[props.index];
            currAlien.listeningHold = false;
            newAlienObj.listening = null;
            setWeaponShipObj({ ...weaponShipObj, newAlienObj: { ...newAlienObj, num: currAlien } })
            return;
        }
        // MAKE SURE THAT THE TOUCH MOVE IS WORKING AFTER SHOWER
        
    }
    function newTouchEnd(e){
        if(e.touches.length > 1){
            e.preventDefault();
        }

        const currAlien = newAlienObj[props.index];
        currAlien.listeningHold = false;
        setWeaponShipObj({ ...weaponShipObj, newAlienObj: { ...newAlienObj, num: currAlien } });
        

    }
    function explodeInYaFace(){
        // Does damage to player
        if(!(deadRef.current)){
            deadRef.current = true;
            newAlienObj[props.index].struck = "COLLISION";
            setWeaponShipObj({...weaponShipObj, droneLandsAndExplodes: true, newAlienObj: newAlienObj });
        }
        

    }

    useEffect(() => {
        // setShipState({ ...shipState });
        const interval = setInterval(() => {
        moveShip();
        if (shipState.top >= 0){
            return () => clearInterval(interval)
            }
        }, shipState.frameRate);
        return () => clearInterval(interval);
      }, []);

    

    function moveShip(){
        if (shipState.top >= 95){
            // ADD the func or condition that you are HIT!!
            glassShatterJSX = explodeInYaFace();
            // shipState.explode = true
            setShipState({ ...shipState });
            return;
        }
        hitOrMiss(newAlienObj[props.index].struck)
        if (!newAlienObj[props.index].idle){
            if (shipState.touched){
                shipState.jumpCoeff *= 1.25;
                shipState.height *= 1.45;
            }
            // Avoid overflow by not allowing more than 95. ALSO CAUSE IMPACT (damage) HERE!!! Delete!!! 95 since it starts at 94
            if (shipState.top < 95){
                shipState.top -= 1 * shipState.jumpCoeff;
            }
            
            // Ship gets closer - increase height to 'less than n height'
            if (shipState.height < 125){
                shipState.height += 1;
                if (shipState.opacity <= 100){
                    shipState.opacity += 1
                }else if(shipState.height === 100){
                    // if height is 1-- - then delete it
                }
            }
            // Ship flies near screen top (within n px) and reverses
            if (shipState.top <= 5){
                shipState.jumpCoeff = -1.5
            }
            }
        
        if (newAlienObj[props.index].idle){
            // Run action to idle
            if (shipState.idleArray.length === 0){

                //CHANGE TO BACK ON ONCE DONE FINDING BLINKER!!!
 
                newAlienObj[props.index].touched = true;
                newAlienObj[props.index].idle = false;
                newAlienObj[props.index].listeningHold = false;
                shipState.jumpCoeff = -3.5;

                setWeaponShipObj({...weaponShipObj, newAlienObj: {...newAlienObj}})

            }
            // Hover for a moment
            const speedHover = 0.2 * shipState.leftOrRight;

            if (shipState.idleCount > 0){
                shipState.left += speedHover;
                shipState.idleCount -= 1;
            }
            if (shipState.idleCount === 0){
                shipState.idleCount = shipState.idleArray.pop();
                
                if (shipState.leftOrRight === 1){
                    shipState.leftOrRight = -1;
                }else{
                    shipState.leftOrRight = 1;
                }
            }
        }

        // Check if being hit and add animation / color (css for that pic) of shiny thingy / also change center of gravity for rotation animation
        
        setShipState({ ...shipState });
        // Check if destroyed - animate destruction. Swap pics and
    }

    ship = (newAlienObj[props.index].struck==="DESTROYED")? null : (<><div className='shrinker' onTouchStart={(e)=> newTouchStart(e)} onTouchMove={(e)=> newTouchMove(e)} onTouchEnd={(e)=> newTouchEnd(e)} id={shipState.keyId + '*'+'A'} style={{
                position: 'absolute',
                left: shipState.left + '%',
                top: shipState.top + '%',
                opacity: shipState.opacity + '%',
                overscrollBehavior: 'none',
            }}>
                    <div className='flicker' >
        <img className='forcefield' style={{
            height: shipState.height + 'px',
            animation: `rotation ${shipState.spinsSeconds}s infinite linear`,
            overscrollBehavior: 'none'
        }} src={blackdots} alt="ship" /></div>
  </div></>)
    if (newAlienObj[props.index].struck != "DESTROYED" && newAlienObj[props.index].listeningHold && newAlienObj[props.index].idle){
        flare = (<HorizontalFlare left={shipState.left - 80} height={400} top={shipState.top - 28}/>)
    }
    if (shipState.explode){
        explosion = (<Explosion doneSplode={newAlienObj[props.index].struck} left={shipState.left} top={shipState.top} splode={props.exploder}/>);
    }

    return (
        <div >
            {rattleForceField}
            <ReactHowler src={props.listenerMP3} seek={0} playing={newAlienObj[props.index].listeningHold} html5={true} preload={true} volume={0.15}/>
        {flare}  {explosion}
            {ship}
          
      </div>
    )
}

export default Alienship;




