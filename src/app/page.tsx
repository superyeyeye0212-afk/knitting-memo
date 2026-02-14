"use client";

import { useState, useEffect } from "react";

type Memo = {
  id: string;
  project: string;
  yarn: string;
  needle: string;
  note: string;
};

const STORAGE_KEY = "knitting-memos";

function loadMemos(): Memo[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveMemos(memos: Memo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}

export default function Home() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [project, setProject] = useState("");
  const [yarn, setYarn] = useState("");
  const [needle, setNeedle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setMemos(loadMemos());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!project.trim()) return;

    const newMemo: Memo = {
      id: Date.now().toString(),
      project: project.trim(),
      yarn: yarn.trim(),
      needle: needle.trim(),
      note: note.trim(),
    };

    const updated = [newMemo, ...memos];
    setMemos(updated);
    saveMemos(updated);

    setProject("");
    setYarn("");
    setNeedle("");
    setNote("");
  }

  function handleDelete(id: string) {
    const updated = memos.filter((m) => m.id !== id);
    setMemos(updated);
    saveMemos(updated);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-2xl px-4 py-8 sm:py-16">
        <h1 className="text-4xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-10">
          編み物メモ
        </h1>

        {/* 入力フォーム */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                プロジェクト名 *
              </label>
              <input
                type="text"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="例: ベビーセーター"
                className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                糸
              </label>
              <input
                type="text"
                value={yarn}
                onChange={(e) => setYarn(e.target.value)}
                placeholder="例: メリノウール 並太"
                className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                針
              </label>
              <input
                type="text"
                value={needle}
                onChange={(e) => setNeedle(e.target.value)}
                placeholder="例: 棒針 8号"
                className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              メモ
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="例: 身頃は10号で編む。袖は8号。"
              rows={3}
              className="w-full rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium px-6 py-3 rounded hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            保存する
          </button>
        </form>

        {/* 一覧表示 */}
        {memos.length === 0 ? (
          <p className="text-center text-zinc-400">まだメモがありません</p>
        ) : (
          <div className="space-y-4">
            {memos.map((memo) => (
              <div
                key={memo.id}
                className="bg-white dark:bg-zinc-900 rounded-lg p-5 shadow"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {memo.project}
                  </h2>
                  <button
                    onClick={() => handleDelete(memo.id)}
                    className="text-sm text-red-500 hover:text-red-700 transition-colors px-2 py-1"
                  >
                    削除
                  </button>
                </div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                  {memo.yarn && <p>糸: {memo.yarn}</p>}
                  {memo.needle && <p>針: {memo.needle}</p>}
                  {memo.note && <p className="mt-2 whitespace-pre-wrap">{memo.note}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
