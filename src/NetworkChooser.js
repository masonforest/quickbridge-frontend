import "./App.css";
import { useRef } from "react";
import { useFetch } from "use-http"
import { ArrowDown } from "react-feather";
import {ETHEREUM_CHAIN_ID, POLYGON_CHAIN_ID} from "./constants"
import TokenAmountInput from "./TokenAmountInput";
import { useState } from "react";
import ethereumIcon from "./images/ethereum-icon.svg";
import polygonIcon from "./images/polygon-icon.svg";

export default function NetworkChooser(props) {
  const {setPage, value, setValue, destinationChainId, setDestinationChainId} = props
  const toggle = (e) => {
    e.preventDefault();
    setDestinationChainId(destinationChainId === ETHEREUM_CHAIN_ID ? POLYGON_CHAIN_ID : ETHEREUM_CHAIN_ID);
  };
   const { response, post } = useFetch('http://localhost:8080')
  const inputAmountRef = useRef(null);
  const [destinationAddress, setDestinationAddress] = useState("");
  async function startTransfer(e) {
    e.preventDefault()
    
    await post('/', { destinationAddress, destinationChainId })
    if (response.ok) setPage("Receive")
  }
  return (
          <form className="d-flex  flex-column">
            <div className="d-grid gap-2 mt-2">
              <div className="row justify-content-center">
                <div className="col-2">
                  <Ethereum show={destinationChainId === ETHEREUM_CHAIN_ID} />
                  <Polygon show={destinationChainId === POLYGON_CHAIN_ID} />
                </div>
              </div>

              <button
                style={{ width: 48, margin: "auto" }}
                className="btn btn-primary"
                onClick={(e) => toggle(e)}
              >
                <ArrowDown style={{ margin: "0 auto" }} />
              </button>
              <div className="row justify-content-center mb-4">
                <div className="col-2">
                  <Ethereum show={destinationChainId === POLYGON_CHAIN_ID} />
                  <Polygon show={destinationChainId === ETHEREUM_CHAIN_ID} />
                </div>
              </div>
              <TokenAmountInput
                label="Input Amount"
                ref={inputAmountRef}
                onChange={(inputAmount) => setValue(inputAmount)}
                value={value}
              />
    <div className="form-floating mb-3">
      <input id="address" className="form-control" type="text" placeholder="0.0" value={destinationAddress} onChange={(event) => setDestinationAddress(event.target.value)} />
      <label htmlFor="address">Destination Address</label>
    </div>
              <button
                onClick={startTransfer}
                className="btn btn-primary"
                type="button"
              >
                Start Transfer
              </button>
            </div>
          </form>
  );
}

function Ethereum(props) {
  return (
    <div
      style={{
        display: props.show ? "flex" : "none",
      }}
      className="network"
    >
      <img
        style={{
          padding: "5px 13px",
          backgroundColor: "#ddd",
          borderRadius: "100%",
        }}
        src={ethereumIcon}
        alt="Ethereum"
      />
      Ethereum
    </div>
  );
}

function Polygon(props) {
  return (
    <div
      style={{
        display: props.show ? "flex" : "none",
      }}
      className="network"
    >
      <img style={{}} src={polygonIcon} alt="Polygon" />
      Polygon
    </div>
  );
}
