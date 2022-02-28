import Navbar from "../../components/Navbar";
import { get } from "axios";
import { useContext, useState, useEffect } from "react";
import UrlContext from "../../Providers/UrlContext";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Page from "../../components/Page";

export default function Cors() {
  const { url } = useContext(UrlContext);
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [router, state]);
  const [message, setMessage] = useState({
    status: null,
    message: null,
  });
  async function execute() {
    if (!isNaN(url) && url !== "") {
      try {
        const response = await get(`http://localhost:${url}` + "/cors");
        if (response.status === 200 && response.data === "Hello World") {
          setMessage({ status: true, message: "Success!" });
        } else throw Error("Invalid fields sent");
      } catch (error) {
        setMessage({ success: false, message: error.message });
      }
    } else {
      setMessage({
        status: false,
        message: "Please enter a valid port number",
      });
    }
  }
  return (
    <>
      <Navbar title="Cors" />
      <Page
        title={"Cors"}
        description={description}
        execute={execute}
        message={message}
        problem={problem}
      />
    </>
  );
}

function description() {
  return (
    <>
      <p className="text-xl">
        Cross Origins Resources Sharing allows transfer of data between
        different domains. This is important to setup if you want to attempt the
        further questions For security reasons, browsers such as Chrome, Firefox
        restrict cross-origin HTTP requests initiated from scripts. In order for
        this to work, you need to enable CORS in your server for this domain.
        <br />
        Hint:
        <br />
        <code>Access-Control-Allow-Origin</code>
      </p>
    </>
  );
}

function problem() {
  return (
    <>
      <p className="text-xl">
        As soon as you click submit, the website will send a GET request to / on
        your server. It should respond with Hello World indicating a success
      </p>
      <br />
    </>
  );
}
