"use client";

import { useState } from "react";

type Props = {
  initialTitle?: string;
  initialContent?: string;
  onSubmit: (data: { title: string; content: string }) => void;
  submitLabel?: string;
};

export default function ArticleForm({
  initialTitle = "",
  initialContent = "",
  onSubmit,
  submitLabel = "保存",
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  async function handleGenerate() {
    if (!keywords.trim()) return;
    setGenerating(true);
    setGenError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "生成エラー");
      setTitle(data.title);
      setContent(data.content);
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "生成に失敗しました");
    } finally {
      setGenerating(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* AI生成セクション */}
      <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
        <p className="text-sm font-medium text-purple-800 mb-2">✦ AIで記事を自動生成</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            className="flex-1 rounded-lg border border-purple-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="キーワードやテーマを入力（例：AI、健康、旅行）"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating || !keywords.trim()}
            className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {generating ? "生成中…" : "生成する"}
          </button>
        </div>
        {genError && <p className="mt-2 text-xs text-red-600">{genError}</p>}
      </div>

      {/* 通常フォーム */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="記事のタイトル"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">本文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            placeholder="記事の本文を入力するか、上のAI生成を使ってください"
          />
        </div>
        <button
          type="submit"
          className="self-end rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
