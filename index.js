const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("🦫 Capy Shop API Online");
});

app.get("/welcome", async (req, res) => {
  const avatar = encodeURIComponent(
    req.query.avatar ||
    "https://cdn.discordapp.com/embed/avatars/0.png"
  );

  const username = encodeURIComponent(
    req.query.username || "Member"
  );

  const count = encodeURIComponent(
    req.query.count || "0"
  );

  const background =
    "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1200&q=80";

  const cardUrl =
    `https://api.popcat.xyz/welcomecard` +
    `?background=${encodeURIComponent(background)}` +
    `&avatar=${avatar}` +
    `&text1=${username}` +
    `&text2=Member%20%23${count}`;

  res.redirect(cardUrl);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🦫 Server running on port ${PORT}`);
}); 
