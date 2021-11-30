import { forwardRef } from "react";
import { ethers } from "ethers";
import Cleave from "cleave.js/react";
const {
  utils: { parseEther },
} = ethers;

export default forwardRef((props, ref) => {
  const { onChange, options, label } = props;

  return (
    <div className="form-floating mb-3">
      <Cleave
        className="form-control"
        ref={ref}
        placeholder="0.0"
        options={{
          ...options,
          numeral: true,
          numeralDecimalScale: 6,
          numeralThousandsGroupStyle: "thousand",
        }}
        onChange={(event) => {
          event.stopPropagation();

          onChange(
            event.target.rawValue === ""
              ? null
              : parseEther(
                  event.target.rawValue.replace(/^\./g, "0."),
                ).toBigInt()
          );
        }}
      ></Cleave>
      <label htmlFor="inputAmount">{label}</label>
    </div>
  );
});
// };
