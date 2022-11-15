import keys from "../gameInfo/keys.js"
import { Link, Routes, Route, useLocation, Outlet } from "react-router-dom";
import App from '../App'
import '../../src/App.css'
export default function HomePage(){
    const { chords } = keys;
    const gameChord = {name: "Tom!"};
    const gameStartChord = useLocation();
    const buttonCSS = {
        transition: 'all ease',
        boxShadow: "-5px -5px 15px #444, 5px 5px 15px #222, inset 5px 5px 10px #444, inset -5px -5px 10px #222",
        'WebkitAnimation': 'flickerletter 1.5s infinite',
        'MozAnimation': 'flickerletter 1.5s infinite',
        'animation': 'flickerletter 1.5s infinite' 
        }
    gameStartChord.state = {hey: "Bruce"}   
    console.log(gameStartChord)
    return (
        <>
        <div className="homepage" style={{
            
            paddingTop: "8%",
            backgroundColor: "#333",
            height: "100vh",
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
                

                }}>{chords.dChord.min.name}</div>

            <button style={buttonCSS}  className="buttonHome">
            <Link style={{textDecoration: "none", color: "#949494", textShadow: "0 0 8px"}} to={"/play"} state={gameChord}>PLAY</Link>
            </button>


            <button style={buttonCSS} className="buttonHome">
              <Link style={{textDecoration: "none", color: "#949494", textShadow: "0 0 8px"}} to={"/donate"}>Donate</Link>
            </button>
            <button style={buttonCSS} className="buttonHome">
              <Link style={{textDecoration: "none", color: "#949494", textShadow: "0 0 8px"}} to={"/donate"}>Contact</Link>
            </button>
            <button style={buttonCSS} className="buttonHome">
              <Link style={{textDecoration: "none", color: "#949494", textShadow: "0 0 8px"}} to={"/donate"}>Tutorial</Link>
            </button>

                <Outlet context={{hello: "Tom"}}/>
        </div>
        </>
    )

}


//{chords.aChord.min.name}