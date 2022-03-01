import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Json from "../../components/Object";
import Navbar from "../../components/Navbar";
import UrlContext from "../../Providers/UrlContext";
import Page from "../../components/Page";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import { decode, verify } from "jsonwebtoken";

function Jwt() {
  const { url } = useContext(UrlContext);
  const [message, setMessage] = useState({
    status: null,
    message: null,
  });
  const [secret, setSecret] = useState("");
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);

  function problem() {
    return (
      <>
        <p className="text-xl">
          There will be a POST request sent to /jwt with the following data:
          <br />
          <Json
            object={{
              name: "John Doe",
              secretPassword: "12345",
            }}
          />
          <br />
          The server will return a JWT. The payload of the jwt will be the users
          data as follows:
          <br />
          <Json
            object={{
              name: "John Doe",
              timestamp: "Date of creation",
            }}
          />
          <br />
          <input
            type="text"
            className="text-black px-2 py-1 rounded"
            onChange={(e) => {
              setSecret(e.target.value);
            }}
            placeholder="Your jwt secret used"
          />
        </p>
        <br />
      </>
    );
  }

  async function execute() {
    if (!isNaN(url) && url !== "") {
      try {
        const body = {
          name: "John Doe",
          secretPassword: "12345",
        };
        const response = await axios.post(`http://localhost:${url}/jwt`, body);
        if (response.status === 200) {
          const { jwt } = response.data;
          const payload = await decode(jwt);
          if (payload.name === "John Doe" && payload.iat && payload.exp) {
            const verified = await verify(jwt, secret);
            if (verified) {
              setMessage({ status: true, message: "Success!" });
            } else {
              setMessage({ status: false, message: "Tampered jwt" });
            }
          }
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
      <div className="text-xl">
        Json Web Tokens are an industry standard for storing users data on the
        client side. They are very hard to tamper with without knowing the
        secret that is used to encrypt them. If you have 2 servers using the
        same user info, the same jwt can be used to communicate between them if
        they are both using the same secret. For more info head to this
        <a
          target="_blank"
          rel="noreferrer"
          href="https://jwt.io"
          className="text-blue-400"
        >
          &nbsp;link.
        </a>
      </div>
    </>
  );
}

export default Jwt;
