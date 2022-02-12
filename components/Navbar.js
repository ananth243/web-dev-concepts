import Link from "next/link";
import React from "react";
import Modal from "./Modal";

function Navbar() {
  return (
    <div className="bg-red-500 font-sans text-white pt-1 text-2xl pb-2 flex justify-between">
      <Link href="/" passHref>
        <button className="pl-4">Home</button>
      </Link>
      <ul className="flex justify-around" style={{ width: "40%" }}>
        <Modal name={"About"} />
      </ul>
    </div>
  );
}

export default Navbar;
