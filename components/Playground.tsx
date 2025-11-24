"use client";

import { useEffect, useMemo, useState } from "react";

type Cell = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";

const BOARD_SIZE = 12;
const INITIAL_SNAKE: Cell[] = [
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 5, y: 7 }
];

export function Playground() {
  const [snake, setSnake] = useState<Cell[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Cell>({ x: 8, y: 4 });
  const [direction, setDirection] = useState<Direction>("up");
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [score, setScore] = useState(0);

  const cellKey = (c: Cell) => `${c.x}-${c.y}`;

  const occupied = useMemo(() => new Set(snake.map(cellKey)), [snake]);
  const speed = useMemo(() => Math.max(80, 170 - score * 8), [score]);

  const randomFood = (occupiedSet: Set<string>) => {
    let x = 0;
    let y = 0;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
    } while (occupiedSet.has(`${x}-${y}`));
    return { x, y };
  };

  const move = () => {
    setSnake((current) => {
      const head = current[0];
      const next: Cell = {
        x: head.x + (direction === "left" ? -1 : direction === "right" ? 1 : 0),
        y: head.y + (direction === "up" ? -1 : direction === "down" ? 1 : 0)
      };

      if (next.x < 0 || next.y < 0 || next.x >= BOARD_SIZE || next.y >= BOARD_SIZE) {
        setStatus("over");
        return current;
      }

      const occupiedCurrent = new Set(current.map(cellKey));
      const nextKey = cellKey(next);
      if (occupiedCurrent.has(nextKey)) {
        setStatus("over");
        return current;
      }

      const newSnake = [next, ...current];
      if (next.x === food.x && next.y === food.y) {
        setFood(randomFood(new Set(newSnake.map(cellKey))));
        setScore((s) => s + 1);
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  };

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(move, speed);
    return () => clearInterval(id);
  }, [status, speed, direction, move]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (status === "over") return;
      const key = event.key.toLowerCase();
      if (key === "w" || key === "arrowup") setDirection((d) => (d === "down" ? d : "up"));
      if (key === "s" || key === "arrowdown") setDirection((d) => (d === "up" ? d : "down"));
      if (key === "a" || key === "arrowleft") setDirection((d) => (d === "right" ? d : "left"));
      if (key === "d" || key === "arrowright") setDirection((d) => (d === "left" ? d : "right"));
      if (status === "idle") setStatus("running");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [status]);

  const startOver = () => {
    setSnake(INITIAL_SNAKE);
    setFood(randomFood(new Set(INITIAL_SNAKE.map(cellKey))));
    setDirection("up");
    setStatus("running");
    setScore(0);
  };

  return (
    <section className="section bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigoBrand/70">Playground</p>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Micro Snake</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A tiny keyboard game to keep things fun. Use WASD or arrow keys. Grab the markers, avoid the walls,
            and don’t bite yourself.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startOver}
              className="rounded-full bg-indigoBrand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
            >
              {status === "running" ? "Restart" : "Play"}
            </button>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
              Score: {score}
            </div>
            {status === "over" && (
              <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-900/40 dark:text-rose-100">
                Game over — hit Play to try again
              </span>
            )}
          </div>
        </div>
        <div className="card w-full max-w-xl">
          <div
            className="grid gap-1 rounded-2xl bg-slate-50 p-3 shadow-inner dark:bg-slate-900"
            style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
              const x = idx % BOARD_SIZE;
              const y = Math.floor(idx / BOARD_SIZE);
              const key = `${x}-${y}`;
              const isSnake = occupied.has(key);
              const isFood = food.x === x && food.y === y;
              return (
                <div
                  key={key}
                  className={`aspect-square rounded-[6px] border border-slate-200/50 bg-white transition dark:border-slate-700/60 dark:bg-slate-800 ${
                    isSnake ? "bg-indigoBrand/80 shadow-inner shadow-indigoBrand/40" : ""
                  } ${isFood ? "bg-emerald-400/80 shadow-md shadow-emerald-300/60" : ""}`}
                />
              );
            })}
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Tip: tap Play, then use WASD or arrow keys. Refresh to reset if the keys don’t respond after switching tabs.
          </p>
        </div>
      </div>
    </section>
  );
}
