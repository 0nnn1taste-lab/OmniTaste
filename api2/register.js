export default function handler(req, res) {
  const key = crypto.randomUUID();

  console.log("NEW USER KEY:", key);

  const widgetUrl =
    `https://0nnn1taste-lab.github.io/OmniTaste/card/index.html?key=${key}`;

  res.writeHead(302, {
    Location: widgetUrl,
  });
  res.end();
}
