import "../styles/globals.css";
import { useState } from "react";
import UrlContext from "../Providers/UrlContext";

function MyApp({ Component, pageProps }) {
  const [url, setUrl] = useState(null);
  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      <Component {...pageProps} />
    </UrlContext.Provider>
  );
}

export default MyApp;
