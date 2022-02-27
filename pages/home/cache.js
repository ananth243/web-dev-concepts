import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { post } from "axios";
import UrlContext from "../../Providers/UrlContext";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Page from "../../components/Page";
import Link from "next/link";

function Cache() {
  const { url } = useContext(UrlContext);
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
  async function cache() {
    let intial = new Date();
    try {
      await post(`http://localhost:${url}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "John Doe",
          cache: true,
        }),
      });
      let end = new Date();
      return end.getTime() - intial.getTime();
    } catch (e) {
      console.log(e);
    }
  }
  function execute() {
    let result = [];
    setTimeout(async () => {
      const res = await cache();
      result.push(res);
    }, 1000);
    setTimeout(async () => {
      const res = await cache();
      result.push(res);
    }, 3000);
    setTimeout(() => {
      if (result[1] <= result[0] / 10) {
        return true;
      } else return false;
    }, 5000);
  }
  return (
    <>
      <Navbar title="Caching" />
      <Page
        execute={execute}
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
      <p className="text-xl">
        Imagine you had to perform a HUGE query in your server everytime a
        request is made to a particular endpoint. If you knew that the data that
        you are fetching will not change that frequently, what you can do is
        cache the data that is to be transmitted so that next time the same
        request is made, it fetched the data directly. This is known as caching.
        You can cache on both the server or the bowser.
      </p>
      <p className="text-xl">
        If we take{" "}
        <a
          href="https://redis.io/"
          className="text-blue-400"
          target="_blank"
          rel="noreferrer"
        >
          redis
        </a>
        &nbsp; as an example, it is a key value store. It stores the data in the
        form of key value pairs. Now redis is much more faster than a database
        because it stores the data in the memory itself which results in faster
        queries. Of course there are other functionalities it uses under the
        hood, but that is a topic for another day.
      </p>
    </>
  );
}

export function problem() {
  return (
    <>
      <p className="text-xl">
        Now the server will make 2 requests to /cache. We will be using the same
        data as used in
        <Link href="/home/agg" passHref>
          <h1 className="text-blue-400 inline">&nbsp;aggregations</h1>
        </Link>
        . This time I assume you have saved the data. Now the goal of the task
        is that the second request that the server performs should take less time
        than the first because of the caching on server side. So keep that in
        mind that the algorithm used in this app may not be perfect and you may
        get an error message even though you are right. So open the networks tab and try it out for yourself.
      </p>
    </>
  );
}
export default Cache;
