"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Cell = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";
type Game = "snake" | "aim" | "memory" | "quiz" | "reaction";

const BOARD_SIZE = 12;
const INITIAL_SNAKE: Cell[] = [
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 5, y: 7 }
];
const MEMORY_SYMBOLS = ["⚡️", "❤️", "🌿", "🛰️", "💻", "🧠"];
const QUIZ = [
  {
    question: "What stacks do I focus on?",
    options: ["React + Next.js", "Ruby on Rails", "Vue + Laravel", "Django only"],
    answer: "React + Next.js"
  },
  {
    question: "What domain do I build for?",
    options: ["Fintech", "Healthcare / Medical IoT", "Gaming", "E-commerce only"],
    answer: "Healthcare / Medical IoT"
  },
  {
    question: "How do I handle real-time data?",
    options: ["WebSocket + BLE", "Email alerts", "Manual refresh", "CSV uploads"],
    answer: "WebSocket + BLE"
  },
  {
    question: "Which desktop tech have I used?",
    options: ["Electron", "Qt", "WPF", "Swing"],
    answer: "Electron"
  }
];

const shuffledMemoryDeck = () =>
  MEMORY_SYMBOLS.concat(MEMORY_SYMBOLS)
    .map((symbol, idx) => ({ id: idx, symbol, matched: false }))
    .sort(() => Math.random() - 0.5);

