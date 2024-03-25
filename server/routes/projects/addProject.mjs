import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";
import bodyParser from "body-parser";

dotenv.config();

const jsonParser = bodyParser.json();
const router = express.Router();

router.post("/api/projects/add", jsonParser, async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const projectName = request.body.projectName;
  const hours = request.body.hours;
  const status = request.body.status;
  const projectStart = request.body.projectStart;
  const projectEnd = request.body.projectEnd;
  const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;
  try {
    const result = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "Total Hours": {
          number: parseFloat(hours),
        },
        Projectname: {
          title: [
            {
              text: {
                content: projectName,
              },
            },
          ],
        },
        Status: {
          select: {
            name: status,
          },
        },
        Timespan: {
          date: {
            start: projectStart,
            end: projectEnd,
          },
        },
      },
    });
    console.log(result);
    response.sendStatus(200);
  } catch (error) {
    console.log(error);
    response.status(500).send(error.message); 
  }
});

export default router;