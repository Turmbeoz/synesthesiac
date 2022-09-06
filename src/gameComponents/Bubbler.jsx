import React from 'react'
import bubbleImg from '../assets/phaserGlow.png';
import { useEffect } from 'react';






export default function Bubbler(props) {
  const { styles, delay } = props;
  useEffect(() => {

    const timer = setTimeout(() => {
    }, delay);
    return () => clearTimeout(timer)
  }, [delay]);

  return <img src={bubbleImg} style={styles} className='bubbles' ></img>
};


