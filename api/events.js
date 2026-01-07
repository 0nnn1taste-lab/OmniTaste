// api/events.js

export default async function handler(req, res) {
  const { key } = req.query;

  // 1️⃣ key 없으면 차단
  if (!key) {
    return res.status(400).json({
      error: "key is required",
    });
  }

  // 2️⃣ (임시) 테스트용 더미 데이터
  // 다음 단계에서 key별 Notion 데이터로 교체할 거임
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

  // 3️⃣ 정상 응답
  res.status(200).json(events);
}
