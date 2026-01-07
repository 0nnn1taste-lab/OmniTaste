// api/events.js

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ error: "key is required" });
  }

  try {
    /** 1️⃣ fdf DB에서 key로 사용자 DB 찾기 */
    const mappingRes = await fetch(
      `https://api.notion.com/v1/databases/${process.env.CONNECTION_DB_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "key",
            title: {
              equals: key,
            },
          },
        }),
      }
    );

    const mappingData = await mappingRes.json();

    if (!mappingData.results || mappingData.results.length === 0) {
      return res.status(404).json({ error: "Invalid key" });
    }

    const userDbId =
      mappingData.results[0].properties.db_id.rich_text[0].text.content;

    /** 2️⃣ ON LOAN DB 조회 */
    const eventsRes = await fetch(
      `https://api.notion.com/v1/databases/${userDbId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      }
    );

    const eventsData = await eventsRes.json();

    /** 3️⃣ 위젯용 데이터로 변환 */
    const events = eventsData.results
      .map((page) => {
        const title =
          page.properties["BOOK TITLE"]?.title?.[0]?.text?.content;
        const date = page.properties["DUE DATE"]?.date?.start;

        if (!title || !date) return null;

        return { title, date };
      })
      .filter(Boolean);

    return res.status(200).json(events);
  } catch (err) {
    console.error("events error:", err);
    return res.status(500).json({ error: "Failed to load events" });
  }
}
