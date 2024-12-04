"use client";

import { useState } from "react";

type ResponseData =
  | string
  | {
      error: string;
    };

export default function Home() {
  const [data, setData] = useState<string>();
  const [isfetching, setIsfetching] = useState<boolean>();

  const [field, setField] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleSubmit = (
    method: string,
    data: { key: string; data?: string }
  ) => {
    if (isfetching) return;
    if (method === "GET") {
      setIsfetching(true);
      fetch(`/api/${data.key}`)
        .then((response) => response.json())
        .then((responseData: ResponseData) => {
          if (typeof responseData !== "string") {
            setIsfetching(false);
            alert(responseData.error);
          } else {
            setData(responseData);
            setIsfetching(false);
          }
        });
    } else {
      setIsfetching(true);
      fetch("/api", {
        method,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData: ResponseData) => {
          if (typeof responseData !== "string") {
            setIsfetching(false);
            alert(responseData.error);
          } else {
            setData(responseData);
            alert("Done!");
            setIsfetching(false);
          }
        });
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          name="key"
          value={field}
          onChange={(e) => setField(e.target.value)}
          title="key"
          placeholder="key"
        />
        <input
          type="text"
          name="key"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          title="body"
          placeholder="data"
        />
      </form>
      <div className={"buttonBox"}>
        <button onClick={() => handleSubmit("GET", { key: field })}>GET</button>
        <button
          onClick={() => handleSubmit("POST", { key: field, data: body })}
        >
          POST
        </button>
        <button onClick={() => handleSubmit("PUT", { key: field, data: body })}>
          PUT
        </button>
        <button onClick={() => handleSubmit("DELETE", { key: field })}>
          DELETE
        </button>
      </div>
      <p>{data}</p>
    </div>
  );
}
