import React from "react";

function Page({ title, description, problem, execute, message }) {
  return (
    <>
      <h1>{title}</h1>
      {description()}
      {problem()}
      <button onClick={() => execute()}>Execute</button>
      {message.status && <h1 className="text-white">{message.message}</h1>}
      {!message.status && <h1 className="text-red-600">{message.message}</h1>}
    </>
  );
}

export default Page;
