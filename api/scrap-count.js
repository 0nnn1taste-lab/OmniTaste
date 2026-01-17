import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_IDS = [
  process.env.DB_1,
  process.env.DB_2,
  process.env.DB_3,
  process.env.DB_4,
  process.env.DB_5,
  process.env.DB_6,
  process.env.DB_7,
  process.env.DB_8,
];

export default async function handler(req, res) {
  try {
    let total = 0;

    for (const dbId of DATABASE_IDS) {
      if (!dbId) continue;

      const response = await notion.databases.query({
        database_id: dbId,
        page_size: 1,
      });

      total += response.results.length;
    }

    res.status(200).json({
      total,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ error: "notion fetch failed" });
  }
}
