import keys from "../gameInfo/keys.js"
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import '../../src/App.css'
import headphones from "../assets/headphones.png"
export default function HomePage(){
    const { chords } = keys;
    const gameChord = {name: "Tom!"};
    const navigate = useNavigate();
    // Sunday  = 0, Monday = 1, Tuesday = 2
    const today = new Date().getDay();
    const daysofNotes = {
      0: chords.aChord.min,
      1: chords.eChord.min,
      2: chords.cChord.maj,
      3: chords.dChord.min,
      4: chords.fChord.maj,
      5: chords.bChord.min,
      6: chords.gChord.maj
    }
    return (
        <>
        <div className="homepage" style={{
            
            paddingTop: "8%",
            backgroundColor: "#333",
            height: "100%",
            fontFamily: "Estrogen-YJL",
            color: "#CACACA",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textShadow: "0 0 32px",
            
        }}>
            <h1 >Synesthesiac™</h1>
            <p style={{margin: "0.5%", fontSize: "12px"}}>The Musical Ear Trainer Game</p>
            <h2 >Today's Chord</h2>


            <div style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                paddingBottom: "5%",
                width: "65%",
                border: "solid gray 2px",
                fontSize: "48px",
                paddingTop: "5%",
                marginBottom: "8%",
                transition: 'all ease',
                boxShadow: "-5px -5px 15px #444, 5px 5px 15px #222, inset 5px 5px 10px #444, inset -5px -5px 10px #222", 
                color: "#949494", 
                textShadow: "0 0 25px"
                }}>{daysofNotes[today].name}</div>

            <button onTouchEnd={()=> setTimeout(() => navigate("/play",{ state: { todayNotes: daysofNotes[today] }}), 250)} className="buttonHome">
                                    PLAY{/* PLAY <img height={"30px"} boxShadow={'0 0 10px'} marginLeft={"10px"} src={headphones}/> */}
            </button>
            <button className="buttonHome">
              Tutorial
            </button>
            <h3>Support The Cause!</h3>

            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "60%"
            }}>


            <button className="buttonHome">
            <a style={{ textDecoration: 'none', color: "#949494" }} target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=UBPMU8U47U76L" rel="noreferrer noopener">
                        Donate
                    </a>
            </button>

            <button className="buttonHome">

            <a style={{ textDecoration: 'none', color: "#949494" }} target="_blank" href="https://www.patreon.com/user?u=82811009" rel="noreferrer noopener">
                        Patreon
                    </a>
            </button>


            </div>

            <button className="buttonHome" onClick={() => window.location = 'mailto:snyesthesiacgame@google.com'}>
                    Contact
            </button>


                <div style={{ marginTop: "25%",bottom: "1%", fontSize: "12px" }}>Cellos by H Pryor, Sound Engineering by R Ziegler, Game by TBP</div>
        </div>
        </>
    )

}


//{chords.aChord.min.name}

//https://www.patreon.com/user?u=82811009