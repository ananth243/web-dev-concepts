import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import UrlContext from "../../Providers/UrlContext";
import Page from "../../components/Page";
import io from "socket.io-client";

function Ws() {
  const { url } = useContext(UrlContext);
  const { state } = useContext(AuthContext);
  const router = useRouter();
  const [message, setMessage] = useState({
    status: false,
    message: null,
  });

  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);

  async function execute() {
    if (!isNaN(url) && url !== "") {
      try {
        const socket = io(`http://localhost:${url}`);
        socket.on("connect", () => {
          console.log("Connected");
        });
        socket.emit("talk", "Hello");
        socket.on("talk", (data) => {
          if (data === "Hello") {
            setMessage({ status: true, message: "Success" });
            socket.disconnect();
            console.log("Disonnected");
          } else {
            setMessage({ status: false, message: "Uknown error occured" });
            socket.disconnect();
            console.log("Disonnected");
          }
        });
      } catch (e) {
        setMessage({
          status: false,
          message: e.message || "Unknown error occured",
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
      <Navbar title="Socket Connections" />
      <Page
        description={description}
        execute={execute}
        problem={problem}
        message={message}
      />
    </>
  );
}

function description() {
  return (
    <>
      <p className="text-2xl">
        All this while, you have been performing http requests and it&apos;s a
        simple request response cycle i.e you establish a connection with a
        server, send metadata along with your request to the server and the
        server sends you a response along with the termination of the
        connection.
      </p>
      <p className="text-2xl">
        Now web sockets are similar to http requests except the connection
        between the server and client is not terminated after being initiated.
        This enables you to recieve and transmit data live and is used by most
        chat applications where they listen to an event on the server. One
        useful nodejs package that you can use is{" "}
        <a
          href="https://socket.io/"
          className="text-blue-400"
          target="_blank"
          rel="noreferrer"
        >
          socket.io
        </a>
      </p>
    </>
  );
}

function problem() {
  return (
    <>
      <p className="text-2xl">
        The client will try to establish a socket connection to the server and
        for the sake of ease try to use socket.io for the backend since
        that&apos;s the package the client is using although there shouldn&apos;t be
        any problems.
      </p>
      <p className="text-2xl">
        The server will emit an event on the &apos;talk&apos; channel and the
        server has to broadcast it back.
      </p>
    </>
  );
}

export default Ws;
