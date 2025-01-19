import { Bot } from "grammy";

const bot = new Bot("YOUR_BOT_TOKEN"); // Replace with your bot token

export default async function handler(req, res) {
  if (req.method === "POST") {
    const title = "Test Product";
    const description = "Test description";
    const payload = "{}";
    const currency = "XTR";
    const prices = [{ amount: 1, label: "Test Product" }];
  
    try {
      const invoiceLink = await bot.api.createInvoiceLink(
        title,
        description,
        payload,
        "", // Provider token should be empty for Telegram Stars
        currency,
        prices
      );
      res.status(200).json({ invoiceLink });
    } catch (error) {
      console.error("Error generating invoice:", error);
      res.status(500).json({ error: "Failed to generate invoice link" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
