import Board from "./components/Board";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Task Management Board</h1>
      </div>
      <Board />
    </main>
  );
}
