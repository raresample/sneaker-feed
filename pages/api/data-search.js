import { query } from "../../lib/db";

export default async function handler(req, res) {
  const title = req.body.title;
  try {
    const querySql = "SELECT title, sku, url, detail, images, price FROM end_products WHERE title LIKE '%nike%'";
    const valueParams = [title];
    const data = await query({ query: querySql });
    res.status(200).json({ products: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}