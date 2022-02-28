import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import UrlContext from "../../Providers/UrlContext";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Json from "../../components/Object";

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
    if (!isNaN(url) && url !== "") {
      try {
        const res = await axios.get(`http://localhost:${url}/requests`);
        const res2 = await axios.post(`http://localhost:${url}/requests`, {
          message: "Hey there!",
        });
        const res3 = await axios.delete(`http://localhost:${url}/requests`);
        if (
          res.status === 200 &&
          res2.status == 200 &&
          res.status === 200 &&
          res.data.message === "Success" &&
          res2.data.message === "Success" &&
          res3.data.message === "Success"
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
        message: "Please enter a valid port number",
      });
    }
  }
  return (
    <>
      <Navbar title="Http Requests" />
      <Page
        message={message}
        description={description}
        problem={problem}
        title="Http Requests"
        execute={execute}
      />
    </>
  );
}

function description() {
  return (
    <>
      <p className="text-xl">
        The HTTP request is sent to the server and the response is received.
        There are numerous http requests such as GET, POST, PUT, DELETE, HEAD,
        PATCH, TRACE, CONNECT, and so on. But most of the time we use GET, POST,
        PUT, DELETE.
      </p>
      <p className="text-xl">
        It would be intuitive to think that these requests cant be modified but
        that is not true. Example: I can actually make a POST request that ends
        up deleting data. In essence thats a delete request.
      </p>
      <p className="text-xl">
        So these are just general conventions followed in the web. So if you
        want to delete data on the server its not neccessary to use a DELETE
        request.
      </p>
    </>
  );
}

function problem() {
  return (
    <p className="text-xl">
      This server will send a GET, POST and DELETE request to /requests and it
      expects a response of 200 for each respectively with a json
      response of{" "}
      <Json
        expectation={true}
        object={{
          status: "The respective status code",
          message: "Success",
        }}
      />
      <br />
    </p>
  );
}

export default Http;
