import { useState } from "react";
import NetworkChooser from "./NetworkChooser";
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
  const [destinationChain, setDestinationChain] = useState("stellar");
  const [destinationAddress, setDestinationAddress] = useState();
  const [page, setPage] = useState("NetworkChooser");
  switch (page) {
    case "NetworkChooser":
      return <NetworkChooser destinationChain={destinationChain} setDestinationChain={setDestinationChain} destinationAddress={destinationAddress} setDestinationAddress={setDestinationAddress} setPage={setPage} value={value}  setValue={setValue}/>
    case "Receive":
      return <Receive setPage={setPage} destinationAddress={destinationAddress} value={value}/>
    default:
      return null
  }
}

