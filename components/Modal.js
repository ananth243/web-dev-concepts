import axios from "axios";
import React, { useState } from "react";
import { auth } from "../config/Firebase";
import { send } from "@emailjs/browser";

function Description() {
  return (
    <div>
      This was created to help noobs in webd to get started and test their
      concepts out in webd. Thanks to{" "}
      <a
        href="https://github.com/riskycase"
        className="text-blue-400"
        target="_blank"
        rel="noreferrer"
      >
        riskycase
      </a>
      &nbsp;for helping me out with the frontend. If you need help when you are stuck, you can refer to this 
      <a
        href="https://github.com/ananth243/Practice-problem-solutions"
        className="text-blue-400"
        target="_blank"
        rel="noreferrer"
      >
        repo
      </a>
      &nbsp; and feel free to submit a PR if you wanna add/modify a feature.
    </div>
  );
}

export default function Modal({ name, description, credits = false }) {
  const [issue, setIssue] = useState("");
  const [message, setMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  async function submitForm() {
    try {
      const templateParams = {
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        message: `WEBD-BITS: ` + issue,
      };
      await send(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_USER_ID
      );
      setIssue("");
      setMessage(true);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        {name}
      </button>
      {showModal ? (
        <>
          <div className="justify-center text-black items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl">{name}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    {credits ? description : <Description />}
                    {credits && (
                      <form>
                        Describe your issue in brief and well have someone get
                        back to you
                        <label htmlFor="issue">Issue</label>
                        <textarea
                          name="issue"
                          value={issue}
                          onChange={(e) => setIssue(e.target.value)}
                        ></textarea>
                      </form>
                    )}
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {!message && credits && (
                    <button
                      onClick={() => {
                        submitForm();
                      }}
                      className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Submit Form
                    </button>
                  )}
                  {message && (
                    <h3 className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                      Message sent!
                    </h3>
                  )}
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
