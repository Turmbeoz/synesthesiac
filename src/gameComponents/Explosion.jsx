import { useState } from 'react';



function Explosion(props){
    const [classCSS, setClassCSS] = useState("splosion-anim")
    if (props.doneSplode === "DESTROYED"){
        setTimeout(()=>{
            setClassCSS("invisibleShip")
        },900)
    }
    return (
        <div className={classCSS} style={{
            background: classCSS === "splosion-anim"? `url(${props.splode})`: 'none',
            left: `${props.left - 8}%`,
            top: `${props.top - 8}%`
        }}></div>
    )
    }

export default Explosion