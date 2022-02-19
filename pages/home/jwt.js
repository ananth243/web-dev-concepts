import axios from "axios";
import React, { useContext } from "react";
import Navbar from "../../../components/Navbar";
import UrlContext from "../../Providers/UrlContext";

function Jwt() {
  const { url } = useContext(UrlContext);
  async function execute() {
    try {
      body = JSON.stringify({
        name: "John Doe",
        secretPassword: "12345",
      });
      const response = await axios.post(url, body);
      if (response.status === 200 && response.data === "Hello World") {
        return true;
      } else throw Error("Invalid fields sent");
    } catch (error) {
      console.log(error);
    }
  }
  const description = `Json Web Tokens are an industry standard for storing user's data on the client side. They are very hard to tamper with without knowing the
   secret that is used to encrypt them. If you have 2 servers using the same user info the same jwt can be used to communicate between them 
   if they are both using the same secret. For more info head to the link below.`;
  return (
    <>
      <Navbar />
      <div>{description}</div>
      <a target="_blank" rel="noreferrer" href="https://jwt.io">
        JWT
      </a>
      <p>
        There will be a POST request sent to the server with the following data:
        <br />
        {JSON.stringify({
          name: "John Doe",
          secretPassword: "12345",
        })}
        <br />
        The server will return a JWT. The payload of the jwt will be the
        user&apos;s data as follows:
        <br />
        {JSON.stringify({
          name: "John Doe",
          timestamp: "Date of creation",
        })}
        After this you should also send a GET request to &apos;/api/jwt&apos;.
        The request should include the token in a header called token.
        <br />
        The secret you should use for this entire practice should be test12
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

export default Jwt;
