import Link from "next/link";
import React, { useContext } from "react";
import Modal from "./Modal";
import UrlContext from "../Providers/UrlContext";
import AuthContext from "../Providers/AuthContext";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();
  const { url, setUrl } = useContext(UrlContext);
  const { state, setState } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  function signIn() {
    signInWithPopup(auth, provider).then((res) => {
      setState(true);
      router.push("/home");
    });
  }
  function signout() {
    signOut(auth).then(() => {
      console.log("Logged out");
      router.push("/");
      setState(false);
    });
  }
  return (
    <>
      <div className="bg-red-500 font-sans text-white pt-1 text-2xl pb-2 flex justify-between">
        <Link href="/home" passHref>
          <button className="pl-4">Home</button>
        </Link>
        <ul className="flex justify-around" style={{ width: "40%" }}>
          <Modal name={"About"} />
        </ul>
        <ul>
          {!state && (
            <button
              onClick={() => {
                signIn();
              }}
            >
              Sign in
            </button>
          )}
          {state && (
            <button
              onClick={() => {
                signout();
              }}
            >
              Sign Out
            </button>
          )}
        </ul>
      </div>
      <div>
        {state && (
          <input
            type="url"
            value={url}
            className="text-black"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        )}
      </div>
    </>
  );
}

export default Navbar;
