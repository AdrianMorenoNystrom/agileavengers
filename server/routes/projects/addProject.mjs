import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.post("/api/projects/add", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;
  const {
    body: { projectName, startDate, endDate, status, hours, projectLeaderId, teamMembersId, description }
  } = request;

  try {
    const teamMembersRelation = teamMembersId.map(teamMemberId => ({ id: teamMemberId }));

    const newProject = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Projectname: {
          title: [
            {
              text: {
                content: projectName,
              },
            },
          ],
        },
        Timespan: {
          date: {
            start: startDate,
            end: endDate,
          },
        },
        Status: {
          select: {
            name: status,
          },
        },
        "Total Hours": {
          number: parseFloat(hours),
        },
        "Project Leader": {
          relation: [
            {
              id: projectLeaderId,
            },
          ],
        },
        People: {
          relation: teamMembersRelation,
        },
        Description: {
          rich_text: [
            {
              text: {
                content: description,
              },
            },
          ],
        },
      },
    });

    return response.status(200).send();
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;