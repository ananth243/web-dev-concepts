import axios from "axios";
import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import validateUrl from "../../components/validateUrl";
import UrlContext from "../../Providers/UrlContext";

function Methods() {
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
      <p>
        There are various ways you can transmit data to the server. You can use
        headers, the body of a post request but what about an id? What if you
        also needed to render specific pages for specific id&apos;s also?
      </p>
      <p>
        So the client is going to make the following requests:
        <br />
        <ol>
          <li>
            Get request &apos;/dynamic/(Whatever id I want)&apos; and it expects
            a json response of{" "}
            {JSON.stringify({
              id: "The id sent",
            })}
          </li>
          <li>
            Get request to &apos;/dynamic/?name=(Some name)&apos; and it expects
            a json response of{" "}
            {JSON.stringify({
              name: "The name sent",
            })}
          </li>
        </ol>
      </p>
      <button
        onClick={() => {
          execute();
        }}
      >
        Execute
      </button>
    </>
  );
}

export default Methods;
