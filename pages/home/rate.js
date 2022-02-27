import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Page from "../../components/Page";
import { get } from "axios";
import Json from "../../components/Object";
import UrlContext from "../../Providers/UrlContext";

function Rate() {
  const { state } = useContext(AuthContext);
  const { url } = useContext(UrlContext);
  const [message, setMessage] = useState({
    status: false,
    message: null,
  });
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  async function execute() {
    if (!isNaN(url) && url !== "") {
      try {
        await get(`http://localhost:${url}`);
        await get(`http://localhost:${url}`);
        await get(`http://localhost:${url}`);
        let response = await get(`http://localhost:${url}`);
        if (response) {
          setMessage({ status: false, message: "Server recieved a response" });
          return true;
        }
      } catch (error) {
        if (
          response.data.error === "Too many requests" &&
          response.status === 429
        ) {
          setTimeout(async () => {
            const response = await get(`http://localhost:${url}`);
            if (response.data === "Success") {
              setMessage({ status: false, message: "Succes" });
            } else {
              setMessage({ status: false, message: "Uknown error occured" });
            }
          }, 4000);
        } else {
          setMessage({
            status: false,
            message: error.message || "Uknown error occured",
          });
        }
      }
    } else
      setMessage({
        status: false,
        message: "Please enter a valid port number",
      });
  }
  return (
    <>
      <Navbar title="Rate Limiting" />
      <Page
        execute={execute}
        title="Rate Limiting"
        description={description}
        problem={problem}
        message={message}
      />
    </>
  );
}

function description() {
  return (
    <>
      <p>
        Rate limiting is a way of preventing brute force attacks. Imagine a
        group of 3000 people making requests to a server at the ame time. If the
        server doesn&apos;t have multiple intances where it can distibute the
        load, these requests could crash the server or more dangerous, reveal
        sensitive data.
      </p>
      <p>
        To fix this most servers track your ip address when making requests, it
        will check if you are within the quota of requests (per hour or day). If
        it exceeds that threshold the server will not send response for some
        time for each request.
      </p>
    </>
  );
}

function problem() {
  return (
    <>
      <p>
        This server will send a series of requests to &apos;/rate&apos;. After 3
        requests within 4 seconds, your server should send a 429 response with a
        message as follows:
        <Json object={{ status: 429, error: "Too many requests" }} />
      </p>
      <p>
        After 4 seconds the server should send a 200 response with a message as
        follows:
        <Json
          object={{
            status: 200,
            message: "Success",
          }}
        />
      </p>
    </>
  );
}
export default Rate;
