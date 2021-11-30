import {ethers} from "ethers"
const {utils: {hexlify}} = ethers
export const PROD = true//process.env.NODE_ENV === "production";
export const ETHEREUM_CHAIN_ID = PROD ? hexlify(1) : hexlify(4)
export const POLYGON_CHAIN_ID = PROD ? hexlify(137) : hexlify(80001)
export const BRIDGE_ADDRESS = "0x12345189dE102dF749DC48079EAA85e2fC9CF9D9"

