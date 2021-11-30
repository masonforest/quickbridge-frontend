import {useRef, useEffect} from "react"
import {BRIDGE_ADDRESS, ETHEREUM_CHAIN_ID} from "./constants.js"
import {ethers} from "ethers"
const {utils:{formatEther}} = ethers

export default function Receive(props) {
   const {value, destinationChainId} = props
   const buttonRef1 = useRef();
   const buttonRef2 = useRef();
   useEffect(() => {
    const buttonEl = buttonRef1.current;
    if(buttonEl) {
    window.bootstrap.Tooltip.getOrCreateInstance(buttonEl)
    }
  }, []);
   useEffect(() => {
    const buttonEl = buttonRef2.current;
    if(buttonEl) {
    window.bootstrap.Tooltip.getOrCreateInstance(buttonEl) 
    }
  }, []);
 
  return <div className="text-center">
<div className="tooltip bs-tooltip-top" role="tooltip">
  <div className="tooltip-arrow"></div>
  <div className="tooltip-inner">
    Some tooltip text!
  </div>
</div>
  <h1>Waiting for Payment of <button className="btn btn-primary" data-bs-placement="top" title="Click to Copy" style={{cursor: "pointer"}} ref={buttonRef1} onClick={(e) => {e.preventDefault(); copyTextToClipboard(formatEther(value))}} >{formatEther(value)}</button> {destinationChainId === ETHEREUM_CHAIN_ID? "ETH" : "MATIC"}</h1>
<h1>to</h1>
<h1><button className="btn btn-primary" title="Click to Copy" ref={buttonRef2} onClick={(e) => {e.preventDefault(); copyTextToClipboard(BRIDGE_ADDRESS)}}>{BRIDGE_ADDRESS}</button></h1>
  <div className="my-5 spinner-border text-primary" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
