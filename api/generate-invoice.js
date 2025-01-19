import { Bot } from "grammy"; // Bot library

const BOT_TOKEN = "7966918351:AAHTAVeGB9MwAwSbH1Jf3phheGjpVqIOWEU"; // Replace with your actual bot token
const bot = new Bot(BOT_TOKEN); // Initialize the bot

export default async function handler(req, res) {
  if (req.method === "POST") {
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
      res.status(200).json({ invoiceLink });
    } catch (error) {
      console.error("Error generating invoice link:", error);
      res.status(500).json({ error: "Failed to generate invoice" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
