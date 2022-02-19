import React from "react";
import Navbar from "../components/Navbar";

function stream() {
  return (
    <>
      <Navbar />

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
      <p>
          When you are ready the server will send a get request to /stream. If you see a download that means the request was a success. Else there was some failure
      </p>
    </>
  );
}

export default stream;
