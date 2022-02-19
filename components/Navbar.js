import Link from "next/link";
import React, { useContext } from "react";
import Modal from "./Modal";
import UrlContext from "../Providers/UrlContext";

function Navbar() {
  const { url, setUrl } = useContext(UrlContext);
  return (
    <div className="bg-red-500 font-sans text-white text-2xl flex p-4 space-x-4">
      <Link href="/" passHref>
        <button>Home</button>
      </Link>
      <ul className="flex justify-around">
        <Modal name={"About"} />
      </ul>
      <input
        type="url"
        value={url}
        className="text-black"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
    </div>
  );
}

export default Navbar;
