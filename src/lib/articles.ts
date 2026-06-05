export type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEY = "articles";

function load(): Article[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(articles: Article[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

export function getArticles(): Article[] {
  return load().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getArticle(id: string): Article | undefined {
  return load().find((a) => a.id === id);
}

export function createArticle(data: Pick<Article, "title" | "content">): Article {
  const now = new Date().toISOString();
  const article: Article = { id: crypto.randomUUID(), ...data, createdAt: now, updatedAt: now };
  save([...load(), article]);
  return article;
}

export function updateArticle(id: string, data: Pick<Article, "title" | "content">): Article | null {
  const articles = load();
  const index = articles.findIndex((a) => a.id === id);
  if (index === -1) return null;
  articles[index] = { ...articles[index], ...data, updatedAt: new Date().toISOString() };
  save(articles);
  return articles[index];
}

export function deleteArticle(id: string) {
  save(load().filter((a) => a.id !== id));
}
