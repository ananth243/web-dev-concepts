import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Json from "../../components/Object";
import Navbar from "../../components/Navbar";
import UrlContext from "../../Providers/UrlContext";
import Page from "../../components/Page";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";

function Jwt() {
  const { url } = useContext(UrlContext);
  const [message, setMessage] = useState({
    status: null,
    message: null,
  });
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  async function execute() {
    if (!isNaN(url) && url !== "") {
      try {
        body = JSON.stringify({
          name: "John Doe",
          secretPassword: "12345",
        });
        const response = await axios.post(`http://localhost:${url}`, body);
        if (response.status === 200 && response.data === "Hello World") {
          setMessage({ success: true, message: "Success!" });
          return true;
        } else throw Error("Invalid fields sent");
      } catch (error) {
        setMessage({ status: false, message: error.message });
      }
    } else
      setMessage({
        status: false,
        message: "Please enter a valid port number",
      });
  }

  return (
    <>
      <Navbar title="JWT" />
      <Page
        title="JWT"
        description={description}
        problem={problem}
        execute={execute}
        message={message}
      />
    </>
  );
}

function description() {
  return (
    <>
      <div>
        Json Web Tokens are an industry standard for storing user&apos;s data on
        the client side. They are very hard to tamper with without knowing the
        secret that is used to encrypt them. If you have 2 servers using the
        same user info the same jwt can be used to communicate between them if
        they are both using the same secret. For more info head to this
        <a
          target="_blank"
          rel="noreferrer"
          href="https://jwt.io"
          className="text-blue-800"
        >
          &nbsp;link.
        </a>
      </div>
    </>
  );
}

function problem() {
  return (
    <p>
      There will be a POST request sent to the server with the following data:
      <br />
      <Json
        object={{
          name: "John Doe",
          secretPassword: "12345",
        }}
      />
      <br />
      The server will return a JWT. The payload of the jwt will be the
      user&apos;s data as follows:
      <br />
      <Json
        object={{
          name: "John Doe",
          timestamp: "Date of creation",
        }}
      />
      After this you should also send a GET request to &apos;/api/jwt&apos;. The
      request should include the token in a header called token.
      <br />
      The secret you should use for this entire practice should be test12
    </p>
  );
}
export default Jwt;
