"use client"
import { useState, useEffect } from "react";
import Board from "./components/Board";
import { DataProps } from "./interface";

export default function Home() {
  const initialData = { data: null, meta: null };
  const [data, setData] = useState<DataProps>(initialData);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:4000/tasks', {
          headers: {
            'Content-Type': 'application/json'
        }
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
        
      } catch (error) {
        console.log(`HTTP error!: ${error}`);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Task Management Board</h1>
      </div>
      <Board data={data?.data} />
    </main>
  );
}
