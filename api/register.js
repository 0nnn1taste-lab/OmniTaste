// api/register.js

import fetch from "node-fetch";

export default async function handler(req, res) {
  // CORS (안전)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const userDbId = req.query.db;

  // 1️⃣ 사용자 DB ID 필수
  if (!userDbId) {
    return res.status(400).send("Missing db parameter");
  }

  // 2️⃣ key 생성
  const key = crypto.randomUUID();

  // 3️⃣ 관리용 DB에 저장
  const notionRes = await fetch(
    "https://api.notion.com/v1/pages",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: {
          database_id: process.env.CONNECTION_DB_ID,
        },
        properties: {
          key: {
            title: [
              {
                text: { content: key },
              },
            ],
          },
          db_id: {
            rich_text: [
              {
                text: { content: userDbId },
              },
            ],
          },
          created_at: {
            date: {
              start: new Date().toISOString(),
            },
          },
        },
      }),
    }
  );

  if (!notionRes.ok) {
    const errorText = await notionRes.text();
    console.error(errorText);
    return res.status(500).send("Failed to save connection");
  }

  // 4️⃣ 위젯으로 이동
  const widgetUrl =
    `https://0nnn1taste-lab.github.io/OmniTaste/card/index.html?key=${key}`;

  res.writeHead(302, { Location: widgetUrl });
  res.end();
}
