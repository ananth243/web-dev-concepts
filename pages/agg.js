import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { post } from "axios";
import UrlContext from "../Providers/UrlContext";

function Agg() {
  const { url } = useContext(UrlContext);
  async function execute() {
    try {
      let body = {
        data: [
          {
            sub: "Math",
            name: "John Doe",
            marks: Math.floor(Math.random() * 100),
          },
          {
            sub: "Physics",
            name: "Katie Yorker",
            marks: Math.floor(Math.random() * 100),
          },
          {
            sub: "Math",
            name: "Katie Yorker",
            marks: Math.floor(Math.random() * 100),
          },
          {
            sub: "Physics",
            name: "John Doe",
            marks: Math.floor(Math.random() * 100),
          },
          {
            sub: "Math",
            name: "Newie Porter",
            marks: Math.floor(Math.random() * 100),
          },
          {
            sub: "Physics",
            name: "John Doe",
            marks: Math.floor(Math.random() * 100),
          },
        ],
      };
      const expectation = [
        {
          subject: "Math",
          avg:
            (body.data[0].marks + body.data[2].marks + body.data[4].marks) / 3,
        },
        {
          subject: "Physics",
          avg:
            (body.data[1].marks + body.data[3].marks + body.data[5].marks) / 3,
        },
      ];
      const response = await post(url, body);
      if (response === expectation) {
        return true;
      } else return false;
    } catch (error) {
      //Do something with the error
      console.log(error);
    }
  }
  return (
    <>
      <Navbar />
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

export default Agg;
