import {ethers} from "ethers";
import quickBridgeABI from "./QuickBridgeABI.json"
const {Contract} = ethers
export const PROD = true//process.env.NODE_ENV === "production";
export const STELLAR_BRIDGE_ADDRESS = "GCQUIC3INC3NHJFWD6OMZSHPQ2TRWGD7QDMXQGJYPOXO36RR5EVNRAGW"
const QUICK_BRIDGE_POLYGON_ADDRESS = PROD ? "0x067ea7c93f95988aaa36805d33acf4d4dbd1dfc0": "0x97a173f9e948a143aa78afc8d6b18bd87ab821ac"
export const POLYGON_PROVIDER = new ethers.providers.JsonRpcProvider(
  "https://polygon.moonshine.exchange/"
);
export const SIGNER = window.ethereum
  ? new ethers.providers.Web3Provider(window.ethereum, "any").getSigner()
  : POLYGON_PROVIDER;

export const QUICK_BRIDGE = new Contract(
  QUICK_BRIDGE_POLYGON_ADDRESS,
  quickBridgeABI,
  SIGNER
);

