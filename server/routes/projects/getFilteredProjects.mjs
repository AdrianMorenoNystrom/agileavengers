import express, { request, response } from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.get("/api/user/projects", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const userId = request.session.user.id;
  const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;

  console.log('User ID: ', userId);

  try {
    const result = await notion.databases.query({
      database_id: databaseId,
      filter: {
        or: [
          {
            property: "People",
            relation: {
              contains: userId,
            },
          },
          {
            property: "Project Leader",
            relation: {
              contains: userId,
            }
          },
        ],
      },
      sorts: [
        {
          property: "Status",
          direction: "ascending",
        },
        {
          property: "Timespan",
          direction: "ascending",
        },
      ],
    });

    const relevantData = result.results;

    response.json({ message: relevantData });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;