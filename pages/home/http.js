import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import UrlContext from "../../Providers/UrlContext";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";

function Http() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  const { url } = useContext(UrlContext);
  const [message, setMessage] = useState({
    status: null,
    message: null,
  });
  async function execute() {
    if (url && url !== window.location.origin) {
      try {
        const res = await axios.get(url + "http");
        const res2 = await axios.post(url + "http", { message: "Hey there!" });
        const res3 = await axios.delete(url + "http");
        if (
          res.status === 200 &&
          res2.status == 201 &&
          res.status === 204 &&
          res.data === mock &&
          res2.data === mock &&
          res3.data === mock
        ) {
          setMessage({
            status: true,
            message: "Success",
          });
        } else {
          throw Error("Invalid fields sent");
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
        message: "Please enter a valid url",
      });
    }
  }
  return (
    <>
      <Navbar />
      <p>
        The HTTP request is sent to the server and the response is received.
        There are numerous http requests such as GET, POST, PUT, DELETE, HEAD,
        PATCH, TRACE, CONNECT, and so on. But most of the time we use GET, POST,
        PUT, DELETE.
      </p>
      <p>
        It would be intuitive to think that these requests can&apos;t be
        modified but that is not true. Example: I can actually make a POST
        request that ends up deleting data. In essence thats a delete request.
      </p>
      <p>
        So these are just general conventions followed in the web. SO if you
        want to delete data on the server it&apos;s not neccessary to use a
        DELETE request.
      </p>
      <p>
        This server will send a GET, POST and DELETE request to /http and it
        expects a response of 200, 201, and 204 for each respectively with a
        json response of{" "}
        <code>
          {JSON.stringify({
            status: "The respective status code",
            message: "Success",
          })}
        </code>
      </p>
      <button
        onClick={() => {
          execute();
        }}
      >
        Execute
      </button>
      {message.status && <h1 className="text-green-600">{message.message}</h1>}
      {!message.status && <h1 className="text-red-600">{message.message}</h1>}
    </>
  );
}

export default Http;
