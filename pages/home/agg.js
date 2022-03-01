import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { post } from "axios";
import UrlContext from "../../Providers/UrlContext";
import AuthContext from "../../Providers/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useRouter } from "next/router";
import Json from "../../components/Object";

function validate(expectation, result) {
  let truth = false;
  const index = Math.floor(Math.random() * 12) + 1;
  const field = expectation[index];
  result.forEach((doc) => {
    if (doc.department === field.department) {
      if (doc.average === field.average) {
        truth = true;
        return;
      }
    }
  });
  return truth;
}
function Agg() {
  const { url } = useContext(UrlContext);
  const [message, setMessage] = useState({
    status: false,
    message: null,
  });
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  async function execute() {
    if (!isNaN(url) && url !== "") {
      try {
        let body = [];
        const data = await getDocs(collection(db, "aggregate"));
        data.forEach((doc) => body.push(doc.data()));
        const expectation = [
          {
            department: "Human Resources",
            average: Math.round(55.42857142857143),
          },
          {
            department: "Research and Development",
            average: Math.round(39.888888888888886),
          },
          { department: "Legal", average: Math.round(47.57142857142857) },
          {
            department: "Product Management",
            average: Math.round(48.81818181818182),
          },
          { department: "Accounting", average: Math.round(60.8) },
          { department: "Sales", average: Math.round(63.214285714285715) },
          {
            department: "Business Development",
            average: Math.round(64.33333333333333),
          },
          { department: "Training", average: Math.round(40.166666666666664) },
          { department: "Marketing", average: Math.round(56.25) },
          { department: "Support", average: Math.round(52) },
          {
            department: "Engineering",
            average: Math.round(29.555555555555557),
          },
          { department: "Services", average: Math.round(50.61538461538461) },
        ];
        const response = await post(
          `http://localhost:${url}` + "/aggregate",
          body
        );
        const validation = validate(expectation, response.data);
        console.log(validation);
        if (validation) {
          setMessage({ status: true, message: "Success" });
        } else {
          setMessage({ status: false, message: "Invalid fields sent" });
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
      <Navbar title="Aggregation" />
      <Page
        title={"Aggregation"}
        description={description}
        problem={problem}
        execute={execute}
        message={message}
      />
    </>
  );
}

function description() {
  return (
    <>
      <p className="text-xl">
        Aggregation pipelines are used to aggregate data from multiple
        collections. Imagine a database full of records of subjects and students
        marks in it. Now you are supposed to find the average mark of each
        subject. Now what you could do is to loop over all documents, if the
        subject was math, increment the math sum variable and finally divide by
        total number of students and you have to do this for each subject. This
        is a very inefficient way of doing it.
      </p>
      <p className="text-xl">
        So aggregation pipelines give you the flexibility to create, modify and
        delete fields and group data from different collections (in mongodb, in
        SQL, tables) and it becomes very efficient and beneficial in terms of
        speed to the application.
      </p>
      <p className="text-red-600 text-xl">
        Note: If you have already saved the data and are trying this operation
        again, skip the part of saving it again otherwise it will throw an error
      </p>
    </>
  );
}

function problem() {
  return (
    <>
      <p className="text-xl">
        There will be a POST request sent to the server with data of the
        following form:
        <Json
          object={{
            department: "Accounting",
            name: "John Doe",
            marks: 2,
          }}
        />
      </p>
      <p className="text-xl">
        Save the data in a database of your choice and then perform the
        aggregation where the response should have data of the form:
        <br />
        <Json
          expectation={true}
          object={{
            department: "Accounting",
            average: "Average mark of the department",
          }}
        />
      </p>
    </>
  );
}
export default Agg;
