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
  const [activeGame, setActiveGame] = useState<"snake" | "aim">("snake");
  const [snake, setSnake] = useState<Cell[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Cell>({ x: 8, y: 4 });
  const [direction, setDirection] = useState<Direction>("up");
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [score, setScore] = useState(0);
  const [aimRunning, setAimRunning] = useState(false);
  const [aimScore, setAimScore] = useState(0);
  const [aimMisses, setAimMisses] = useState(0);
  const [aimPosition, setAimPosition] = useState<{ top: number; left: number }>({ top: 40, left: 40 });

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

  useEffect(() => {
    if (!aimRunning) return;
    const id = setInterval(() => {
      setAimPosition({
        top: Math.random() * 80 + 5,
        left: Math.random() * 80 + 5
      });
      setAimMisses((m) => m + 1);
    }, 1200);
    return () => clearInterval(id);
  }, [aimRunning]);

  const handleAimClick = (hit: boolean) => {
    if (!aimRunning) return;
    if (hit) {
      setAimScore((s) => s + 1);
      setAimMisses((m) => (m > 0 ? m - 1 : m));
      setAimPosition({
        top: Math.random() * 80 + 5,
        left: Math.random() * 80 + 5
      });
    } else {
      setAimMisses((m) => m + 1);
    }
  };

  const resetAim = () => {
    setAimScore(0);
    setAimMisses(0);
    setAimPosition({ top: 40, left: 40 });
    setAimRunning(true);
  };

  return (
    <section className="section bg-slate-50/60 dark:bg-slate-900/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigoBrand/70">Playground</p>
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Have a quick play</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Light games to break the scroll. Snake speeds up as you score; Aim Trainer checks your reactions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            { id: "snake", label: "Snake" },
            { id: "aim", label: "Aim Trainer" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveGame(tab.id as "snake" | "aim")}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeGame === tab.id
                  ? "border-indigoBrand bg-indigoBrand/10 text-indigoBrand"
                  : "border-slate-200 text-slate-600 hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeGame === "snake" ? (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Snake</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Use WASD or arrow keys. Grab markers, avoid walls, and your speed will ramp as you grow.
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
                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                  Speed: {Math.round(speed)} ms
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
                Tip: tap Play, then use WASD or arrow keys. Speed tightens as your score climbs.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-3">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Aim Trainer</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Click the moving marker as it jumps. Simple reaction check with hits vs. misses.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => (aimRunning ? setAimRunning(false) : setAimRunning(true))}
                  className="rounded-full bg-indigoBrand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                >
                  {aimRunning ? "Pause" : "Start"}
                </button>
                <button
                  type="button"
                  onClick={resetAim}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-slate-200"
                >
                  Reset
                </button>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                  Hits: {aimScore}
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                  Misses: {aimMisses}
                </div>
              </div>
            </div>
            <div
              className="card relative h-80 w-full max-w-xl overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
              onClick={() => handleAimClick(false)}
            >
              <div
                className="absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-emerald-950 shadow-lg ring-2 ring-emerald-200 transition hover:scale-105 dark:bg-emerald-300 dark:text-emerald-900 dark:ring-emerald-900/50"
                style={{ top: `${aimPosition.top}%`, left: `${aimPosition.left}%`, transform: "translate(-50%, -50%)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAimClick(true);
                }}
              >
                Hit
              </div>
              <p className="absolute bottom-4 left-4 text-xs text-slate-500 dark:text-slate-400">
                Click the marker. Click elsewhere counts as a miss.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
