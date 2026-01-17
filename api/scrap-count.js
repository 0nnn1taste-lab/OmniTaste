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
    let latestDate = null;

    for (const dbId of DATABASE_IDS) {
      if (!dbId) continue;

      // 전체 개수
      const countRes = await notion.databases.query({
        database_id: dbId,
      });
      total += countRes.results.length;

      // 가장 최근 스크랩 1개
      const latestRes = await notion.databases.query({
        database_id: dbId,
        sorts: [
          {
            timestamp: "last_edited_time",
            direction: "descending",
          },
        ],
        page_size: 1,
      });

      const page = latestRes.results[0];
      if (page) {
        const edited = page.last_edited_time;
        if (!latestDate || edited > latestDate) {
          latestDate = edited;
        }
      }
    }

    res.status(200).json({
      total,
      lastUpdated: latestDate, // ISO string
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
