import "./App.css";
import { useRef } from "react";
import { ArrowDown } from "react-feather";
import TokenAmountInput from "./TokenAmountInput";
import { QUICK_BRIDGE } from "./constants";
import stellarIcon from "./images/stellar-icon.svg";
import { Keypair } from "stellar-sdk";
import polygonIcon from "./images/polygon-icon.svg";

export default function NetworkChooser(props) {
  const {
    setPage,
    value,
    setValue,
    destinationChain,
    setDestinationChain,
    destinationAddress,
    setDestinationAddress,
  } = props;
  const toggle = (e) => {
    e.preventDefault();
    setDestinationChain(destinationChain === "stellar" ? "polygon" : "stellar");
  };
  const inputAmountRef = useRef(null);
  const startTransfer = async (e) => {
    if (destinationChain === "stellar") {
      setPage("Receive");
    } else {
      await QUICK_BRIDGE.provider.send("eth_requestAccounts", []);
      let key = Keypair.fromPublicKey(destinationAddress);
      let tx = await QUICK_BRIDGE.send(key.rawPublicKey(), { value: value });
      await tx.wait();
      setDestinationAddress("");
      setValue(null);
      inputAmountRef.current.setRawValue("");
    }
  };

  return (
    <form className="d-flex  flex-column">
      <div className="d-grid gap-2 mt-2">
        <div className="row justify-content-center">
          <div className="col-2">
            <Stellar show={destinationChain === "stellar"} />
            <Polygon show={destinationChain === "polygon"} />
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
            <Stellar show={destinationChain === "polygon"} />
            <Polygon show={destinationChain === "stellar"} />
          </div>
        </div>
        <TokenAmountInput
          label="Input Amount"
          ref={inputAmountRef}
          onChange={(inputAmount) => setValue(inputAmount)}
          value={value}
        />
        <div className="form-floating mb-3">
          <input
            id="address"
            className="form-control"
            type="text"
            placeholder="0.0"
            value={destinationAddress}
            onChange={(event) => setDestinationAddress(event.target.value)}
          />
          <label htmlFor="address">Destination Address</label>
        </div>
        <button
          onClick={() => startTransfer()}
          className="btn btn-primary"
          type="button"
        >
          Start Transfer
        </button>
      </div>
    </form>
  );
}

function Stellar(props) {
  return (
    <div
      style={{
        display: props.show ? "flex" : "none",
      }}
      className="network"
    >
      <img
        style={{
          borderRadius: "100%",
        }}
        src={stellarIcon}
        alt="Stellar"
      />
      Stellar
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
