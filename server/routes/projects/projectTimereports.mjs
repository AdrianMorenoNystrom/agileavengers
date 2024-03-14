import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.get("/api/projects/timereports", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  try {
    const { projectId } = request.body;
    const databaseId = process.env.NOTION_DATABASE_ID_TIMEREPORTS;
    const result = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Project",
        relation: {
          contains: projectId,
        },
      },
    });

    return response.status(200).send(result.results);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
