import Link from "next/link";
import type { Article } from "@/lib/articles";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
    >
      <h2 className="font-semibold text-gray-900 truncate">{article.title}</h2>
      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{article.content}</p>
      <p className="mt-2 text-xs text-gray-400">
        {new Date(article.updatedAt).toLocaleDateString("ja-JP")}
      </p>
    </Link>
  );
}
