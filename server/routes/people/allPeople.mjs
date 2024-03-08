import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

// Get all data from People Table
router.get("/api/people", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const databaseId = process.env.NOTION_DATABASE_ID_PEOPLE;

  try {
    const result = await notion.databases.query({ database_id: databaseId });
    const relevantData = result.results;

    response.json({ message: relevantData });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
