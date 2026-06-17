const express = require("express");
const Canvas = require("@napi-rs/canvas");

const app = express();

app.get("/", (req, res) => {
  res.send("🦫 Capy Shop Welcome API Online");
});

app.get("/welcome", async (req, res) => {
  try {
    const avatarURL = req.query.avatar;
    const username = decodeURIComponent(req.query.username || "Member");
    const count = req.query.count || "0";

    const canvas = Canvas.createCanvas(1200, 500);
    const ctx = canvas.getContext("2d");

    // ===== BACKGROUND CAPYBARA =====
    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/1344720407953150004/1516820432362279014/4VnTvTyyb65ft28t6TszhEqYAzGHAi6OIi3SggSx.jpg"
    );

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Overlay tối
    ctx.fillStyle = "rgba(0,0,0,0.50)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ===== CARD =====
    ctx.fillStyle = "rgba(25,25,25,0.78)";
    ctx.beginPath();
    ctx.roundRect(40, 40, 1120, 420, 30);
    ctx.fill();

    // Viền xanh Capy Shop
    ctx.strokeStyle = "#8DDC65";
    ctx.lineWidth = 5;
    ctx.stroke();

    // ===== AVATAR =====
    const avatar = await Canvas.loadImage(avatarURL);

    // Glow
    ctx.shadowColor = "#8DDC65";
    ctx.shadowBlur = 50;

    ctx.save();
    ctx.beginPath();
    ctx.arc(180, 250, 115, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 65, 135, 230, 230);
    ctx.restore();

    ctx.shadowBlur = 0;

    // Viền avatar
    ctx.beginPath();
    ctx.arc(180, 250, 118, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();

    // ===== TITLE =====
    ctx.fillStyle = "#8DDC65";
    ctx.font = "bold 58px Sans";
    ctx.fillText("🦫 CAPY SHOP", 350, 115);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px Sans";
    ctx.fillText("WELCOME!", 350, 185);

    // ===== USERNAME =====
    let displayName = username;

    if (displayName.length > 22) {
      displayName = displayName.slice(0, 22) + "...";
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px Sans";
    ctx.fillText(displayName, 350, 265);

    // ===== MEMBER COUNT =====
    ctx.fillStyle = "#8DDC65";
    ctx.font = "bold 34px Sans";
    ctx.fillText(`Member #${count}`, 350, 325);

    // ===== DESCRIPTION =====
    ctx.fillStyle = "#ffffff";
    ctx.font = "28px Sans";
    ctx.fillText(
      "Cảm ơn bạn đã tham gia cộng đồng Capy Shop!",
      350,
      385
    );

    ctx.fillText(
      "Nhanh chóng • Uy tín • Chuyên nghiệp",
      350,
      425
    );

    // ===== FOOTER =====
    const now = new Date();

    ctx.fillStyle = "#8DDC65";
    ctx.font = "20px Sans";
    ctx.fillText(
      `Joined: ${now.toLocaleString("vi-VN")}`,
      50,
      485
    );

    // ===== OUTPUT =====
    res.set("Content-Type", "image/png");
    res.send(canvas.toBuffer("image/png"));
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🦫 Capy Shop API Started On Port ${PORT}`);
});    );

    ctx.fillText(
      "Chúc bạn có những trải nghiệm tuyệt vời 🥰",
      350,
      430
    );

    // Footer
    ctx.fillStyle = "#8DDC65";
    ctx.font = "24px Sans";
    ctx.fillText(
      `Generated: ${new Date().toLocaleString("vi-VN")}`,
      40,
      485
    );

    res.set("Content-Type", "image/png");
    res.send(canvas.toBuffer("image/png"));
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});

app.get("/", (req, res) => {
  res.send("Capy Shop Welcome API Online");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Capy Shop API Started");
});
