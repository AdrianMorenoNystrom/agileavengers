import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";
 
dotenv.config();
 
const router = express.Router();
 
router.post("/api/timereports/add", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
 
  try {
    const {
      body: {  projectId, date, hours, note, category },
    } = request;
 
    const userId = request.session.user.id;
 
    const properties = {
      Date: { type: "date", date: { start: date } },
      Hours: { type: "number", number: hours },
      Project: { type: "relation", relation: [{ id: projectId }] },
      Person: { type: "relation", relation: [{ id: userId }] },
      Note: { type: "title", title: [{ text: { content: note } }] },
      Category: { type: "select", select: { name: category } }, // Add category property
    };
    const newPage = {
      parent: { database_id: process.env.NOTION_DATABASE_ID_TIMEREPORTS },
      properties: properties,
    };
 
    const createdPage = await notion.pages.create(newPage);
 
    return response.status(200).send();
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});
 
export default router;