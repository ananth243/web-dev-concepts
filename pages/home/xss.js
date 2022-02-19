import React from "react";
import Navbar from "../../components/Navbar";

function xss() {
  return (
    <>
      <Navbar />
      <div>xss</div>
    </>
  );
}

export default xss;
