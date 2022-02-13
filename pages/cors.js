import Navbar from "../components/Navbar";
import { get } from "axios";

export default function Cors() {
  async function execute() {
    const url = localStorage.getItem("url");
    try {
      const response = await get(url + "/cors");
      console.log(response);
      if (response.status === 200 && response.data === "Hello World") {
        return true;
      } else throw Error("Invalid fields sent");
    } catch (error) {
      console.log(error);
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
          `&apos;`/`&apos;` on your server. It should respond with `&quot;`Hello
          World`&quot;` indicating a success
        </p>
        <button onClick={() => execute()}>Execute</button>
      </div>
    </>
  );
}
