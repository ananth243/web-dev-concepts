import React from "react";

function Page({ title, description, problem, execute, message }) {
  return (
    <div className="flex align-center flex-col p-4 space-y-2">
      <h1 className="text-5xl uppercase text-center mb-3 font-light">{title}</h1>
      {description()}
      {problem()}
      <div className="flex items-center space-x-3">
        <button className="w-min py-1 px-3 rounded border-2 border-blue-400" onClick={() => execute()}>Execute</button>
        {message.message && (<div className={`${message.status ? "bg-green-500" : "bg-red-500"} text-white py-1 px-3 rounded-md flex-grow`}>
          Result: {message.message}
        </div>)}
      </div>
    </div>
  );
}

export default Page;
