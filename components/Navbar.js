import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import Modal from "./Modal";
import UrlContext from "../Providers/UrlContext";
import AuthContext from "../Providers/AuthContext";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/Firebase";
import { useRouter } from "next/router";

function Navbar({ title = "Web Dev Practice" }) {
  const router = useRouter();
  const { url, setUrl } = useContext(UrlContext);
  const { state, setState } = useContext(AuthContext);
  const provider = new GoogleAuthProvider();
  function signIn() {
    signInWithPopup(auth, provider).then((res) => {
      router.push("/home");
    });
  }
  function signout() {
    signOut(auth).then(() => {
      console.log("Logged out");
      router.push("/");
    });
  }
  auth.onAuthStateChanged((user) => {
    if (user) setState(true);
    else setState(false);
  });
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="bg-red-500 font-sans text-white text-2xl flex p-4 space-x-4">
        <div className="flex justify-around space-x-4 w-full">
          <Link href={state ? "/home" : "/"} passHref>
            <button>Home</button>
          </Link>
          <Modal name={"About"} />
          {/* {state && <Modal name={"Help"} credits={true} />} */}
          <div className="grow" />
          <div>
            {state && (
              <input
                type="url"
                value={url}
                className="text-black px-2 py-1 rounded"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                placeholder="Server port: 3000"
              />
            )}
          </div>
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
        </div>
      </div>
    </>
  );
}

export default Navbar;
