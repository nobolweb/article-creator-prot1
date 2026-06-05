import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "APIキーが設定されていません" }, { status: 500 });
  }

  const { keywords } = await req.json();

  if (!keywords?.trim()) {
    return NextResponse.json({ error: "キーワードを入力してください" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `以下のキーワード・テーマをもとに、日本語の記事を生成してください。

キーワード/テーマ: ${keywords}

以下のJSON形式で返してください（他の文字は一切含めないこと）:
{
  "title": "記事タイトル",
  "content": "記事本文（500〜800文字程度）"
}`,
      },
    ],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  try {
    // JSONブロックを抽出
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("JSON not found");
    const parsed = JSON.parse(match[0]);
    return NextResponse.json({ title: parsed.title, content: parsed.content });
  } catch {
    return NextResponse.json({ error: "生成に失敗しました" }, { status: 500 });
  }
}
