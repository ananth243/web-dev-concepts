import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AuthContext from "../../Providers/AuthContext";
import { useRouter } from "next/router";
import Page from "../../components/Page";
import UrlContext from "../../Providers/UrlContext";

function Sql() {
  const { state } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!state) {
      router.push("/");
    }
  }, [state, router]);
  async function execute() {}

  return (
    <>
      <Navbar title="SQL Injection" />
      <Page execute={execute} description={description} />
    </>
  );
}

function description() {
  return (
    <>
      <p className="text-xl">
        SQL Injection is a type of injection where the attacker can inject SQL
        into your database via a web application. A perfect example is
        demonstrated in this{" "}
        <a
          href="https://www.w3schools.com/sql/sql_injection.asp"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400"
        >
          link
        </a>
      </p>
      <p className="text-xl">
        This application doesn&apos;t use SQL as a database so you can&apos;t
        inject SQL even if you wanted to. Just keep this in mind when you create
        the structure for a SQL backend.
      </p>
    </>
  );
}

export default Sql;
