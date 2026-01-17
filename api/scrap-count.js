export default function handler(req, res) {
  res.status(200).json({
    tokenStartsWith: process.env.NOTION_TOKEN?.slice(0, 4),
    tokenLength: process.env.NOTION_TOKEN?.length,
  });
}
