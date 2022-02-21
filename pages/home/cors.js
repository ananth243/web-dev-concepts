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
    if (url && url !== window.location.origin) {
      try {
        const response = await get(url + "/cors");
        if (response.status === 200 && response.data === "Hello World") {
          setMessage({ success: true, message: "Success!" });
          return true;
        } else throw Error("Invalid fields sent");
      } catch (error) {
        setMessage({ success: false, message: error.message });
      }
    } else {
      setMessage({ status: false, message: "Please enter a valid url" });
    }
  }
  return (
    <>
      <Navbar />
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
      Cross Origins Resources Sharing allows transfer of data between different
      domains. This is important to setup if you want to attempt the further
      questions For security reasons, browsers such as Chrome, Firefox restrict
      cross-origin HTTP requests initiated from scripts.
      <p>
        In order for this to work, you need to enable CORS in your server. This
        is done by adding the following headers to your response:
        <br />
        <br />
        <code>
          Access Control Allow Origin: * Access Control Allow Headers:
          Content-Type, X-Requested-With Access Control Allow Methods: GET,
          POST, PUT, DELETE, OPTIONS
        </code>
        <br />
        This will allow the browser to make requests to your server.
        <br />
      </p>
    </>
  );
}

function problem() {
  return (
    <p>
      As soon as you click submit, the website will send a GET request to
      &apos;/&apos; on your server. It should respond with &quot;Hello
      World&quot; indicating a success
    </p>
  );
}
