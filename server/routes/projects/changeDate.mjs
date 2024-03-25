import express from "express";
import dotenv from "dotenv";
import notion from "../../notion.mjs";

dotenv.config();

const router = express.Router();

router.post("/api/projects/changeDate/:id", async (request, response) => {
    if (!request.session.user) return response.sendStatus(401);
  
    const newEndDate = request.body.newEndDate;
    const projectId = request.params.id; 
  
    try {
      const projectData = await notion.pages.retrieve({
        page_id: projectId
      });
      const currentStartDate = projectData.properties.Timespan.date.start; 
  
      const result = await notion.pages.update({
        page_id: projectId, 
        properties: {
          "Timespan": {
            type: "date",
            date: {
              start: currentStartDate,
              end: newEndDate,
            }
          }
        }
      });
      response.sendStatus(200);
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message); 
    }
  });
  
  export default router;
