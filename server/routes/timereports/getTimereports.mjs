import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

/*
Route to get all timereports associated with a project or user, depending if
project_id is included or not.
*/
router.get("/api/projects/timereports", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  try {
    const { project_id } = request.body;
    const filter =
      project_id !== undefined
        ? {
            property: "Project",
            relation: {
              contains: project_id,
            },
          }
        : {
            property: "Person",
            relation: {
              contains: request.session.user.id,
            },
          };

    const database_id = process.env.NOTION_DATABASE_ID_TIMEREPORTS;
    const result = await notion.databases.query({
      database_id: database_id,
      filter: filter,
    });

    return response.status(200).send(result.results);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
