// picture of hit ship and size properly

// find and import png of damages to ship - size properly and animate their destructsh
import blackdots from '../assets/blackdots.png'
import '../App.css'
import { useState, useEffect, useContext } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
import HorizontalFlare from './HorizontalFlare';
import { WeaponAndShipContext } from '../gameInfo/gameContext'
// Add a horizontal glow while you're holding the ship to play the notes any that are in its same y value

// Add a state prop drill for a listeningFlare Component 
function Alienship(props){
    let flare;
    // Pass the left key in when the ship is created in the parent component
    const { weaponShipObj, setWeaponShipObj } = useContext(WeaponAndShipContext)
    const [shipState, setShipState] = useState({
        left: props.left,
        top: 94,
        height: 60,
        spinsSeconds: 4,
        hit: props.hit,
        deadOrGone: props.deadOrGone,
        jumpCoeff: 1.5,
        frameRate: 40,
        touched: props.touched,
        idle: false,
        idleArray: Array.from({length: 5}, () => Math.floor(Math.random() * 70)),
        idleCount: 45,
        opacity: 90,
        leftOrRight: Math.random() < 0.5 ? -1 : 1,
        listeningHold: props.listeningHold,
        keyId: props.keyId,
        note: props.note,
        cssFilterGRAY: `invert(${props.gray.invert}%) sepia(${props.gray.sepia}%) saturate(${props.gray.saturate}%) hue-rotate(${props.gray.hueRotate}) brightness(${props.gray.brightness}%) contrast(${props.gray.contrast}%)`,
        cssFilterCOLOR: `invert(${props.color.invert}%) sepia(${props.color.sepia}%) saturate(${props.color.saturate}%) hue-rotate(${props.color.hueRotate}) brightness(${props.color.brightness}%) contrast(${props.color.contrast}%)`,
    })
<<<<<<< HEAD
=======
    function handleTouch(e){
        // console.log(e);
    }

    function touchingShipVerifier(x, y){
        // Verify the touch is inside X, Y bounds of ship
        const leftVal = ((x / window.screen.width)*100).toFixed(1);
        const topVal = ((y / window.screen.height)*100).toFixed(1);
        const leftDiff = Math.abs(leftVal - shipState.left);
        const topDiff = Math.abs(topVal - shipState.top);
        const totalDiff  = leftDiff + topDiff;

        if (totalDiff < 30){
            return true;
        }
        return false;
    }

    function handleTouchMove(e){
        console.log("We are moving the AA");
        // Make sure the X, Y touch coords are within the bounds of the ship / add opacity animation
        
        if (e.touches.length > 1){
            e.preventDefault();
            const touches = [...e.touches];
            for (let i = 0; i < touches.length; i++){
                if (touchingShipVerifier(touches[i].clientX, touches[i].clientY)){
                    setShipState({...shipState, listeningHold: true, idle: true })
                }
            }

        }else{
            const listener = touchingShipVerifier(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
            shipState.listeningHold = listener;
            setShipState({...shipState, listeningHold: shipState.listeningHold, idle: true })
            return;
        }

    }
    function handleTouchStartFunc(e){
        // Do the thing with the animater
        
        // if (height > 0.85){
        //     return
        // }

        // This destroys the ship!!! CHANGE LOGIC HERE TO KILL ALIens!!
        console.log(e.target.id.split('alienKeyID*')[0]);
        const idThing = e.target.id.split('alienKeyID*')[0] || undefined;
        if (idThing != undefined){
            weaponShipObj.deadOrDestroyedIDs.add(e.target.id[0])
            setWeaponShipObj({...weaponShipObj });
        }
        if (e.touches.length > 1){
            e.preventDefault();
            const newFilt = { invert: 14, sepia: 83, saturate: 7052, hueRotate: 359, brightness: 92, contrast: 118 }
            // IS the new touch in the A button? Do something!!
            const touches = [...e.changedTouches];
            // const touches = [...e.changedTouches];
            for (let i = 0; i < touches.length; i++){
                // Check if any touches are in the boundary
                const height = (touches[i].clientY / window.screen.height).toFixed(2);
                const leftVal = touches[i].target.style.left.replace("%", "");
                const topVal = touches[i].target.style.top.replace("%", "");
                const leftDiff = Math.abs(leftVal - shipState.left);
                const topDiff = Math.abs(topVal - shipState.top);
                const totalDiff  = leftDiff + topDiff;
                if (totalDiff < 2) {
                    // Uncomment the line below to 
                    shipState.touched = true;   
                    shipState.idle = true;
                    shipState.spinsSeconds = 1;
                    const tempData = { note: props.note, top: shipState.top, left: shipState.left, keyId: props.keyId };

                    // weaponShipObj.buttonPressed[props.note] = true;
                    setWeaponShipObj({...weaponShipObj, lockedOn: tempData });
                    setShipState({...shipState, spinsSeconds: shipState.spinsSeconds, touched: shipState.touched, idle: shipState.idle, cssFilter: newFilt });
                    return;
                
                }
            }
        }else{
            const leftVal = e.srcElement.style.left.replace("%", "");
            const topVal = e.srcElement.style.top.replace("%", "");
            const leftDiff = Math.abs(leftVal - shipState.left);
            const topDiff = Math.abs(topVal - shipState.top);
            const totalDiff  = leftDiff + topDiff;
            if (totalDiff < 2) {
                // Uncomment the line below to 
                shipState.touched = true;   
                shipState.idle = true;
                shipState.spinsSeconds = 1;
                const tempData = { note: props.note, top: shipState.top, left: shipState.left };

                // weaponShipObj.buttonPressed[props.note] = true;
                setWeaponShipObj({...weaponShipObj, lockedOn: tempData });
                setShipState({...shipState, spinsSeconds: shipState.spinsSeconds, touched: shipState.touched, idle: shipState.idle});

        }
}  

    }

    function handleTouchEnd(e){
        if (e.touches.length > 1){
            e.preventDefault()
            return
        }
        shipState.listeningHold = false;
        setShipState({...shipState, listeningHold: shipState.listeningHold});
        //weaponShipObj.lockedOn = null;
        setWeaponShipObj({...weaponShipObj})
    }
    function startup() {
        const el = document.getElementById("canvas");
        el.addEventListener("touchstart", handleTouchStartFunc, false);
        el.addEventListener("touchend", handleTouchEnd, false);
        el.addEventListener("touchcancel", handleTouch, false);
        el.addEventListener("touchmove", handleTouchMove, false);
      }
      
    document.addEventListener("DOMContentLoaded", startup);

>>>>>>> c16e486f89af8da2a21ebb90c20f564fe4bca950
    useEffect(() => {
        const interval = setInterval(() => {
            moveShip();
            if (shipState.top >= 0){
                return () => clearInterval(interval)
            }
        }, shipState.frameRate);
        return () => clearInterval(interval);
      }, []);

      
    function stopShip(){
        // Cause Ship to stop
        // shipState.touched = false;
        // shipState.leftOrRight = Math.random() < 0.5 ? -1 : 1;
        // shipState.listeningHold = true;
        // setShipState({...shipState, touched: false, leftOrRight: Math.random() < 0.5 ? -1 : 1})
    }
    function moveShip(){
        
        // Change y position and create jump effect
        if (shipState.top > 95){
            shipState.keyId = "DEAD";
            // Fix this line below
            // document.getElementById(shipState.keyId).id = "DEAD"; 
            setShipState({ ...shipState });
            return;
        }
        if (!shipState.idle){
            if (shipState.touched){
                shipState.jumpCoeff *= 1.25;
                shipState.height *= 1.45;
                // setShipState({ ...shipState, jumpCoeff: shipState.jumpCoeff, height: shipState.height });
            }
            // Avoid overflow by not allowing more than 95. ALSO CAUSE IMPACT (damage) HERE!!! Delete!!! 95 since it starts at 94
            if (shipState.top < 95){
                shipState.top -= 1 * shipState.jumpCoeff;
            }
            
            // Ship gets closer - increase height to 'less than n height'
            if (shipState.height < 150){
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
        
        if (shipState.idle){
            // Run action to idle
            if (shipState.idleArray.length === 0){

                //CHANGE TO BACK ON ONCE DONE FINDING BLINKER!!!
                shipState.touched = true;
                shipState.idle = false;
                shipState.listeningHold = false;

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
        setShipState({...shipState, idleCount: shipState.idleCount, listeningHold: shipState.listeningHold, opacity: shipState.opacity, opacity: shipState.opacity});
        // Check if destroyed - animate destruction. Swap pics and
    }
    if (shipState.listeningHold && shipState.idle){
        flare = (<HorizontalFlare left={shipState.left - 80} height={400} top={shipState.top - 28}/>)
    }
    if (props.eVent){
        console.log(props.eVent)
    }
    if (props.e){
        console.log("Inside the e");
        console.log(props.e)
    }
    if (shipState.top > 95){
<<<<<<< HEAD
        // Destroy the ship here - remove from DOM - Did it cause damage?
        const idArr = shipState.keyId.split('alienKeyID');
        // weaponShipObj.deadOrDestroyedIDs.add(idArr[0])
        // setWeaponShipObj({ ...weaponShipObj });
=======
        const tempID = shipState.keyId.split("alienKeyID");
        weaponShipObj.deadOrDestroyedIDs.add(tempID[0])
        // setWeaponShipObj({...weaponShipObj });
>>>>>>> c16e486f89af8da2a21ebb90c20f564fe4bca950
        // return;
    }

    return (
        
        <div className='flares'>
        {flare}  
        <div className='shrinker' id={shipState.keyId + '*'+'A'} style={{
            position: 'absolute',
            left: shipState.left + '%',
            top: shipState.top + '%',
            opacity: shipState.opacity + '%',
            overscrollBehavior: 'none',
            filter: shipState.cssFilter
          }}>
            
        <div className='flicker' >
            <img className='forcefield' style={{
                height: shipState.height + 'px',
                animation: `rotation ${shipState.spinsSeconds}s infinite linear`,
                overscrollBehavior: 'none',
            }} src={blackdots} alt="ship" />
        </div>
      </div>
      </div>
    )
}

export default Alienship;




