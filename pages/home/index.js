import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import Cards from "../../components/Cards";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [router, state]);
  const options = [
    {
      id: 0,
      name: "CORS",
      link: "/home/cors",
      description:
        "Cross Origins Resources Sharing allows transfer of data between different domains.",
    },
    {
      id: 1,
      name: "HTTP Protocols",
      link: "/home/http",
      description:
        "Various way of performing HTTP requests. It is a way of communicating with a server.",
    },
    {
      id: 2,
      name: "HTTP Parameters",
      link: "/home/methods",
      description:
        "There are different http parameters that can be used to covey data such as query parameters etc...",
    },
    {
      id: 3,
      name: "Headers and Cookies",
      link: "/home/headers",
      description:
        "Headers and cookies are the primary way of communicating with a server and are used to authenticate/authorize users.",
    },
    {
      id: 4,
      name: "Json Web Tokens",
      link: "/home/jwt",
      description:
        "JWT's are the similar to cookies. Only thing is that they store user's info on the client side and not the server.",
    },
    {
      id: 5,
      name: "Rate Limiting",
      link: "/home/rate",
      description:
      "Rate limiting is a way of limiting the number of requests that can be made to a server.",
    },
    {
      id: 6,
      name: "Aggregations",
      link: "/home/agg",
      description:
        "Aggregations are a way of combining data from multiple sources.",
    },
    {
      id: 7,
      name: "Web Sockets",
      link: "/home/ws",
      description:
        "Web sockets are a way of communicating with a server without having to use a page refresh.",
    },
    {
      id: 8,
      name: "Streams",
      link: "/home/stream",
      description:
      "Streams are a way of handling data as it is being sent from the server to the client.",
    },
    {
      id: 9,
      name: "Caching",
      link: "/home/cache",
      description:
      "Caching is a way of storing data on the server. It is a way of storing data on the server.",
    },
    {
      id: 10,
      name: "SQL Injections",
      link: "/home/sql",
      description:
        "SQL Injections are a way of injecting SQL queries into a database. This is prehaps one of the most dangerous attacks on a website.",
    },
    {
      id: 11,
      name: "XSS",
      link: "/home/xss",
      description:
      "XSS is a way of injecting code into a website. Also very dangerous if you don't code the backend properly",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="p-10"></div>
      <div className="grid gap-8 p-4 grid-cols-autofit place-items-stretch grid-rows-1 my-5">
        {options &&
          options.map((card) => (
            <Cards
              id={card.id}
              key={card.id}
              name={card.name}
              link={card.link}
              description={card.description}
            />
          ))}
      </div>
    </>
  );
}
