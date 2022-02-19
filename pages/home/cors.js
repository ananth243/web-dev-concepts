import Navbar from "../../../components/Navbar";
import { get } from "axios";
import { useContext, useState } from "react";
import UrlContext from "../../Providers/UrlContext";

export default function Cors() {
  const { url } = useContext(UrlContext);
  const [message, setMessage] = useState({
    status: null,
    message: null,
  });
  async function execute() {
    if (url && url !== process.env.DEPLOYED_APP) {
      try {
        const response = await get(url + "/cors");
        if (response.status === 200 && response.data === "Hello World") {
          setMessage({ success: true, message: "Success!" });
          return true;
        } else throw Error("Invalid fields sent");
      } catch (error) {
        setMessage({ success: false, message: error.message });
      }
    } else {
      setMessage({ status: false, message: "Please enter a valid url" });
    }
  }
  return (
    <>
      <Navbar />
      <div>
        <h1>CORS</h1>
        <p>
          Cross Origins Resources Sharing allows transfer of data between
          different domains. This is important to setup if you want to attempt
          the further questions
        </p>
        <p>
          For security reasons, browsers such as Chrome, Firefox restrict
          cross-origin HTTP requests initiated from scripts.
        </p>
        <p>
          In order for this to work, you need to enable CORS in your server.
          This is done by adding the following headers to your response:
          <br />
          <br />
          <code>
            Access Control Allow Origin: * Access Control Allow Headers:
            Content-Type, X-Requested-With Access Control Allow Methods: GET,
            POST, PUT, DELETE, OPTIONS
          </code>
        </p>
        <p>
          This will allow the browser to make requests to your server. As soon
          as you click submit, the website will send a GET request to
          &apos;/&apos; on your server. It should respond with &quot;Hello
          World&quot; indicating a success
        </p>
        <button onClick={() => execute()}>Execute</button>
        {message.status && <h1 className="text-white">{message.message}</h1>}
        {!message.status && <h1 className="text-red-600">{message.message}</h1>}
      </div>
    </>
  );
}
