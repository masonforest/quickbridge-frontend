import { useState } from "react";
import NetworkChooser from "./NetworkChooser";
import Toast from "./Toast";
import Receive from "./Receive";

export default function App(props) {
  const [transactions, setTransactions] = useState([]);
  const pushTransaction = (transaction) =>
    setTransactions([transaction, ...transactions]);
  return (
    <div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative bd-example-toasts"
      >
        <div
          className="toast-container d-none d-lg-block position-absolute p-3 w-100"
          id="toastPlacement"
        >
          {transactions.map((transaction, i) => (
            <Toast className="d-none d-lg-block" key={i}>
              <div>{transaction.text}</div>
              <div>
                <a
                  href={`https://polygonscan.com/tx/${transaction.hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Transaction
                </a>
              </div>
            </Toast>
          ))}
        </div>
      </div>
      <div className="jumbotron">
        <div className="container">{Page({ pushTransaction })}</div>
      </div>
    </div>
  );
}

function Page(props) {
  const { pushTransaction } = props;
  const [value, setValue] = useState("");
  const [destinationChain, setDestinationChain] = useState("stellar");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [page, setPage] = useState("NetworkChooser");

  switch (page) {
    case "NetworkChooser":
      return (
        <NetworkChooser
          destinationChain={destinationChain}
          setDestinationChain={setDestinationChain}
          destinationAddress={destinationAddress}
          setDestinationAddress={setDestinationAddress}
          setPage={setPage}
          value={value}
          setValue={setValue}
        />
      );
    case "Receive":
      return (
        <Receive
          pushTransaction={pushTransaction}
          setPage={setPage}
          destinationAddress={destinationAddress}
          value={value}
        />
      );
    default:
      return null;
  }
}
