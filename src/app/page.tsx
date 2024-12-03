"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<string>();

  fetch("/api")
    .then((response) => response.json())
    .then((responseData) => {
      setData(responseData);
    });
  return (
    <div>
      <p>{data}</p>
      <p>위 Hello Green 문구가 보인다면 성공입니다.</p>
    </div>
  );
}
