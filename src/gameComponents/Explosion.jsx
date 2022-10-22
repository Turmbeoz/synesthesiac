// import 'react';
// import { useState, useEffect, useContext } from 'react';



function Explosion(props){
    return (
        <div className='splosion-anim' style={{
            background: `url(${props.splode})`,
            left: `${props.left - 8}%`,
            top: `${props.top - 8}%`
        }}></div>
    )
    }

export default Explosion