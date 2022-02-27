import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Json from "../../components/Object";
import UrlContext from "../../Providers/UrlContext";
import Page from "../../components/Page";
import axios from "axios";

function Headers() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  const [message, setMessage] = useState({
    status: null,
    message: null,
  });
  const { url } = useContext(UrlContext);
  async function execute() {
    if (!isNaN(url) && url !== "") {
      try {
        const cookie = Math.floor(Math.random() * 1000000);
        document.cookie = `username=${cookie}`;
        const token = Math.floor(Math.random() * 1000000);
        const response = await axios.get(`http://localhost:${url}/headers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.cookie === cookie && response.data.token == token) {
          setMessage({
            status: true,
            message: "Success",
          });
        } else {
          setMessage({
            status: false,
            message: "Invalid fields sent",
          });
        }
      } catch (e) {
        setMessage({
          status: false,
          message: e.message,
        });
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
      <Navbar title="Http Headers" />
      <Page
        title="Http Headers"
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
      <p className="text-xl">
        Headers are a way of transfering data and metadata to the server. One of
        the most known headers in terms of security is the Authorization Header:
        <br />
        <code>Authorization: Bearer {"<token>"} </code>
      </p>
      <p className="text-xl">
        Cookies serve as a sort of browser side cache. They are used to store
        user related authorization credentials. With each request you send to a
        sevrer the cookies are also included in the headers of the request.
      </p>
    </>
  );
}

function problem() {
  return (
    <p className="text-xl">
      So the client is going to make the following request:
      <br />
      Get request to:
      <code>&apos;/headers&apos;</code> along with the cookie, &apos;token&apos;
      in the and authorization header
      <br />
      and it expects a json response of{" "}
      <Json
        object={{
          cookie: "The cookie value",
          token: "The token value",
        }}
      />
    </p>
  );
}

export default Headers;
