import React from "react";

function Json({ object, expectation = false }) {
  return (
    <pre className={expectation ? "text-green-400" : "text-red-400"}>
      {JSON.stringify(object, null, 4)}
    </pre>
  );
}

export default Json;
