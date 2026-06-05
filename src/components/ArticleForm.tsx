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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  }

  return (
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
          placeholder="記事の本文を入力してください"
        />
      </div>
      <button
        type="submit"
        className="self-end rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}
