import { Bot } from "grammy"; // Bot library
import express from "express"; // Web server library

const BOT_TOKEN = "7966918351:AAHTAVeGB9MwAwSbH1Jf3phheGjpVqIOWEU"; // Replace with your actual bot token
const bot = new Bot(BOT_TOKEN); // Initialize the bot
const app = express(); // Initialize the Express app
const PORT = 3000; // Port for the Express server

app.use(express.json()); // Parse JSON requests

// Endpoint to generate invoice links
app.post("/generate-invoice", async (req, res) => {
  try {
    // Product details
    const title = "Premium Subscription"; // Product title
    const description = "Access all premium features"; // Product description
    const payload = JSON.stringify({ userId: req.body.userId }); // Custom payload
    const currency = "XTR"; // Telegram Stars currency
    const prices = [{ label: "Subscription Plan", amount: 100 }]; // Price in Stars (100 = 1.00 Stars)

    // Create an invoice link
    const invoiceLink = await bot.api.createInvoiceLink(
      title,
      description,
      payload,
      "", // Empty provider token for Telegram Stars
      currency,
      prices
    );

    // Respond with the invoice link
    res.json({ invoiceLink });
  } catch (error) {
    console.error("Error generating invoice link:", error);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});

// Start the bot (not mandatory for the Mini App but good for testing)
bot.start();