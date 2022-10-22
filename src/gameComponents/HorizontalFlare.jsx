import '../App.css'
// import { useState, useEffect } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
import horizontalFlare from '../assets/listeningFlare.png';






function HorizontalFlare(props){

    return (
        <>
        <img className='listener' style={{
                position: 'absolute',
                height: props.height + 'px',
                left: props.left + '%',
                top: props.top + '%',
                pointerEvents: 'none',
            }} src={horizontalFlare} alt="flare">
            </img>
        </>
    )
}


export default HorizontalFlare;
// animation: `rotation ${5}s infinite linear`





