// api/events.js

export default function handler(req, res) {
  // ✅ CORS 헤더 (이게 핵심)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // preflight 요청 대응
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { key } = req.query;

  // key 없으면 차단
  if (!key) {
    return res.status(400).json({
      error: "key is required",
    });
  }

  // 테스트용 더미 데이터
  const events = [
    {
      title: "어린 왕자",
      date: "2026-01-10",
    },
    {
      title: "해리포터와 마법사의 돌",
      date: "2026-01-15",
    },
  ];

  // 정상 응답
  res.status(200).json(events);
}
