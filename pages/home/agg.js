import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { post } from "axios";
import UrlContext from "../../Providers/UrlContext";
import AuthContext from "../../Providers/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useRouter } from "next/router";

function Agg() {
  const { url } = useContext(UrlContext);
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  async function execute() {
    try {
      const body = await getDocs(collection(db, "aggregate"));
      const expectation = [
        { department: "Legal", average: 47.57142857142857 },
        { department: "Training", average: 40.166666666666664 },
        { department: "Sales", average: 63.214285714285715 },
        { department: "Human Resources", average: 55.42857142857143 },
        { department: "Services", average: 50.61538461538461 },
        { department: "Research and Development", average: 39.888888888888886 },
        { department: "Accounting", average: 60.8 },
        { department: "Business Development", average: 64.33333333333333 },
        { department: "Support", average: 52 },
        { department: "Marketing", average: 56.25 },
        { department: "Product Management", average: 48.81818181818182 },
        { department: "Engineering", average: 29.555555555555557 },
      ];
      const response = await post(url, body);
      if (response === expectation) {
        return true;
      } else return false;
    } catch (error) {
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
