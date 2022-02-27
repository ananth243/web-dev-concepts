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
        const body = await getDocs(collection(db, "aggregate"));
        const expectation = [
          { department: "Legal", average: 47.57142857142857 },
          { department: "Training", average: 40.166666666666664 },
          { department: "Sales", average: 63.214285714285715 },
          { department: "Human Resources", average: 55.42857142857143 },
          { department: "Services", average: 50.61538461538461 },
          {
            department: "Research and Development",
            average: 39.888888888888886,
          },
          { department: "Accounting", average: 60.8 },
          { department: "Business Development", average: 64.33333333333333 },
          { department: "Support", average: 52 },
          { department: "Marketing", average: 56.25 },
          { department: "Product Management", average: 48.81818181818182 },
          { department: "Engineering", average: 29.555555555555557 },
        ];
        const response = await post(
          `http://localhost:${url}` + "/aggregate",
          body
        );
        if (response === expectation) {
          setMessage({ status: true, message: "Success" });
          return true;
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
      <p className="">
        Aggregation pipelines are used to aggregate data from multiple
        collections. Imagine a database full of records of subjects and
        student&apos;s marks in it. Now you are supposed to find the average
        mark of each subject. Now what you could do is to loop over all
        documents, if the subject was math, increment the math sum variable and
        finally divide by total number of students and you have to do this for
        each subject. This is a very inefficient way of doing it.
      </p>
      <p>
        So aggregation pipelines give you the flexibility to cretae, modify and
        delete fields and group data from different collections (in mongodb, in
        SQL, tables) and it becomes very efficient and beneficial in terms of
        spped to the application.
      </p>
      <p className="text-red-600">
        Note: If you have already saved the data and are trying this operation
        again, skip the part of saving it again otherwise it will throw an error
      </p>
    </>
  );
}

function problem() {
  return (
    <>
      <p>
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
      <p>
        Save the data in a database of your choice and then perform the
        aggregation where the response should have data of the form:
        <br />
        <Json
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
