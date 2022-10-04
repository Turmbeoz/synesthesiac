import React from 'react'
import bubbleImg from '../assets/phaserGlow.png';






export default function Bubbler(props) {
  const { hex } = props;
  console.log(hex, " : The HEX")
  // const styles = {
  //   touchAction: 'none',
  //   opacity: 95,
  //   pointerEvents: 'none',
  //   bottom: '-20%',
  //   position: 'fixed',
  //   'WebkitFilter': `invert(${stylesCSS.invert}%) sepia(${stylesCSS.sepia}%) saturate(${stylesCSS.saturate}%) hue-rotate(${stylesCSS.hueRotate}deg) brightness(${stylesCSS.brightness}%) contrast(${stylesCSS.contrast}%)`
  //   }
    const stylesP = {
    touchAction: 'none',
    width: '12%',
    height: '12%',
    borderRadius: '20%',
    pointerEvents: 'none',
    position: 'fixed',
    backgroundColor: hex,
    boxShadow: `5 10 18px 0 ${hex}`,
    opacity: '9%',
    bottom: '0%'
    }

  // return <img src={bubbleImg} style={styles} className='bubbles' ></img>
  return <>
    <div className='bubbles2' style={stylesP}></div>
  </>
};


