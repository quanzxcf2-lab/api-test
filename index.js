const express = require("express");
const Canvas = require("@napi-rs/canvas");

const app = express();

// ===== BO GÓC CARD =====
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// ===== AUTO FONT =====
function applyText(canvas, text, maxWidth, startSize) {
  const ctx = canvas.getContext("2d");
  let size = startSize;

  do {
    ctx.font = `bold ${size}px Sans`;
    size--;
  } while (ctx.measureText(text).width > maxWidth && size > 20);

  return ctx.font;
}

app.get("/", (req, res) => {
  res.send("🦫 Capy Shop Welcome API Online");
});

app.get("/welcome", async (req, res) => {
  try {

    const avatarURL = req.query.avatar;

    if (!avatarURL) {
      return res.status(400).send("Missing avatar parameter");
    }

    const username = decodeURIComponent(req.query.username || "Member");
    const count = req.query.count || "0";

    const canvas = Canvas.createCanvas(1200, 500);
    const ctx = canvas.getContext("2d");

    // ===== BACKGROUND =====
    try {

      const background = await Canvas.loadImage(
        "https://media.craiyon.com/2025-10-17/z060eYsOSY2hVXSoPImsyA.webp"
      );

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    } catch {

      ctx.fillStyle = "#64584d";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    // Overlay
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ===== CARD =====

    // Glow ngoài
    ctx.shadowColor = "#8DDC65";
    ctx.shadowBlur = 40;

    ctx.fillStyle = "rgba(20,20,20,0.88)";
    roundRect(ctx, 40, 40, 1120, 420, 35);
    ctx.fill();

    ctx.shadowBlur = 0;

    // Viền ngoài
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#8DDC65";
    roundRect(ctx, 40, 40, 1120, 420, 35);
    ctx.stroke();

    // Viền trong
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    roundRect(ctx, 50, 50, 1100, 400, 30);
    ctx.stroke();

    // ===== AVATAR =====

    const avatar = await Canvas.loadImage(avatarURL);

    // Glow avatar
    ctx.shadowColor = "#8DDC65";
    ctx.shadowBlur = 60;

    ctx.beginPath();
    ctx.arc(180, 250, 125, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(141,220,101,0.20)";
    ctx.fill();

    ctx.shadowBlur = 0;

    // Viền trắng
    ctx.beginPath();
    ctx.arc(180, 250, 112, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    // Avatar tròn
    ctx.save();

    ctx.beginPath();
    ctx.arc(180, 250, 100, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(avatar, 80, 150, 200, 200);

    ctx.restore();

    // Viền xanh
    ctx.beginPath();
    ctx.arc(180, 250, 105, 0, Math.PI * 2);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#8DDC65";
    ctx.stroke();

    // Viền sáng ngoài
    ctx.beginPath();
    ctx.arc(180, 250, 115, 0, Math.PI * 2);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.stroke();
// ===== TEXT =====

    // CAPY SHOP
    ctx.shadowColor = "#8DDC65";
    ctx.shadowBlur = 20;

    ctx.fillStyle = "#8DDC65";
    ctx.font = "bold 70px Sans";
    ctx.fillText("CAPY SHOP", 340, 115);

    ctx.shadowBlur = 0;

    // WELCOME
    ctx.shadowColor = "black";
    ctx.shadowBlur = 15;

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 66px Sans";
    ctx.fillText("WELCOME!", 340, 190);

    ctx.shadowBlur = 0;

    // USERNAME
    ctx.fillStyle = "#FFFFFF";
    ctx.font = applyText(canvas, username, 760, 54);
    ctx.fillText(username, 340, 280);

    // MEMBER COUNT
    ctx.fillStyle = "#8DDC65";
    ctx.font = "bold 40px Sans";
    ctx.fillText(`Member #${count}`, 340, 340);

    // ĐƯỜNG KẺ
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(340, 360);
    ctx.lineTo(1080, 360);
    ctx.stroke();

    // MÔ TẢ
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "26px Sans";

    ctx.fillText(
      "Cảm ơn bạn đã tham gia cộng đồng CAPY SHOP!",
      340,
      405
    );

    ctx.fillStyle = "#D9D9D9";
    ctx.font = "20px Sans";

    ctx.fillText(
      "Nhanh Chóng • Uy Tín • Chuyên Nghiệp • Thân Thiện",
      340,
      440
    );
// ===== FOOTER =====

    ctx.fillStyle = "#8DDC65";
    ctx.font = "18px Sans";

    ctx.fillText(
      "Created by Capy Shop",
      55,
      485
    );

    // ===== DECORATION =====

    ctx.fillStyle = "rgba(141,220,101,0.4)";

    ctx.beginPath();
    ctx.arc(1080, 100, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1040, 130, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(1100, 150, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(980, 80, 2, 0, Math.PI * 2);
    ctx.fill();

    // ===== OUTPUT =====

    const buffer = canvas.toBuffer("image/png");

    res.setHeader("Content-Type", "image/png");
    res.end(buffer);

  } catch (err) {

    console.error(err);

    res.status(500).send(err.toString());

  }
});

// ===== SERVER =====

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`🦫 Server running on port ${PORT}`);

}); 
