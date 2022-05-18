import React from "react";
import ReactLoading from "react-loading";


function Loader({ type, color, message }) {
  return (
    <div className="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h2 style={{ fontSize:"10px", color:"#0361FB"}}>{message}</h2>
        <ReactLoading type={type} color={color} height={"80%"} width={"80%"} />
      </div>
    </div>
  );
}
export default Loader;
