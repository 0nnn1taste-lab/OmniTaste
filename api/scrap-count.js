import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const DATABASE_IDS = [
  process.env.DB1,
  process.env.DB2,
  process.env.DB3,
  process.env.DB4,
  process.env.DB5,
  process.env.DB6,
  process.env.DB7,
  process.env.DB8,
];

export default async function handler(req, res) {
  try {
    let total = 0;

    for (const dbId of DATABASE_IDS) {
      if (!dbId) continue;

      const response = await notion.databases.query({
        database_id: dbId,
      });

      total += response.results.length;
    }

    res.status(200).json({
      total,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
}
