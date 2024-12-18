import { sql } from "@vercel/postgres";

export async function FetchData() {
  try {
    const data = await sql`SELECT * FROM blogit`;
    console.log(data.rows);
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data");
  }
}
