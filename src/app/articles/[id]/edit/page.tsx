"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import ArticleForm from "@/components/ArticleForm";
import { getArticle, updateArticle, type Article } from "@/lib/articles";

export default function EditArticlePage() {
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

  function handleSubmit(data: { title: string; content: string }) {
    updateArticle(id, data);
    router.push(`/articles/${id}`);
  }

  if (!article) return null;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href={`/articles/${id}`} className="text-sm text-gray-500 hover:text-gray-700">
          ← 記事に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">記事を編集</h1>
      </div>
      <ArticleForm
        initialTitle={article.title}
        initialContent={article.content}
        onSubmit={handleSubmit}
        submitLabel="更新する"
      />
    </main>
  );
}
