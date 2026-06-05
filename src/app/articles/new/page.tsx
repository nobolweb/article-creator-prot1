"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ArticleForm from "@/components/ArticleForm";
import { createArticle } from "@/lib/articles";

export default function NewArticlePage() {
  const router = useRouter();

  function handleSubmit(data: { title: string; content: string }) {
    createArticle(data);
    router.push("/");
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← 一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">新規記事作成</h1>
      </div>
      <ArticleForm onSubmit={handleSubmit} submitLabel="作成する" />
    </main>
  );
}
