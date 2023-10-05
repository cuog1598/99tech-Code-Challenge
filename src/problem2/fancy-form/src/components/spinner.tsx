import React from "react";
import "./Spinner.css";

interface Props {
  show?: boolean;
}
const Spinner: React.FC<Props> = (props) => {
  if (props.show) {
    return (
      <div className="spinner-container">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return null;
};

export default Spinner;
