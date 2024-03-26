import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.post("/api/timereports/add", async (request, response) => {
  if (!request.session.user) return response.sendStatus(401);

  try {
    let {
      body: {
        projectId,
        date,
        hours,
        note,
        category,
        toTime,
        fromTime,
        isUpdate,
      },
    } = request;

    fromTime = new Date(fromTime);
    toTime = new Date(toTime);

    const userId = request.session.user.id;

    const properties = {
      Date: { type: "date", date: { start: date } },
      Hours: { type: "number", number: hours },
      Project: { type: "relation", relation: [{ id: projectId }] },
      Person: { type: "relation", relation: [{ id: userId }] },
      Note: { type: "title", title: [{ text: { content: note } }] },
      Category: { type: "select", select: { name: category } }, // Add category property
      From: { type: "date", date: { start: fromTime, end: null } },
      To: { type: "date", date: { start: toTime, end: null } },
    };

    if (isUpdate) {
      // Update already existing page
      delete properties.Project;

      await notion.pages.update({
        page_id: projectId,
        properties: properties,
      });

      return response.status(200).send();
    } else {
      // Create new page
      await notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID_TIMEREPORTS },
        properties: properties,
      });

      return response.status(201).send();
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
