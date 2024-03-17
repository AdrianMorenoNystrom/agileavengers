import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();
//acitiveProjects hämtar både Aktiva projekt och slutförda projekt

router.get("/api/projects/active", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  const userId = request.session.user.id;
  const databaseId = process.env.NOTION_DATABASE_ID_PROJECTS;

  try {
    // Försök först att hämta aktiva projekt
    let result = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          { property: "Status", select: { equals: "Active" }},
          { or: [
              { property: "People", relation: { contains: userId }},
              { property: "Project Leader", relation: { contains: userId }}
            ]
          }
        ],
      }
    });

    // Om det inte finns några aktiva projekt, så försök hämtas det senaste slutförda projektet
    if (result.results.length === 0) {
      result = await notion.databases.query({
        database_id: databaseId,
        filter: {
          and: [
            { property: "Status", select: { equals: "Done" }},
            { or: [
                { property: "People", relation: { contains: userId }},
                { property: "Project Leader", relation: { contains: userId }}
              ]
            }
          ],
        },
        page_size: 1
      });
    }

    const relevantData = result.results;
    response.json({ message: relevantData });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});


export default router;
