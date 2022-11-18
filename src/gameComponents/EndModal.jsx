import React from 'react'
import ReactDOM from 'react-dom';

export default function EndModal(props) {
  if (!(props.open) || !(props.endData)) return null
  const { endData, open } = props;
  const MODAL_STYLES = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#222",
    borderRadius: "5%",
    padding: "10px",
    opacity: "92%",
    color: "#CACACA",
    textShadow: "0 0 20px",
    zIndex: 50,
    paddingLeft: "10px"

  }
  const ninetyOrbetter = "Great Work! Come back and master tomorrow's chord! It will take time and practice to train your ear. And if you can, consider donating a dollar to help upgrade and maintain the Synesthesiac! She's a tough ship but she needs your help!"
  const endMessages = {}
  const resultStyle = { paddingLeft: "2%", paddingRight: "2%"}
  // ADD the click outside to close feature
  const resultsArr = [];
  for (let [k, v] of Object.entries(endData)){
    const data = (<div style={{...resultStyle, color: v.color, textShadow:` 0 0 20px ${v.color}`, fontSize: "35px" }}> {v.label} 
    <div style={{color: "#CACACA", fontSize: "15px"}}>
      Fought: {v.total}<br/>
      Destroyed: {v.destroyed}<br/>
      Success Rate: {((v.destroyed / v.total)*100).toFixed()}%
      </div> 
    
    </div>);
    resultsArr.push(data)
  }
  

  
  return ReactDOM.createPortal(
    <div style={MODAL_STYLES}>
        <div style={{
          display: "flex",
          alignItems: "row",
          justifyContent: "space-around",
          
        }}>{resultsArr}</div>
        <br/>
        {ninetyOrbetter}
        <br/>
        <button className="buttonHome">
            <a style={{ textDecoration: 'none', color: "#949494" }} target="_blank" href="https://www.paypal.com/donate/?hosted_button_id=UBPMU8U47U76L" rel="noreferrer noopener">
                        Donate
                    </a>
            </button>
        </div>
  , document.getElementById("end-modal"))
}


//     border: "8px solid #333",
