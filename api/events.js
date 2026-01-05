export default async function handler(req, res) {
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
          "Content-Type": "application/json"
        }
      }
    );

    const data = await response.json();

    // 🔍 디버깅용: results 없으면 그대로 보여주기
    if (!data.results) {
      return res.status(500).json({
        error: "No results returned from Notion",
        notionResponse: data
      });
    }

    const events = data.results.map(page => {
      const props = page.properties || {};

  const titleProperty = Object.values(props).find(
  (p) => p.type === "title"
);

const title =
  titleProperty?.title?.[0]?.plain_text ?? "제목 없음";


      const date =
        props["Publication Date"]?.date?.start ?? null;

      return { title, date };
    });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
