"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getArticles, type Article } from "@/lib/articles";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">記事一覧</h1>
        <Link
          href="/articles/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          ＋ 新規作成
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-gray-400 py-20">記事がまだありません</p>
      ) : (
        <div className="flex flex-col gap-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}
