










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
        console.log("INSIDE SHIP! TOM! SHIP! " + shipState.keyId)
        // this line below will filter the ship from being rendered, once we get them on a rotation.
        // shipState.keyId = 'DEAD'
        // Destroy the ship!!
        const idThing = e.target.id[0];
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
                    // setWeaponShipObj({...weaponShipObj, lockedOn: tempData });
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
                
                setShipState({ ...shipState, spinsSeconds: shipState.spinsSeconds, touched: shipState.touched, idle: shipState.idle });
                // setWeaponShipObj({...weaponShipObj, lockedOn: tempData });
        }
}  

    }

    function handleTouchEnd(e){
        console.log(shipState.keyId)
        if (e.touches.length > 1){
            e.preventDefault()
            return
        }
        shipState.listeningHold = false;
        setShipState({...shipState, listeningHold: shipState.listeningHold});
        //weaponShipObj.lockedOn = null;
        // setWeaponShipObj({...weaponShipObj})
    }
    function startup() {
        const el = document.getElementById("canvas");
        el.addEventListener("touchstart", handleTouchStartFunc, false);
        el.addEventListener("touchend", handleTouchEnd, false);
        el.addEventListener("touchcancel", handleTouch, false);
        el.addEventListener("touchmove", handleTouchMove, false);
      }
      
    document.addEventListener("DOMContentLoaded", startup);