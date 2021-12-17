import { useRef, useEffect } from "react";
import { STELLAR_BRIDGE_ADDRESS } from "./constants.js";
import { POLYGON_PROVIDER, POLYGON_PAYER } from "./constants";
import { ethers } from "ethers";
const {
  utils: { formatEther },
} = ethers;

export default function Receive(props) {
  const { value, destinationAddress, pushTransaction, setPage } = props;
  const buttonRef1 = useRef();
  const buttonRef2 = useRef();
  useEffect(() => {
    const buttonEl = buttonRef1.current;
    if (buttonEl) {
      window.bootstrap.Tooltip.getOrCreateInstance(buttonEl);
    }
  }, []);
  useEffect(() => {
    const buttonEl = buttonRef2.current;
    if (buttonEl) {
      window.bootstrap.Tooltip.getOrCreateInstance(buttonEl);
    }
  }, []);
  const addressAsBase64 = Buffer.from(
    destinationAddress.slice(2),
    "hex"
  ).toString("base64");
  useEffect(() => {
    const onNewBlock = async (blockNumber) => {
      (
        await POLYGON_PROVIDER.getBlockWithTransactions(blockNumber)
      ).transactions
        .filter(({ from, to }) => from === POLYGON_PAYER)
        .forEach(async ({ value: MATICValue, to, from, hash }) => {
          setPage("NetworkChooser");
          pushTransaction({
            text: `Converted ${formatEther(MATICValue)} MATIC`,
            hash,
          });
        });
    };

    POLYGON_PROVIDER.on("block", onNewBlock);

    return () => POLYGON_PROVIDER.off("block", onNewBlock);
  }, [pushTransaction, setPage]);

  return (
    <div className="text-center">
      <div className="tooltip bs-tooltip-top" role="tooltip">
        <div className="tooltip-arrow"></div>
        <div className="tooltip-inner">Some tooltip text!</div>
      </div>
      <h1>
        Waiting for Payment of{" "}
        <button
          className="btn btn-primary"
          data-bs-placement="top"
          title="Click to Copy"
          style={{ cursor: "pointer" }}
          ref={buttonRef1}
          onClick={(e) => {
            e.preventDefault();
            copyTextToClipboard(formatEther(value));
          }}
        >
          {formatEther(value)}
        </button>{" "}
        XLM
      </h1>
      <h1>to</h1>
      <h1>
        <button
          className="btn btn-primary"
          title="Click to Copy"
          ref={buttonRef2}
          onClick={(e) => {
            e.preventDefault();
            copyTextToClipboard(STELLAR_BRIDGE_ADDRESS);
          }}
        >
          {STELLAR_BRIDGE_ADDRESS}
        </button>
      </h1>
      <h1>With Memo</h1>
      <h1>
        <button
          className="btn btn-primary"
          title="Click to Copy"
          ref={buttonRef2}
          onClick={(e) => {
            e.preventDefault();
            copyTextToClipboard(addressAsBase64);
          }}
        >
          {addressAsBase64}
        </button>
      </h1>
      <div className="my-5 spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
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
    document.execCommand("copy");
  } catch (err) {}

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text);
}
