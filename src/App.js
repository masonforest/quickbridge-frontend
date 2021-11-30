import "./App.css";
import { useState } from "react";
import NetworkChooser from "./NetworkChooser";
import {ETHEREUM_CHAIN_ID} from "./constants"
import Receive from "./Receive";

export default function App(props) {
  return <div>
    <div className="jumbotron">
      <div className="container">
      {Page()}
      </div>
    </div>
  </div>;
}

function Page() {
  const [value, setValue] = useState();
  const [destinationChainId, setDestinationChainId] = useState(ETHEREUM_CHAIN_ID);
  const [page, setPage] = useState("NetworkChooser");
  switch (page) {
    case "NetworkChooser":
      return <NetworkChooser destinationChainId={destinationChainId} setDestinationChainId={setDestinationChainId} setPage={setPage} value={value}  setValue={setValue}/>
    case "Receive":
      return <Receive setPage={setPage} destinationChainId={destinationChainId} value={value}/>
    default:
      return null
  }
}

