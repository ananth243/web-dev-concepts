import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import UrlContext from "../../Providers/UrlContext";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Page from "../../components/Page";

function Methods() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  const message = useState({
    status: null,
    message: null,
  });
  const { url } = useContext(UrlContext);
  async function execute() {
    if (url && url !== window.location.origin) {
      try {
        const id = Math.random() * 2000;
        const get = await axios.get(url + `/${id}`);
        const json = await axios.get(url + "?name=John Doe");
        if (json.data.name === "John Doe" && get.data.id === id) {
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
      <Page
        title={"Methods"}
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
      <p>
        There are various ways you can transmit data to the server. You can use
        headers, the body of a post request but what about an id? What if you
        also needed to render specific pages for specific id&apos;s also?
      </p>
    </>
  );
}

function problem() {
  return (
    <p>
      So the client is going to make the following requests:
      <br />
      <ol>
        <li>
          Get request &apos;/dynamic/(Whatever id I want)&apos; and it expects a
          json response of{" "}
          {JSON.stringify({
            id: "The id sent",
          })}
        </li>
        <li>
          Get request to &apos;/dynamic/?name=(Some name)&apos; and it expects a
          json response of{" "}
          {JSON.stringify({
            name: "The name sent",
          })}
        </li>
      </ol>
    </p>
  );
}

export default Methods;
