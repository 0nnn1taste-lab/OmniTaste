export default async function handler(req, res) {
  /* ===============================
     CORS 설정 (GitHub Pages 허용)
  =============================== */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  /* ===============================
     환경변수
  =============================== */
  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const DATABASE_ID = process.env.NOTION_DATABASE_ID;

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!data.results) {
      return res.status(500).json({
        error: "No results returned from Notion",
        notionResponse: data,
      });
    }

    const events = data.results.map((page) => {
      const props = page.properties || {};

      // ✅ 제목(title 타입 자동 탐색)
      const titleProp = Object.values(props).find(
        (p) => p.type === "title"
      );
      const title =
        titleProp?.title?.[0]?.plain_text ?? "제목 없음";

      // 📅 반납일 (네 DB 컬럼명 그대로)
      const date =
        props["Publication Date"]?.date?.start ?? null;

      return { title, date };
    });

    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
