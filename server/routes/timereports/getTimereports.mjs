import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.get("/api/timereports", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  try {
    const { project_id, filter_by_user } = request.query;
    console.log(project_id,filter_by_user);
    let filter;

    switch (true) {
      case project_id !== undefined:
        filter = {
          property: "Project",
          relation: {
            contains: project_id,
          },
        };
        break;
      case filter_by_user && filter_by_user.toLowerCase() === 'true':
        filter = {
          property: "Person",
          relation: {
            contains: request.session.user.id,
          },
        };
        break;
      default:
        break;
    }

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
