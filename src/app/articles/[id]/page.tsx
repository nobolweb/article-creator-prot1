"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getArticle, deleteArticle, type Article } from "@/lib/articles";

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const found = getArticle(id);
    if (!found) {
      router.replace("/");
      return;
    }
    setArticle(found);
  }, [id, router]);

  function handleDelete() {
    if (!confirm("この記事を削除しますか？")) return;
    deleteArticle(id);
    router.push("/");
  }

  if (!article) return null;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← 一覧に戻る
        </Link>
        <div className="flex gap-2">
          <Link
            href={`/articles/${id}/edit`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            編集
          </Link>
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            削除
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h1>
      <p className="text-xs text-gray-400 mb-8">
        {new Date(article.updatedAt).toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="whitespace-pre-wrap text-gray-800 leading-7">{article.content}</div>
    </main>
  );
}
