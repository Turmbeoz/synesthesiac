// Notify user if note button has been modified to sharp or flat
import e from "express";
import { useState, useEffect, useContext, useRef } from "react";
import { WeaponAndShipContext } from '../gameInfo/gameContext';

export function NoteBadgeSelect(props){
    const { natural, sharp, flat, noteButtonStr, buttonNoteInfo, stylesP } = props;
    const [coloredOrNotL, setColoredOrNotL] = useState({ touched: false, color: "#CACACA" });
    const [coloredOrNotR, setColoredOrNotR] = useState({ touched: false, color: "#CACACA" });
    const [buttons, setButtons] = useState(0);
    const x = ["♭", "#", "♮"]
    console.log(buttonNoteInfo)
    function newColor(e){
        console.log("Inside the ontouch");
        console.log(e.target.className)
        if(e.target.className === "btn-sharp-flatR"){
            setColoredOrNotR({...coloredOrNotR, color: buttonNoteInfo.right? buttonNoteInfo.right.hex : "#CACACA"})
        } 
        if(e.target.className === "btn-sharp-flatL"){
            setColoredOrNotL({...coloredOrNotL, color: buttonNoteInfo.left? buttonNoteInfo.left.hex : "#CACACA"});
        } 
        
    } 

    let leftButtonJSX = buttonNoteInfo.left? (<button onTouchStart={(e)=> newColor(e)} key={noteButtonStr+"L"} className={`btn-sharp-flatL`} style={{...stylesP, color: coloredOrNotL.color }}>{buttonNoteInfo.symbols[1]}</button>) : null;
    let rightButtonJSX = buttonNoteInfo.right? (<button onTouchStart={newColor} key={noteButtonStr+"R"} className={`btn-sharp-flatR`} style={{...stylesP, color: coloredOrNotR.color }} >{buttonNoteInfo.symbols[2]}</button>) : null;
    const buttonSwitchArr = [leftButtonJSX, rightButtonJSX];
    const cssDiv = {
        position: "absolute",
        bottom: "100%",
        width: "20%",
        fontFamily: 'Estrogen-YJL',
        fontSize: '100%',
        transition: `all 0.5s ease`,
        backgroundColor:"#444",
        display: "flex",
        justifyContent: "space-around",
        borderRadius: "20% 20% 0% 0%"  
    }

    if (noteButtonStr === "A"){
        // push the button right
        cssDiv.left = "1%"
    }else if(noteButtonStr === "G"){
        //push the button right
        cssDiv.right = "1%"
    }else{
        cssDiv.left = ""
        cssDiv.right = ""
    }

    return (<>
        <div className="sharpOrFlat" style={cssDiv}>
            {buttonSwitchArr}
        </div>
    </>)
}



{/* <button style={{
            color: "#444",
            borderRadius: "30%",
            width: "8%",
            background: "radial-gradient(#CACACA, #444)",
            border: "none",
            fontSize: "35px",
            fontWeight: "bolder",
            width: "10%"
        }}>♮</button>
        
        <button style={{
            color: "#444",
            borderRadius: "30%",
            width: "8%",
            background: "radial-gradient(#CACACA, #444)",
            border: "none",
            fontWeight: "bolder",
            fontSize: "25px"
        }}>#</button > */}