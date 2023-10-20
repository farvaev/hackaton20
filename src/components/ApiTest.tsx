"use client";

import { useState, useEffect } from "react";

export default function ApiTest() {
  const [data, setData] = useState<any>("");

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => {
        if (res.ok) {
          setData(res.body);
        } else {
          setData(JSON.stringify({ message: "api not working" }));
        }
      })
      .catch((e) => {
        setData(JSON.stringify({ message: "some error" }));
      });
  }, []);

  return <pre>{data}</pre>;
}
