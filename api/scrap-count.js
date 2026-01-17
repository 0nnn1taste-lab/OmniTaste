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
  const result = [];

  for (let i = 0; i < DATABASE_IDS.length; i++) {
    const dbId = DATABASE_IDS[i];

    try {
      const response = await notion.databases.query({
        database_id: dbId,
      });

      result.push({
        db: i + 1,
        id: dbId,
        count: response.results.length,
        hasMore: response.has_more,
      });
    } catch (e) {
      result.push({
        db: i + 1,
        id: dbId,
        error: e.message,
      });
    }
  }

  res.status(200).json(result);
}
