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
    if (url && url !== window.location.origin) {
      try {
        const response = await post(url + "/stream", body);
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
    } else setMessage({ status: false, message: "Please enter a valid url" });
  }
  return (
    <>
      <Navbar />
      <Page
        execute={execute}
        title={"Streams"}
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
        createWriteStream.
      </p>
    </>
  );
}

function problem() {
  return (
    <>
      <p>Create any file you want to. Can be a pdf or a txt file also.</p>
      <p>
        When you are ready the server will send a get request to /stream. You
        have to read the file contents and send the contents as the response. If
        you see a download that means the request was a success. Else there was
        some failure.
      </p>
    </>
  );
}
export default Stream;
