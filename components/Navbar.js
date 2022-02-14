import Link from "next/link";
import React from "react";
import Modal from "./Modal";

function Navbar() {
  return (
    <div className="bg-red-500 font-sans text-white text-2xl flex p-4 space-x-4">
      <Link href="/" passHref>
        <button>Home</button>
      </Link>
      <ul className="flex justify-around">
        <Modal name={"About"} />
      </ul>
    </div>
  );
}

export default Navbar;
