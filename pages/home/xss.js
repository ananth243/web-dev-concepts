import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Page from "../../components/Page";

function Xss() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  return (
    <>
      <Navbar />
      <Page title="XSS" description={description} />
    </>
  );
}

function description() {
  return (
    <>
      <p className="text-xl">
        There is a way of executing javascript in the browser. This is called
        Cross Site Scripting. Intuivitively one can enter this as an input to a
        form: {'<script>alert("I hacked your app")</script>'}. If you stored
        this data into your application and displayed it when you fetched, you
        have essentially hacked the application.
      </p>
      <p className="text-xl">
        Luckily various packages have been developed to prevent this. For
        example{" "}
        <a
          href="https://www.npmjs.com/package/dompurify"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400"
        >
          dompurify
        </a>{" "}
        is one that can be used to clean the input entered in a form.
      </p>
      <p className="text-xl">
        Now you might be wondering as to whether this application uses it. The
        answer is no. If you have a knowledge of React, then you can visit to
        this{" "}
        <a
          href="https://www.stackhawk.com/blog/react-xss-guide-examples-and-prevention/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400"
        >
          link&nbsp;
        </a>
        to know more.
      </p>
    </>
  );
}
export default Xss;
