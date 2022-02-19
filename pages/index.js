import Head from "next/head";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Typewriter from "typewriter-effect";
import Cards from "../components/Cards";

export default function Home() {
  const [options, setOptions] = useState([
    {
      id: 0,
      name: "CORS",
      link: "/cors",
      description:
        "Cross Origins Resources Sharing allows transfer of data between different domains.",
    },
    {
      id: 1,
      name: "HTTP Protocols",
      link: "/http",
      description:
        "Various way of performing HTTP requests. It is a way of communicating with a server.",
    },
    {
      id: 2,
      name: "HTTP methods",
      link: "/methods",
      description:
        "There are different http methods that can be used to perform a request such as query parameters etc...",
    },
    {
      id: 3,
      name: "Headers and Cookies",
      link: "/headers",
      description:
        "Headers and cookies are the primary way of communicating with a server and are used to authenticate/authorize users.",
    },
    {
      id: 4,
      name: "Json Web Tokens",
      link: "/jwt",
      description:
        "JWT's are the similar to cookies. Only thing is that they store user's info on the client side and not the server.",
    },
    {
      id: 5,
      name: "Authorization",
      link: "/auth",
      description:
        "Authorization is the process of authenticating a user. It is a way of identifying a user.",
    },
    {
      id: 6,
      name: "CSRF Tokens",
      link: "/csrf",
      description:
        "CSRF is a way of preventing cross site request forgery. It is a way of protecting the user's data submitted to the server.",
    },
    {
      id: 7,
      name: "Web Sockets",
      link: "/ws",
      description:
        "Web sockets are a way of communicating with a server without having to use a page refresh. It is a way of communicating with a server without having to use a page refresh.",
    },
    {
      id: 8,
      name: "Rate Limiting",
      link: "/rate",
      description:
        "Rate limiting is a way of limiting the number of requests that can be made to a server. It is a way of limiting the number of requests that can be made to a server.",
    },
    {
      id: 9,
      name: "Aggregations",
      link: "/agg",
      description:
        "Aggregations are a way of combining data from multiple sources.",
    },
    {
      id: 10,
      name: "SQL Injections",
      link: "/sql",
      description:
        "SQL Injections are a way of injecting SQL queries into a database. This is prehaps one of the most dangerous attacks on a website.",
    },
    {
      id: 11,
      name: "XSS",
      link: "/xss",
      description:
        "XSS is a way of injecting code into a website. Also very dangerous if you don't code the backend properly",
    },
    {
      id: 12,
      name: "Caching",
      link: "/cache",
      description:
        "Caching is a way of storing data on the server. It is a way of storing data on the server.",
    },
  ]);
  return (
    <>
      <Navbar />
      <div className="p-10">
        <Head>
          <title>Web dev practice</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <p className="font-mono text-xl">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Welcome")
                .pauseFor(1000)
                .deleteAll()
                .typeString("This site tests out your WebD knowledge")
                .start()
                .pauseFor(1000)
                .deleteAll()
                .typeString("Please Enjoy!")
                .start();
            }}
          />
        </p>
      </div>
      <div className="grid gap-8 p-4 grid-cols-autofit place-items-stretch grid-rows-1 my-5">
        {options &&
          options.map((card) => (
            <Cards
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
