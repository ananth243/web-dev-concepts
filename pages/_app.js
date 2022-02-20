import "../styles/globals.css";
import { useState } from "react";
import UrlContext from "../Providers/UrlContext";
import AuthContext from "../Providers/AuthContext";
import { auth } from "../config/Firebase";

function MyApp({ Component, pageProps }) {
  const [url, setUrl] = useState("");
  const [state, setState] = useState(auth.currentUser ? true : false);
  return (
    <AuthContext.Provider value={{ state, setState }}>
      <UrlContext.Provider value={{ url, setUrl }}>
        <Component {...pageProps} />
      </UrlContext.Provider>
    </AuthContext.Provider>
  );
}

export default MyApp;
