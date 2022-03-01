import React, { useContext, useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Page from "../../components/Page";
import UrlContext from "../../Providers/UrlContext";
import { get } from "axios";

function Stream() {
  const { url } = useContext(UrlContext);
  const { state } = useContext(AuthContext);
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
        const response = await get(`http://localhost:${url}` + "/stream");
        if (response) {
          console.log(response);
          setMessage({ status: true, message: "Success" });
          return true;
        } else {
          setMessage({ status: false, message: "Uknown error occured" });
          return false;
        }
      } catch (error) {
        setMessage({ status: false, message: error.message });
      }
    } else
      setMessage({
        status: false,
        message: "Please enter a valid port number",
      });
  }
  return (
    <>
      <Navbar title="Streams" />
      <Page
        execute={execute}
        message={message}
        description={description}
        problem={Problem}
      />
    </>
  );
}

function description() {
  return (
    <>
      <p className="text-xl">
        Streams are a way of handlling data. Streams in node.js are most widely
        used for file reading and transmissions that are very helpful in sending
        or creating files such as images and pdfs
      </p>
      <p className="text-xl">
        In the core nodejs module fs we are offered with a few methods that are
        used to read and write files such as createReadStream and
        createWriteStream.
      </p>
      <p className="text-xl">
        Now why are streams important. Imagine you had to transfer 200 gb of
        data across the internet through a server that has a hypothetical ram of
        20 GB. See the issue? You would need to break the 200 gb into 20 gb
        chunks and send them to the server which is what streams do. For more
        information regarding streams in nodejs check out this{" "}
        <a
          href="https://nodesource.com/blog/understanding-streams-in-nodejs/"
          className="text-blue-400"
          target="_blank"
          rel="noreferrer"
        >
          blog
        </a>
      </p>
    </>
  );
}

function Problem() {
  const iframeRef = useRef();
  return (
    <>
      <p className="text-xl">
        Create any file you want to. Can be a pdf or a txt file also. When you
        are ready the server will send a get request to /stream. You have to
        read the file contents and send the contents as the response. and it
        will be available in the browser console.&nbsp;
      <a
        href="/stream.js"
        className="text-blue-400 text-xl"
        target="_blank"
        rel="noreferrer"
      >
        Source file
      </a>&nbsp; for below code
      </p>
      <iframe
        src="/stream.js"
        ref={iframeRef}
        frameBorder="0"
        title="Streams"
        className="h-80"
        onLoad={() => {
          const frame = iframeRef.current;
          let body = frame.contentWindow.document.querySelector("body");
          body.style.color = "white";
          body.style.fontSize = "1.25rem";
          body.style.lineHeight = "1.25rem";
        }}
      ></iframe>
    </>
  );
}
export default Stream;