export function Playground() {
  const [activeGame, setActiveGame] = useState<Game>("snake");
  const [snake, setSnake] = useState<Cell[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Cell>({ x: 8, y: 4 });
  const [direction, setDirection] = useState<Direction>("up");
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [score, setScore] = useState(0);
  const [aimRunning, setAimRunning] = useState(false);
  const [aimScore, setAimScore] = useState(0);
  const [aimMisses, setAimMisses] = useState(0);
  const [aimPosition, setAimPosition] = useState<{ top: number; left: number }>({ top: 40, left: 40 });
  const [memoryCards, setMemoryCards] = useState(shuffledMemoryDeck);
  const [memoryFlipped, setMemoryFlipped] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryComplete, setMemoryComplete] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [reactionStatus, setReactionStatus] = useState<"idle" | "waiting" | "go" | "result">("idle");
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const reactionStartRef = useRef<number | null>(null);
  const reactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleMemoryFlip = (index: number) => {
    if (memoryFlipped.length === 2 || memoryCards[index].matched || memoryFlipped.includes(index)) return;
    setMemoryFlipped((prev) => [...prev, index]);
    if (memoryFlipped.length === 1) {
      setMemoryMoves((m) => m + 1);
    }
  };

  useEffect(() => {
    if (memoryFlipped.length !== 2) return;
    const [a, b] = memoryFlipped;
    const first = memoryCards[a];
    const second = memoryCards[b];

    if (first.symbol === second.symbol) {
      setMemoryCards((prev) => {
        const next = prev.map((card, idx) =>
          idx === a || idx === b ? { ...card, matched: true } : card
        );
        if (next.every((c) => c.matched)) setMemoryComplete(true);
        return next;
      });
      setMemoryFlipped([]);
    } else {
      const timeout = setTimeout(() => setMemoryFlipped([]), 650);
      return () => clearTimeout(timeout);
    }
  }, [memoryFlipped, memoryCards]);

  const resetMemory = () => {
    setMemoryCards(shuffledMemoryDeck());
    setMemoryFlipped([]);
    setMemoryMoves(0);
    setMemoryComplete(false);
  };

  const currentQuiz = QUIZ[quizIndex];

  const handleQuizAnswer = (option: string) => {
    if (!currentQuiz || quizFeedback === "Correct!") return;
    const correct = option === currentQuiz.answer;
    setQuizFeedback(correct ? "Correct!" : "Try again");
    if (correct) {
      setQuizScore((s) => s + 1);
      setTimeout(() => {
        setQuizFeedback(null);
        setQuizIndex((idx) => (idx + 1 < QUIZ.length ? idx + 1 : idx));
      }, 600);
      if (quizIndex + 1 >= QUIZ.length) {
        setQuizFeedback("All done!");
      }
      return;
    }
    setTimeout(() => setQuizFeedback(null), 600);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFeedback(null);
  };

  const startReaction = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    setReactionStatus("waiting");
    setReactionTime(null);
    reactionStartRef.current = null;
    reactionTimerRef.current = setTimeout(() => {
      reactionStartRef.current = performance.now();
      setReactionStatus("go");
    }, Math.random() * 1200 + 800);
  };

  const handleReactionClick = () => {
    if (reactionStatus === "waiting") {
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
      setReactionStatus("result");
      setReactionTime(-1);
      return;
    }
    if (reactionStatus === "go" && reactionStartRef.current) {
      const elapsed = performance.now() - reactionStartRef.current;
      setReactionStatus("result");
      setReactionTime(Math.round(elapsed));
    }
  };

  const resetReaction = () => {
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    setReactionStatus("idle");
    setReactionTime(null);
    reactionStartRef.current = null;
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
            { id: "aim", label: "Aim Trainer" },
            { id: "memory", label: "Memory Match" },
            { id: "quiz", label: "Profile Quiz" },
            { id: "reaction", label: "Reaction Timer" }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveGame(tab.id as Game)}
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

        {(() => {
          switch (activeGame) {
            case "snake":
              return (
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
              );
            case "aim":
              return (
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
              );
            case "memory":
              return (
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Memory Match</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Flip two cards to find a pair. Clear the board with the fewest moves you can.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={resetMemory}
                        className="rounded-full bg-indigoBrand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                      >
                        Restart
                      </button>
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                        Moves: {memoryMoves}
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                        Pairs: {memoryCards.filter((c) => c.matched).length / 2} / {MEMORY_SYMBOLS.length}
                      </div>
                      {memoryComplete && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100">
                          Completed! Try again?
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="card w-full max-w-xl">
                    <div className="grid grid-cols-4 gap-3">
                      {memoryCards.map((card, idx) => {
                        const isFlipped = memoryFlipped.includes(idx) || card.matched;
                        return (
                          <button
                            key={card.id}
                            type="button"
                            onClick={() => handleMemoryFlip(idx)}
                            className={`relative flex aspect-square items-center justify-center rounded-xl border text-2xl font-bold transition ${
                              isFlipped
                                ? "border-indigoBrand bg-indigoBrand/10 text-indigoBrand dark:border-indigoBrand/60 dark:bg-indigoBrand/10 dark:text-indigoBrand"
                                : "border-slate-200 bg-white text-slate-500 hover:border-indigoBrand/60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                            } ${card.matched ? "shadow-inner shadow-emerald-500/30" : ""}`}
                          >
                            {isFlipped ? card.symbol : "?"}
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                      Flip two cards to reveal. Matched pairs stay face up.
                    </p>
                  </div>
                </div>
              );
            case "quiz":
              return (
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Profile Quiz</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Quick questions about my work—just for fun. See how much you remember from the page.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={resetQuiz}
                        className="rounded-full bg-indigoBrand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                      >
                        Restart
                      </button>
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                        Score: {quizScore} / {QUIZ.length}
                      </div>
                      {quizIndex >= QUIZ.length - 1 && quizFeedback === "All done!" && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-100">
                          Completed!
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="card w-full max-w-xl space-y-4">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {currentQuiz?.question ?? "Thanks for playing!"}
                    </p>
                    <div className="grid gap-3">
                      {currentQuiz?.options.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleQuizAnswer(opt)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {quizFeedback && (
                      <p
                        className={`text-sm font-semibold ${
                          quizFeedback === "Correct!" || quizFeedback === "All done!"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {quizFeedback}
                      </p>
                    )}
                  </div>
                </div>
              );
            case "reaction":
              return (
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Reaction Timer</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Click when the panel turns ready. Too soon counts as a false start.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={startReaction}
                        className="rounded-full bg-indigoBrand px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
                      >
                        Start
                      </button>
                      <button
                        type="button"
                        onClick={resetReaction}
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigoBrand hover:text-indigoBrand dark:border-slate-700 dark:text-slate-200"
                      >
                        Reset
                      </button>
                      {reactionTime !== null && reactionTime >= 0 && (
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                          Reaction: {reactionTime} ms
                        </div>
                      )}
                      {reactionTime === -1 && (
                        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-900/40 dark:text-rose-100">
                          Too soon! Try again.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="card w-full max-w-xl">
                    <button
                      type="button"
                      onClick={handleReactionClick}
                      className={`flex h-64 w-full items-center justify-center rounded-2xl text-lg font-semibold transition ${
                        reactionStatus === "go"
                          ? "bg-emerald-400 text-emerald-950 shadow-inner shadow-emerald-300/60 dark:bg-emerald-500 dark:text-emerald-950"
                          : reactionStatus === "waiting"
                            ? "bg-amber-200 text-amber-900 shadow-inner shadow-amber-300/60 dark:bg-amber-300 dark:text-amber-900"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {reactionStatus === "go"
                        ? "Click!"
                        : reactionStatus === "waiting"
                          ? "Wait for green..."
                          : reactionStatus === "result" && reactionTime !== null
                            ? reactionTime === -1
                              ? "False start"
                              : `Your time: ${reactionTime} ms`
                            : "Press Start"}
                    </button>
                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                      Tip: Start, wait for green, then click as fast as you can.
                    </p>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </section>
  );
}
