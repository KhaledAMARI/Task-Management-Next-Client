"use client"
import { useState, useEffect } from "react";
import Board from "./components/Board";

export default function Home() {
  const [data, setData] = useState(null);
  console.log("🚀 ~ Home ~ data:", data)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:4000/tasks', {
        headers: {
          ''
      }
      });
      const result = await res.json();
      console.log("🚀 ~ fetchData ~ result:", result)
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Task Management Board</h1>
      </div>
      <Board data={data} />
    </main>
  );
}
