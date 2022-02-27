import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Page from "../../components/Page";

function Stream() {
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
        const response = await get(`http://localhost:${url}` + "/stream", body);
        if (response) {
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
        problem={problem}
      />
    </>
  );
}

function description() {
  return (
    <>
      <p>
        Streams are a way of handlling data. Streams in node.js are most widely
        used for file reading and transmissions that are very helpful in sending
        or creating files such as images and pdfs
      </p>
      <p>
        In the core nodejs module fs we are offered with a few methods that are
        used to read and write files such as createReadStream and
        createWriteStream. An example of this is present in{" "}
        <code>/api/stream</code>
      </p>
      <p>
        For example by clicking this{" "}
        <a download href="/api/stream" className="text-blue-400">
          link
        </a>
        &nbsp;it will trigger a download
      </p>
      <p>
        Now why are streams important. Imagine you had to transfer 200 gb of
        data across the internet through a server that has a hypothetical ram of
        20 GB. See the issue? You would need to break the 200 gb into 20 gb
        chunks and send them to the server which is what streams do.
      </p>
    </>
  );
}

function problem() {
  return (
    <>
      <p>
        Create any file you want to. Can be a pdf or a txt file also. When you
        are ready the server will send a get request to /stream. You have to
        read the file contents and send the contents as the response.
      </p>
    </>
  );
}
export default Stream;
