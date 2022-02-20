import React, { useContext } from "react";
import Navbar from "../../components/Navbar";
import { post } from "axios";
import UrlContext from "../../Providers/UrlContext";
function Cache() {
  const { url } = useContext(UrlContext);
  async function cache() {
    let intial = new Date();
    try {
      await post(url, {
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
      <Navbar />
      <div>cache</div>
      <button
        onClick={() => {
          execute();
        }}
      ></button>
    </>
  );
}

export default Cache;
