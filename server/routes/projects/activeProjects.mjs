import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";
 
dotenv.config();
 
const router = express.Router();
 
router.get("/api/projects/active", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
 
  const userId = request.session.user.id; // Användarens Notion ID som du sparar i sessionen.
  const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;
 
  try {
    const result = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Status",
            select: {
              equals: "Active",
            },
          },
          {
            property: "People", // Använd det exakta namnet som visas i din Notion-databas
            relation: {
              contains: userId,
            },
          },
        ],
      },
    });
    
    const relevantData = result.results;
 
    response.json({ message: relevantData });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});
 
 
 
export default router;